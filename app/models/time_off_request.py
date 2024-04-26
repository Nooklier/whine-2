from .db import db, environment, SCHEMA

class TimeOffRequest(db.Model):
    __tablename__ = 'time_off_request'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    pto_use = db.Column(db.Integer, nullable=True)

    # Relationship back to the User
    user = db.relationship('User', backref=db.backref('time_off_requests', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'pto_use': self.pto_use
        }