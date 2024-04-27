from flask import request, jsonify, Blueprint
from flask_login import login_required, current_user
from app.models import PaidTimeOff, db, User, UserRole

pto_routes = Blueprint('pto', __name__)

# Get current user's PTO
@pto_routes.route('/current', methods=['GET'])
@login_required
def get_my_pto():
    pto_records = PaidTimeOff.query.filter_by(user_id=current_user.id).all()
    if not pto_records:
        return jsonify({'message': 'No PTO records found'}), 404

    pto_list = [pto.to_dict() for pto in pto_records]
    return jsonify(pto_list), 200



# Get all PTO
@pto_routes.route('/all', methods=['GET'])
@login_required
def view_all_pto():
    if current_user.role != UserRole.Manager:
        return jsonify({"error": "Unauthorized - Only managers can view all PTO information"}), 403

    # Querying all PTO records with user details
    pto_records = db.session.query(
        PaidTimeOff.id.label('pto_id'),
        User.first_name,
        User.last_name,
        PaidTimeOff.total_hours,
        PaidTimeOff.used_hours,
        (PaidTimeOff.total_hours - PaidTimeOff.used_hours).label('remaining_hours')
    ).join(User, PaidTimeOff.user_id == User.id).all()

    if not pto_records:
        return jsonify({"message": "No PTO records found"}), 404

    # Creating a list of dictionaries to send as JSON
    all_pto_info = [{
        'pto_id': pto.pto_id,
        'first_name': pto.first_name,
        'last_name': pto.last_name,
        'total_hours': pto.total_hours,
        'used_hours': pto.used_hours,
        'remaining_hours': pto.remaining_hours
    } for pto in pto_records]

    return jsonify(all_pto_info), 200


# Update PTO by user ID
@pto_routes.route('/update/<int:pto_id>', methods=['PUT'])
@login_required
def update_employee_pto(pto_id):
    if current_user.role != UserRole.Manager:
        return jsonify({"error": "Unauthorized - Only managers can update PTO information"}), 403

    # Fetch the PTO record based on the PTO ID
    pto = PaidTimeOff.query.get(pto_id)
    if not pto:
        return jsonify({"error": "PTO record not found"}), 404

    data = request.json
    total_hours = data.get('total_hours')
    used_hours = data.get('used_hours')

    if total_hours is not None:
        try:
            total_hours = int(total_hours)
            if total_hours < 0:
                raise ValueError("Total hours cannot be negative")
            pto.total_hours = total_hours
        except ValueError as e:
            return jsonify({"error": str(e)}), 400

    if used_hours is not None:
        try:
            used_hours = int(used_hours)
            if used_hours < 0 or used_hours > pto.total_hours:
                raise ValueError("Used hours must be between 0 and total hours")
            pto.used_hours = used_hours
        except ValueError as e:
            return jsonify({"error": str(e)}), 400

    db.session.commit()
    return jsonify(pto.to_dict()), 200



# Delete PTO
@pto_routes.route('/delete/<int:pto_id>', methods=['DELETE'])
@login_required
def delete_pto(pto_id):
    if current_user.role != UserRole.Manager:
        return jsonify({"error": "Unauthorized - Only managers can delete PTO information"}), 403
    pto = PaidTimeOff.query.get(pto_id)
    if not pto:
        return jsonify({"error": "PTO record not found"}), 404
    db.session.delete(pto)
    db.session.commit()
    return jsonify({"message": "PTO record deleted successfully"}), 200
