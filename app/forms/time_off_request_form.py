from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from datetime import date
from app.models import TimeOffRequest, db
from flask_login import login_required, current_user

# Validator to ensure the date is not in the past
def date_not_past(form, field):
    if field.data < date.today():
        raise ValidationError('Date cannot be in the past.')

# Validator to ensure the end date is not before the start date
def end_date_check(form, field):
    if field.data < form.start_date.data:
        raise ValidationError('End date cannot be before start date.')

# Validator to ensure that the user has proper amount of PTO hours left to use.
def check_pto_availability(form, field):
    


class TimeOffRequestForm(FlaskForm):
    start_date = DateField('Start Date', validators=[DataRequired(), date_not_past])
    end_date = DateField('End Date', validators=[DataRequired(), end_date_check])
    pto_use = IntegerField('PTO Use (hours)', validators=[DataRequired(), check_pto_availability])
    submit = SubmitField('Request Time Off')
