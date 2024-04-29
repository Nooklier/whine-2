from datetime import date, time, timedelta
from random import randint
from app.models import Shift, db


def generate_random_date(start_date, end_date):
    """
    Generate a random date between start_date and end_date
    """
    delta = end_date - start_date
    random_days = randint(0, delta.days)
    return start_date + timedelta(days=random_days)

def seed_shifts():
    start_date = date(2024, 5, 1)
    end_date = date(2024, 5, 31)
    
    shift_seed_data = [
        # Employee 1 - 5 shifts within one week
        Shift(user_id=1, shift_date=generate_random_date(start_date, start_date + timedelta(days=6)), shift_start=time(8, 0), shift_end=time(16, 0)),
        Shift(user_id=1, shift_date=generate_random_date(start_date, start_date + timedelta(days=6)), shift_start=time(9, 0), shift_end=time(17, 0)),
        Shift(user_id=1, shift_date=generate_random_date(start_date, start_date + timedelta(days=6)), shift_start=time(10, 0), shift_end=time(18, 0)),
        Shift(user_id=1, shift_date=generate_random_date(start_date, start_date + timedelta(days=6)), shift_start=time(8, 0), shift_end=time(16, 0)),
        Shift(user_id=1, shift_date=generate_random_date(start_date, start_date + timedelta(days=6)), shift_start=time(9, 0), shift_end=time(17, 0)),
        
        # Employee 2
        Shift(user_id=2, shift_date=generate_random_date(start_date, end_date), shift_start=time(8, 0), shift_end=time(16, 0)),
        Shift(user_id=2, shift_date=generate_random_date(start_date, end_date), shift_start=time(9, 0), shift_end=time(17, 0)),
        Shift(user_id=2, shift_date=generate_random_date(start_date, end_date), shift_start=time(10, 0), shift_end=time(18, 0)),
        Shift(user_id=2, shift_date=generate_random_date(start_date, end_date), shift_start=time(8, 0), shift_end=time(16, 0)),
        
        # Employee 3
        Shift(user_id=3, shift_date=generate_random_date(start_date, end_date), shift_start=time(8, 0), shift_end=time(16, 0)),
        Shift(user_id=3, shift_date=generate_random_date(start_date, end_date), shift_start=time(9, 0), shift_end=time(17, 0)),
        Shift(user_id=3, shift_date=generate_random_date(start_date, end_date), shift_start=time(10, 0), shift_end=time(18, 0)),
        Shift(user_id=3, shift_date=generate_random_date(start_date, end_date), shift_start=time(8, 0), shift_end=time(16, 0)),
        
        # Additional shifts available for pick up
        Shift(shift_date=generate_random_date(start_date, end_date), shift_start=time(8, 0), shift_end=time(16, 0)),
        Shift(shift_date=generate_random_date(start_date, end_date), shift_start=time(9, 0), shift_end=time(17, 0)),
        Shift(shift_date=generate_random_date(start_date, end_date), shift_start=time(10, 0), shift_end=time(18, 0)),
    ]

    db.session.add_all(shift_seed_data)
    db.session.commit()

def undo_shifts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shifts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shifts"))

    db.session.commit()
