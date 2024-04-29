from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Shift, db, User, UserRole
from datetime import datetime, time, timedelta

shift_routes = Blueprint('shift_routes', __name__)

# Create a new shift (Manager only)
@shift_routes.route('/create', methods=['POST'])
@login_required
def create_shift():
    data = request.json
    try:
        # Parse input data
        shift_date = datetime.strptime(data['shift_date'], '%Y-%m-%d').date()
        shift_start = datetime.strptime(data['shift_start'], '%H:%M').time()
        shift_end = datetime.strptime(data['shift_end'], '%H:%M').time()

        # Check if a shift already exists for the same user on the same date and time
        existing_shift = Shift.query.filter_by(
            user_id=current_user.id,
            shift_date=shift_date,
            shift_start=shift_start,
            shift_end=shift_end
        ).first()

        if existing_shift:
            return jsonify({"error": "Shift already exists for the same user at the same date and time"}), 409

        # Create a new shift record
        new_shift = Shift(
            user_id=current_user.id,
            shift_date=shift_date,
            shift_start=shift_start,
            shift_end=shift_end
        )
        db.session.add(new_shift)
        db.session.commit()
        return jsonify(new_shift.to_dict()), 201
    except KeyError:
        return jsonify({"error": "Missing required fields"}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Database integrity error"}), 500




# Get all shifts for the current user
@shift_routes.route('/current', methods=['GET'])
@login_required
def get_my_shifts():
    shifts = Shift.query.filter_by(user_id=current_user.id).all()
    
    # Loop through each shift and set the 'available' field to False if 'user_id' is not None
    for shift in shifts:
        if shift.user_id is not None:
            shift.available = False
    
    db.session.commit()  # Commit the changes (if any)
    
    return jsonify([shift.to_dict() for shift in shifts]), 200






# Update an existing shift
@shift_routes.route('/update/<int:shift_id>', methods=['PUT'])
@login_required
def update_shift(shift_id):
    # Retrieve the shift to update
    shift = Shift.query.get(shift_id)
    if not shift:
        return jsonify({"error": "Shift not found"}), 404

    # Check if the current user is the owner of the shift or a manager
    if current_user.id == shift.user_id or current_user.role != UserRole.Manager:
        return jsonify({"error": "Unauthorized - Only managers can update shifts, and current user cannot update their own shift"}), 403

    data = request.json
    try:
        # Parse input data
        shift_date = datetime.strptime(data['shift_date'], '%Y-%m-%d').date()
        shift_start = datetime.strptime(data['shift_start'], '%H:%M').time()
        shift_end = datetime.strptime(data['shift_end'], '%H:%M').time()

        # Update shift details
        shift.shift_date = shift_date
        shift.shift_start = shift_start
        shift.shift_end = shift_end

        db.session.commit()
        return jsonify(shift.to_dict()), 200
    except KeyError:
        return jsonify({"error": "Missing required fields"}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 400




# Delete a shift
@shift_routes.route('/delete/<int:shift_id>', methods=['DELETE'])
@login_required
def delete_shift(shift_id):
    # Retrieve the shift to delete
    shift = Shift.query.get(shift_id)
    if not shift:
        return jsonify({"error": "Shift not found"}), 404

    # Check if the current user is the owner of the shift or a manager
    if current_user.id == shift.user_id:
        return jsonify({"error": "Unauthorized - Current user cannot delete their own shift"}), 403
    if current_user.role != UserRole.Manager:
        return jsonify({"error": "Unauthorized - Only managers can delete shifts"}), 403

    # Proceed with deletion
    db.session.delete(shift)
    db.session.commit()
    return jsonify({"message": "Shift deleted successfully"}), 200



# Filter shifts that are available for pickup by other employees
@shift_routes.route('/available', methods=['GET'])
@login_required
def get_available_shifts():
    # Query shifts where user_id is None
    available_shifts = Shift.query.filter(Shift.user_id.is_(None)).all()

    return jsonify([shift.to_dict() for shift in available_shifts]), 200




# Route for picking up a shift by shift_id
@shift_routes.route('/pickup/<int:shift_id>', methods=['POST'])
@login_required
def pickup_shift(shift_id):
    # Check if the current user is not a manager
    if current_user.role == UserRole.Manager:
        return jsonify({"error": "Only employees can pick up shifts"}), 403

    # Retrieve the shift by shift_id
    shift = Shift.query.get(shift_id)
    if not shift:
        return jsonify({"error": "Shift not found"}), 404

    # Check if the shift is already assigned to someone
    if shift.user_id:
        return jsonify({"error": "Shift is already assigned to another employee"}), 400

    # Query the database for shifts assigned to the current user within the current week
    today = datetime.now().date()
    start_of_week = today - timedelta(days=today.weekday())
    end_of_week = start_of_week + timedelta(days=6)
    user_shifts_this_week = Shift.query.filter(
        Shift.user_id == current_user.id,
        Shift.shift_date >= start_of_week,
        Shift.shift_date <= end_of_week
    ).count()

    # Check if the user already has 5 or more shifts assigned within the current week
    max_shifts_per_week = 5
    if user_shifts_this_week >= max_shifts_per_week:
        return jsonify({"error": "You already have 5 or more shifts assigned for this week"}), 400

    # Assign the shift to the current user
    shift.user_id = current_user.id

    # Commit changes to the database
    db.session.commit()

    return jsonify({"message": f"Shift with ID {shift_id} picked up successfully"}), 200

# Get a shift by shift ID
@shift_routes.route('/<int:shift_id>', methods=['GET'])
@login_required
def get_shift_by_id(shift_id):
    # Retrieve the shift by shift ID
    shift = Shift.query.get(shift_id)
    if not shift:
        return jsonify({"error": "Shift not found"}), 404

    return jsonify(shift.to_dict()), 200
