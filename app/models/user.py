from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from enum import Enum
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy.orm import relationship

class UserRole(Enum):
    Employee = 'employee'
    Manager = 'manager'


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False)

    # Relationships
    shifts = db.relationship('Shift', backref='user', lazy=True, cascade="all, delete-orphan")  
    paid_time_offs = db.relationship('PaidTimeOff', backref='user', lazy=True, cascade="all, delete-orphan")  
    time_off_requests = db.relationship('TimeOffRequest', backref='user', lazy=True, cascade="all, delete-orphan")  


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'role': self.role.value
        }
