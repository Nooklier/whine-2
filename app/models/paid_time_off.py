from .db import db, environment, SCHEMA, add_prefix_for_prod

class PaidTimeOff(db.Model):
    __tablename__ = 'paid_time_offs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    total_hours = db.Column(db.Integer, default=0)
    used_hours = db.Column(db.Integer, default=0)
    
    @property
    def remaining_hours(self):
        return self.total_hours - self.used_hours


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_hours': self.total_hours,
            'used_hours': self.used_hours,
            'remaining_hours': self.remaining_hours
        }