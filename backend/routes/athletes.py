from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import math
import random

from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/api/athletes",
    tags=["athletes"]
)

@router.get("/", response_model=List[schemas.AthleteResponse])
def read_athletes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    athletes = db.query(models.Athlete).offset(skip).limit(limit).all()
    return athletes

@router.post("/", response_model=schemas.AthleteResponse)
def create_athlete(athlete: schemas.AthleteCreate, db: Session = Depends(get_db)):
    db_athlete = db.query(models.Athlete).filter(models.Athlete.athlete_id == athlete.athlete_id).first()
    if db_athlete:
        raise HTTPException(status_code=400, detail="Athlete ID already registered")
    
    db_item = models.Athlete(**athlete.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/{id}", response_model=schemas.AthleteResponse)
def update_athlete(id: int, athlete: schemas.AthleteUpdate, db: Session = Depends(get_db)):
    db_athlete = db.query(models.Athlete).filter(models.Athlete.id == id).first()
    if not db_athlete:
        raise HTTPException(status_code=404, detail="Athlete not found")
    
    for key, value in athlete.model_dump(exclude_unset=True).items():
        setattr(db_athlete, key, value)
        
    db.commit()
    db.refresh(db_athlete)
    return db_athlete

@router.delete("/{id}")
def delete_athlete(id: int, db: Session = Depends(get_db)):
    db_athlete = db.query(models.Athlete).filter(models.Athlete.id == id).first()
    if not db_athlete:
        raise HTTPException(status_code=404, detail="Athlete not found")
        
    db.delete(db_athlete)
    db.commit()
    return {"message": "Athlete deleted successfully"}

@router.get("/{id}/analytics")
def get_athlete_analytics(id: int, db: Session = Depends(get_db)):
    db_athlete = db.query(models.Athlete).filter(models.Athlete.id == id).first()
    if not db_athlete:
        raise HTTPException(status_code=404, detail="Athlete not found")
    
    try:
        pb_val = float(db_athlete.pb.lower().replace('s', '').replace('m', '').strip())
    except:
        pb_val = 10.5
        
    peak_speed = 43.0 * (9.8 / pb_val) if pb_val > 0 else 40.0
    
    velocity_data = []
    for split in range(10, 110, 10):
        progress = split / 100.0
        speed = peak_speed * (math.sin(progress * 2.5) if progress < 0.6 else max(0.2, math.sin(0.6 * 2.5) - (progress - 0.6)))
        speed = max(10.0, min(peak_speed, speed))
        
        velocity_data.append({
            "split": f"{split}m",
            "time": round((split / 100.0) * pb_val, 2),
            "speed": round(speed, 1),
            "avgSpeed": round(speed * 0.95, 1)
        })
        
    progression = []
    meets = ['Doha', 'Rabat', 'Rome', 'Oslo', 'Paris', 'Monaco', 'London', 'Finals']
    current_time = pb_val + 0.3
    for meet in meets:
        current_time = max(pb_val, current_time - 0.05 + random.uniform(-0.02, 0.04))
        progression.append({
            "meet": meet,
            "time": round(current_time, 2),
            "pb": current_time <= pb_val + 0.01
        })
        
    return {
        "velocity": velocity_data,
        "progression": progression
    }
