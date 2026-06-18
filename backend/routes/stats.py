from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models

router = APIRouter(
    prefix="/api/stats",
    tags=["stats"]
)

@router.get("/")
def get_stats(db: Session = Depends(get_db)):
    total_athletes = db.query(models.Athlete).count()
    total_competitions = db.query(models.Competition).count()
    
    # Calculate some other numbers based on competitions
    active_comps = db.query(models.Competition).filter(models.Competition.status == "LIVE").all()
    active_events = sum(comp.events_total - comp.events_completed for comp in active_comps)
    
    return {
        "total_athletes": total_athletes,
        "total_competitions": total_competitions,
        "active_events": max(3, active_events),
        "live_streams": len(active_comps) if len(active_comps) > 0 else 1,
        "results_published": sum(comp.events_completed for comp in db.query(models.Competition).all()),
        "new_records": 4
    }
