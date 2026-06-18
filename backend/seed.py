from backend.database import SessionLocal, engine
from backend import models

# Create tables
models.Base.metadata.create_all(bind=engine)

def seed_database():
    db = SessionLocal()

    # Clear existing data
    db.query(models.Athlete).delete()
    db.query(models.Competition).delete()
    
    # Seed Athletes
    athletes = [
        models.Athlete(athlete_id='ATH-1001', name='MUBASSINA MOHAMMED', event='LONG JUMP', island='MINICOY', pb='6.38M', status='ACTIVE'),
        models.Athlete(athlete_id='ATH-1002', name='MUNSIRA MUNEER U.K.', event='BALL THROW', island='KAVARATTI', pb='34.5M', status='ACTIVE'),
        models.Athlete(athlete_id='ATH-1003', name='NIHALA K.K.', event='SPRINTS', island='KAVARATTI', pb='12.4s', status='INJURED'),
        models.Athlete(athlete_id='ATH-1004', name='MOHAMMED SAFWAN', event='100M SPRINT', island='ANDROTH', pb='10.8s', status='ACTIVE'),
        models.Athlete(athlete_id='ATH-1005', name='FATHIMA SHIRIN', event='HIGH JUMP', island='AGATTI', pb='1.65M', status='RESTING'),
    ]
    db.bulk_save_objects(athletes)

    # Seed Competitions
    competitions = [
        models.Competition(name='LAKSHADWEEP STATE ATHLETICS CHAMPIONSHIP', date_str='MAR 12 - MAR 15, 2026', location='KAVARATTI STADIUM', status='LIVE', athletes_count=345, events_total=42, events_completed=18, color='bg-track-coral'),
        models.Competition(name='SOUTH ZONE JUNIOR QUALIFIERS', date_str='APR 05 - APR 08, 2026', location='MINICOY SPORTS COMPLEX', status='UPCOMING', athletes_count=210, events_total=28, events_completed=0, color='bg-track-lagoon'),
        models.Competition(name='ISLAND SCHOOL SPORTS MEET', date_str='FEB 20 - FEB 22, 2026', location='AGATTI GROUND', status='COMPLETED', athletes_count=520, events_total=56, events_completed=56, color='bg-track-dark'),
    ]
    db.bulk_save_objects(competitions)

    db.commit()
    db.close()
    print("Database seeded successfully.")

if __name__ == "__main__":
    seed_database()
