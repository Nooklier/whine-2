from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import TimeOffRequest, db, User, UserRole
from datetime import datetime

time_off_routes = Blueprint('timeoff', __name__)

# Create time off request
@time_off_routes.route('/create', methods=['POST'])
@login_required
def create_time_off_request():
    data = request.json
    try:
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
        end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
        pto_use = int(data.get('pto_use', 0))

        if start_date > end_date:
            raise ValueError("End date must be after start date")

        new_request = TimeOffRequest(
            user_id=current_user.id,  
            start_date=start_date,
            end_date=end_date,
            pto_use=pto_use
        )
        db.session.add(new_request)
        db.session.commit()
        return jsonify(new_request.to_dict()), 201
    except KeyError:
        return jsonify({"error": "Missing required fields"}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 400



# Get time off requests for current user
@time_off_routes.route('/current', methods=['GET'])
@login_required
def get_my_time_off_requests():
    requests = TimeOffRequest.query.filter_by(user_id=current_user.id).all()
    return jsonify([request.to_dict() for request in requests]), 200



# Get all time off requests
@time_off_routes.route('/all', methods=['GET'])
@login_required
def view_all_time_off_requests():
    if current_user.role != UserRole.Manager:
        return jsonify({"error": "Unauthorized - Only managers can view all time off requests"}), 403

    # Querying all time off requests with user details
    requests = db.session.query(
        TimeOffRequest.id.label('request_id'),
        TimeOffRequest.user_id,
        User.first_name,
        User.last_name,
        TimeOffRequest.start_date,
        TimeOffRequest.end_date,
        TimeOffRequest.pto_use
    ).join(User, TimeOffRequest.user_id == User.id).all()

    if not requests:
        return jsonify({"message": "No time off requests found"}), 404

    # Creating a list of dictionaries to send as JSON
    all_requests_info = [{
        'request_id': req.request_id,
        'user_id': req.user_id,
        'first_name': req.first_name,
        'last_name': req.last_name,
        'start_date': req.start_date.isoformat(),
        'end_date': req.end_date.isoformat(),
        'pto_use': req.pto_use
    } for req in requests]

    return jsonify(all_requests_info), 200



# Update Time Off Request
@time_off_routes.route('/update/<int:request_id>', methods=['PUT'])
@login_required
def update_time_off_request(request_id):
    time_off_request = TimeOffRequest.query.get(request_id)
    if not time_off_request:
        return jsonify({"error": "Time off request not found"}), 404

    # Check if the current user is either the owner of the request or a manager
    if time_off_request.user_id != current_user.id and current_user.role != UserRole.Manager:
        return jsonify({"error": "Unauthorized - Only the request owner or a manager can update the request"}), 403

    data = request.json
    try:
        if 'start_date' in data:
            time_off_request.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
        if 'end_date' in data:
            time_off_request.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
            if time_off_request.start_date > time_off_request.end_date:
                raise ValueError("End date must be after start date")
        if 'pto_use' in data:
            pto_use = int(data['pto_use'])
            if pto_use < 0:
                raise ValueError("PTO use must be a non-negative number")
            time_off_request.pto_use = pto_use

        db.session.commit()
        return jsonify(time_off_request.to_dict()), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400




# Delete time off request
@time_off_routes.route('/delete/<int:request_id>', methods=['DELETE'])
@login_required
def delete_time_off_request(request_id):
    # Retrieve the request based on the ID provided
    request = TimeOffRequest.query.get(request_id)
    if not request:
        return jsonify({"error": "Time off request not found"}), 404

    # Check if the current user is either the owner of the request or a manager
    if request.user_id != current_user.id and current_user.role != UserRole.Manager:
        return jsonify({"error": "Unauthorized - Only the request owner or a manager can delete the request"}), 403

    # Proceed with deletion
    db.session.delete(request)
    db.session.commit()
    return jsonify({"message": "Time off request deleted successfully"}), 200