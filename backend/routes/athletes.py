from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

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
