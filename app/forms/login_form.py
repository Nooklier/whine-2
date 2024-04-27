from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


# Checking if user exists
def user_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError('Invalid username or password.')


# Checking if password matches
def password_matches(form, field):
    password = field.data
    username = form.data['username']
    user = User.query.filter(User.username == username).first()
    if user and not user.check_password(password):
        raise ValidationError('Invalid username or password.')


class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), user_exists])
    password = PasswordField('password', validators=[DataRequired(), password_matches])