from flask import Blueprint, request
from app.models import User, UserRole, db
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)

# Authenticates a user
@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


# Log in
@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    csrf_token = request.cookies.get('csrf_token')
    form.csrf_token.data = csrf_token
    if form.validate_on_submit():
        user = User.query.filter(User.username == form.data['username']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


# Log out
@auth_routes.route('/logout')
def logout():
    logout_user()
    return {'message': 'User logged out'}


# Sign up
@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            username=form.data['username'],
            password=form.data['password'],
            role=UserRole.Employee
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


# Unauthorized
@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': {'message': 'Unauthorized'}}, 401