from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from datetime import date
from app.models import PaidTimeOff, db
from flask_login import current_user

# Start date is not in the past
def start_date_check(form, field):
    if field.data < date.today():
        raise ValidationError('Date cannot be in the past.')

# End date is not before start date
def end_date_check(form, field):
    if field.data < form.start_date.data:
        raise ValidationError('End date cannot be before start date.')
    if field.data < date.today():
        raise ValidationError('End date must be in the future.')

# Must have enough PTO to be use
def pto_use_check(form, field):
    pto_record = PaidTimeOff.query.filter_by(user_id=current_user.id).first()
    if pto_record is None:
        raise ValidationError('No PTO record found.')
    if field.data > pto_record.remaining_hours:
        raise ValidationError('You do not have enough PTO hours.')

class TimeOffRequestForm(FlaskForm):
    start_date = DateField('Start Date', validators=[DataRequired(), start_date_check])
    end_date = DateField('End Date', validators=[DataRequired(), end_date_check])
    pto_use = IntegerField('PTO Use', validators=[DataRequired(), pto_use_check])
