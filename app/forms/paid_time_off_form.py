from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from datetime import date
from flask_login import current_user

# Total hours can not be negative
def total_hours_non_negative(form, field):
    if field.data < 0:
        raise ValidationError("Total hours cannot be negative.")

#  Used hours can not be negative
def used_hours_non_negative(form, field):
    if field.data < 0:
        raise ValidationError("Used hours cannot be negative.")
    if field.data > form.total_hours:
        raise ValidationError("Used hours cannot be higher than total hours")

class PaidTimeOffForm(FlaskForm):
    total_hours = IntegerField('Total Hours', validators=[DataRequired(), total_hours_non_negative])
    used_hours = IntegerField('Used Hours', validators=[DataRequired(), used_hours_non_negative])
