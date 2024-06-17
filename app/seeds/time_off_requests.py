from datetime import date
from app.models import db, TimeOffRequest 
from sqlalchemy.sql import text

def seed_time_off_requests():
    time_off_requests_seed_data = [
        TimeOffRequest(
            user_id=1,
            start_date=date(2025, 4, 25),
            end_date=date(2025, 5, 5),
            pto_use=40
        ),
        TimeOffRequest(
            user_id=2,
            start_date=date(2025, 6, 15),
            end_date=date(2025, 6, 25), 
            pto_use=24
        ),
        TimeOffRequest(
            user_id=3,
            start_date=date(2025, 7, 1),
            end_date=date(2025, 7, 12), 
            pto_use=32
        ),
        TimeOffRequest(
            user_id=4,
            start_date=date(2025, 8, 20), 
            end_date=date(2025, 8, 30),   
            pto_use=16
        ),
        TimeOffRequest(
            user_id=5,
            start_date=date(2025, 12, 10), 
            end_date=date(2025, 12, 20),   
            pto_use=8
        )
    ]


    db.session.add_all(time_off_requests_seed_data)
    db.session.commit()


def undo_time_off_requests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.time_off_requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM time_off_requests"))
        
    db.session.commit()
