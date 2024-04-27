from app.models import db, User, UserRole, environment, SCHEMA
from sqlalchemy.sql import text

def seed_users():

    users_seed_data = [
        User(
            first_name="John",
            last_name="Doe",
            username="johndoe",
            password="password1",  
            role=UserRole.Employee
        ),
        User(
            first_name="Jane",
            last_name="Smith",
            username="janesmith",
            password="password2",  
            role=UserRole.Manager
        ),
        User(
            first_name="Alice",
            last_name="Johnson",
            username="alicejohnson",
            password="password3",  
            role=UserRole.Employee
        ),
        User(
            first_name="Bob",
            last_name="Brown",
            username="bobbrown",
            password="password4",  
            role=UserRole.Manager
        ),
        User(
            first_name="Charlie",
            last_name="Davis",
            username="charliedavis",
            password="password5",  
            role=UserRole.Employee
        )
    ]

    db.session.add_all(users_seed_data)
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
