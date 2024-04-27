from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User, UserRole

# Checking if user exists
def user_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired(),Length(min=6, message='Username must be at least 6 characters long.'), username_exists])
    password = PasswordField('password', validators=[DataRequired(), Length(min=6, message='Password must be at least 6 characters long.')])
