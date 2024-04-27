from flask_wtf import FlaskForm
from wtforms import DateField, TimeField
from wtforms.validators import DataRequired, ValidationError
from datetime import date, datetime

# Date can not be in the past
def validate_shift_date(form, field):
    if field.data < date.today():
        raise ValidationError('Shift date cannot be in the past.')

# Start time can not be in the past
def validate_shift_start(form, field):
    current_datetime = datetime.now()
    shift_datetime = datetime.combine(form.shift_date.data, field.data)
    if shift_datetime < current_datetime:
        raise ValidationError('Shift start time cannot be in the past.')

# End time can not be before start time
def validate_shift_end(form, field):
    if form.shift_start.data and field.data:
        if field.data < form.shift_start.data:
            raise ValidationError('Shift end time cannot be before shift start time.')

class ShiftForm(FlaskForm):
    shift_date = DateField('Shift Date', validators=[DataRequired(), validate_shift_date])
    shift_start = TimeField('Shift Start Time', validators=[DataRequired(), validate_shift_start])
    shift_end = TimeField('Shift End Time', validators=[DataRequired(), validate_shift_end])
