from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/api/competitions",
    tags=["competitions"]
)

@router.get("/", response_model=List[schemas.CompetitionResponse])
def read_competitions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    competitions = db.query(models.Competition).offset(skip).limit(limit).all()
    return competitions

@router.post("/", response_model=schemas.CompetitionResponse)
def create_competition(comp: schemas.CompetitionCreate, db: Session = Depends(get_db)):
    db_item = models.Competition(**comp.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/{id}", response_model=schemas.CompetitionResponse)
def update_competition(id: int, comp: schemas.CompetitionUpdate, db: Session = Depends(get_db)):
    db_comp = db.query(models.Competition).filter(models.Competition.id == id).first()
    if not db_comp:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Competition not found")
        
    for key, value in comp.model_dump(exclude_unset=True).items():
        setattr(db_comp, key, value)
        
    db.commit()
    db.refresh(db_comp)
    return db_comp

@router.delete("/{id}")
def delete_competition(id: int, db: Session = Depends(get_db)):
    db_comp = db.query(models.Competition).filter(models.Competition.id == id).first()
    if not db_comp:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Competition not found")
        
    db.delete(db_comp)
    db.commit()
    return {"message": "Competition deleted successfully"}
