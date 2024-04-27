from datetime import time, date
from app.models import db, Shift

def seed_shifts():
    shift_seed_data = [
        Shift(user_id=1, shift_date=date(2025, 4, 25), shift_start=time(8, 0), shift_end=time(16, 0)),
        Shift(user_id=2, shift_date=date(2025, 6, 15), shift_start=time(9, 0), shift_end=time(17, 0)),
        Shift(user_id=3, shift_date=date(2025, 7, 1),  shift_start=time(10, 0), shift_end=time(18, 0)),
        Shift(user_id=4, shift_date=date(2025, 8, 20), shift_start=time(8, 0), shift_end=time(16, 0)),
        Shift(user_id=5, shift_date=date(2025, 12, 10), shift_start=time(9, 0), shift_end=time(17, 0))
    ]

    db.session.add_all(shift_seed_data)
    db.session.commit()

def undo_shifts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shifts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shifts"))

    db.session.commit()
