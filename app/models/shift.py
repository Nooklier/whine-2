from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Shift(db.Model):
    __tablename__ = 'shifts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    shift_date = db.Column(db.Date, nullable=False)
    shift_start = db.Column(db.Time, nullable=False)
    shift_end = db.Column(db.Time, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'shift_date': self.shift_date,
            'shift_start': self.shift_start,
            'shift_end': self.shift_end,
        }