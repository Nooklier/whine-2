from flask.cli import AppGroup
from .users import seed_users, undo_users
from .time_off_requests import seed_time_off_requests, undo_time_off_requests
from .paid_time_offs import seed_pto, undo_pto
from .shifts import seed_shifts, undo_shifts

from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')


@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_shifts()
        undo_pto()
        undo_time_off_requests()
        undo_users()
    seed_users()
    seed_time_off_requests()
    seed_pto()
    seed_shifts()
 
@seed_commands.command('undo')
def undo():
    undo_shifts()
    undo_pto()
    undo_time_off_requests()
    undo_users()
  
