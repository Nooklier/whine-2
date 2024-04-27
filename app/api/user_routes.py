from flask import Blueprint, jsonify, request, abort
from flask_login import login_required, current_user
from app.models import User, db, UserRole

user_routes = Blueprint('users', __name__)


# Get all users
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}



# Get user by ID
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()



# Update current user
@user_routes.route('/update', methods=['PUT'])
def update_user():
    user = current_user
    updated_data = request.json

    if 'first_name' in updated_data:
        user.first_name = updated_data['first_name']
    if 'last_name' in updated_data:
        user.last_name = updated_data['last_name']
    if 'username' in updated_data:
        user.username = updated_data['username']
    if 'password' in updated_data:
        user.password = updated_data['password']

    db.session.commit()
    return jsonify(user.to_dict())



# Update user by ID
@user_routes.route('/update/<int:user_id>', methods=['PUT'])
@login_required
def update_user_by_id(user_id):
    if current_user.role != UserRole.Manager:
        return jsonify({"error": "Unauthorized"}), 403


    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.role == UserRole.Manager and current_user.id != user.id:
        return jsonify({"error": "Managers cannot update other managers' information"}), 403
    
    data = request.json
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.username = data.get('username', user.username)
    
    if 'password' in data:
        user.password = data['password']

    db.session.commit()
    return jsonify(user.to_dict()), 200


# Delete user by ID
@user_routes.route('/delete/<int:user_id>', methods=['DELETE'])
@login_required
def delete_user(user_id):
    # Check if the current user is a manager
    if current_user.role != UserRole.Manager:
        abort(403, 'Only managers can delete users.')  

    # Retrieve the user to be deleted
    user = User.query.get(user_id)

    # Check if the user exists
    if not user:
        return jsonify({'error': 'User does not exist.'}), 404 

    # Delete the user
    db.session.delete(user)
    db.session.commit()

    return {'message': 'User deleted successfully'}, 200
