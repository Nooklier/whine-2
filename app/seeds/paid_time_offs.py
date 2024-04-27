from app.models import db, PaidTimeOff, User, UserRole, environment, SCHEMA
from sqlalchemy.sql import text

def seed_pto():

    pto_seed_data = [
        PaidTimeOff(user_id=1, total_hours=120, used_hours=40),
        PaidTimeOff(user_id=2, total_hours=100, used_hours=20),
        PaidTimeOff(user_id=3, total_hours=150, used_hours=50),
        PaidTimeOff(user_id=4, total_hours=180, used_hours=60),
        PaidTimeOff(user_id=5, total_hours=200, used_hours=80),
    ]

    db.session.add_all(pto_seed_data)  
    db.session.commit()  

def undo_pto():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.paid_time_offs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM paid_time_offs"))
        
    db.session.commit()
