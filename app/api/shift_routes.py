from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Shift, db, User, UserRole
from datetime import datetime, time, timedelta


shift_routes = Blueprint('shift_routes', __name__)

# Create a new shift (Manager only)
@shift_routes.route('/create', methods=['POST'])
@login_required
def create_shift():
    # Check if the current user is a manager
    if current_user.role != UserRole.Manager:
        return jsonify({'message': 'Unauthorized access. Only managers are allowed to create shifts.'}), 403

    # Parse request data
    data = request.get_json()
    user_id = data.get('user_id')
    shift_date = data.get('shift_date')
    shift_start = data.get('shift_start')
    shift_end = data.get('shift_end')

    # Validate input data
    if not all([user_id, shift_date, shift_start, shift_end]):
        return jsonify({'message': 'Please provide all required information.'}), 400

    # Convert shift_date to a date object
    shift_date = datetime.strptime(shift_date, '%Y-%m-%d').date()
    
    # Convert shift_start and shift_end to time objects
    shift_start = datetime.strptime(shift_start, '%H:%M').time()
    shift_end = datetime.strptime(shift_end, '%H:%M').time()

    # Create the shift
    new_shift = Shift(
        user_id=user_id,
        shift_date=shift_date,
        shift_start=shift_start,
        shift_end=shift_end,
        available=False  # New shifts are not available by default
    )
    db.session.add(new_shift)
    db.session.commit()

    return jsonify(new_shift.to_dict()), 201


# Get all shifts for the current user
@shift_routes.route('/current', methods=['GET'])
@login_required
def get_my_shifts():

    # Query shifts for the current user
    shifts = Shift.query.filter_by(user_id=current_user.id).all()
    
    # Convert shifts to dictionary format
    shifts_dict = [shift.to_dict() for shift in shifts]
    
    db.session.commit()  
    return jsonify(shifts_dict), 200

# Get all shifts
@shift_routes.route('/all', methods=['GET'])
@login_required
def get_all_shifts():

    # User must be manager role
    if current_user.role != UserRole.Manager:
        return jsonify({'message': 'Unauthorized access. Only managers are allowed to view all shifts.'}), 403
    
    # Fetch all shift
    shifts = Shift.query.all()
    
    # Convert shifts to dictionary format
    shifts_dict = [shift.to_dict() for shift in shifts]

    db.session.commit()
    return jsonify(shifts_dict), 200

    

# Get shift by shift ID
@shift_routes.route('/<int:shift_id>', methods=['GET'])
@login_required
def get_shift_by_id(shift_id):

    # Query the shift by its ID
    shift = Shift.query.get(shift_id)

    # Check if the shift exists
    if not shift:
        return jsonify({'message': 'Shift not found.'}), 404  

    # Convert the shift to dictionary format
    shift_dict = shift.to_dict()

    return jsonify(shift_dict), 200



# Update shift by shift ID
@shift_routes.route('/update/<int:shift_id>', methods=['PUT'])
@login_required
def update_shift(shift_id):
    shift = Shift.query.get(shift_id)
    if not shift:
        return jsonify({'message': 'Shift not found.'}), 404

    data = request.get_json()
    shift_date = data.get('shift_date')
    shift_start = data.get('shift_start')
    shift_end = data.get('shift_end')
    user_id = data.get('user_id')

    if current_user.role == UserRole.Manager:
        if shift_date:
            shift.shift_date = datetime.strptime(shift_date, '%Y-%m-%d').date()
        if shift_start:
            shift.shift_start = datetime.strptime(shift_start, '%H:%M').time()
        if shift_end:
            shift.shift_end = datetime.strptime(shift_end, '%H:%M').time()
        if user_id:
            shift.user_id = user_id
    else:
        return jsonify({'message': 'Unauthorized access. Only managers can update shifts.'}), 403

    db.session.commit()
    return jsonify(shift.to_dict()), 200



# Get all available shifts
@shift_routes.route('/available', methods=['GET'])
@login_required
def get_available_shifts():
    # Query shifts with availability set to True
    available_shifts = Shift.query.filter_by(available=True).all()

    # Convert shifts to dictionary format
    available_shifts_dict = [shift.to_dict() for shift in available_shifts]

    return jsonify(available_shifts_dict), 200


# Pickup shift base on shift ID
@shift_routes.route('/pickup/<int:shift_id>', methods=['PUT'])
@login_required
def pick_up_shift(shift_id):

    # Check if the current user is a manager
    if current_user.role == UserRole.Manager:
        return jsonify({'message': 'Unauthorized access. Managers are not eligible to pick up shifts.'}), 403

    # Query the shift by its ID
    shift = Shift.query.get(shift_id)

    # Check if the shift exists
    if not shift:
        return jsonify({'message': 'Shift not found.'}), 404

    # Check if the shift is available
    if not shift.available:
        return jsonify({'message': 'Shift is not available for picking up.'}), 400

    # Check if the employee will end up working more than 5 days a week after picking up the shift
    # Get the start and end of the current week (assuming week starts on Monday)
    today = datetime.today()
    start_of_week = today - timedelta(days=today.weekday())
    end_of_week = start_of_week + timedelta(days=6)
    
    # Count the number of shifts for the current user within the current week
    num_shifts_this_week = Shift.query.filter_by(user_id=current_user.id). \
        filter(Shift.shift_date >= start_of_week).filter(Shift.shift_date <= end_of_week).count()

    # Check if picking up the shift would exceed 5 days
    if num_shifts_this_week >= 5:
        return jsonify({'message': 'You cannot pick up this shift as it would exceed working more than 5 days this week.'}), 400

    # Update the shift to be picked up by the current user
    shift.user_id = current_user.id
    shift.available = False

    # Commit the changes to the database
    db.session.commit()

    return jsonify({'message': 'Shift picked up successfully.'}), 200



# Delete a shift
@shift_routes.route('/delete/<int:shift_id>', methods=['DELETE'])
@login_required
def delete_shift(shift_id):

    # Check if the current user is a manager
    if current_user.role != UserRole.Manager:
        return jsonify({'message': 'Unauthorized access. Only managers are allowed to delete shifts.'}), 403

    # Query the shift by its ID
    shift = Shift.query.get(shift_id)

    # Check if the shift exists
    if not shift:
        return jsonify({'message': 'Shift not found.'}), 404

    # Check if the shift belongs to the current user (manager)
    # if shift.user_id == current_user.id:
    #     return jsonify({'message': 'Unauthorized access. Managers cannot delete their own shifts.'}), 403

    # # Check if the shift belongs to another manager
    # if shift.user.role == UserRole.Manager:
    #     return jsonify({'message': 'Unauthorized access. Managers cannot delete shifts of other managers.'}), 403

    # Delete the shift from the database
    db.session.delete(shift)
    db.session.commit()

    return jsonify({'message': 'Shift deleted successfully.'}), 200




