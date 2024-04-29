from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Shift(db.Model):
    __tablename__ = 'shifts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    shift_date = db.Column(db.Date, nullable=False)
    shift_start = db.Column(db.Time, nullable=False)
    shift_end = db.Column(db.Time, nullable=False)
    available = db.Column(db.Boolean,nullable=False, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'shift_date': self.shift_date.strftime('%Y-%m-%d'),
            'shift_start': self.shift_start.strftime('%H:%M'),  
            'shift_end': self.shift_end.strftime('%H:%M'),
            'available': self.available
        }