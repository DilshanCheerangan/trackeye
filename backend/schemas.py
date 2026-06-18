from pydantic import BaseModel
from typing import Optional

class AthleteBase(BaseModel):
    athlete_id: str
    name: str
    event: str
    island: str
    pb: str
    status: str

class AthleteCreate(AthleteBase):
    pass

class AthleteResponse(AthleteBase):
    id: int

    class Config:
        from_attributes = True

class AthleteUpdate(BaseModel):
    name: Optional[str] = None
    event: Optional[str] = None
    island: Optional[str] = None
    pb: Optional[str] = None
    status: Optional[str] = None

class CompetitionBase(BaseModel):
    name: str
    date_str: str
    location: str
    status: str
    athletes_count: int
    events_total: int
    events_completed: int
    color: str

class CompetitionCreate(CompetitionBase):
    pass

class CompetitionResponse(CompetitionBase):
    id: int

    class Config:
        from_attributes = True

class CompetitionUpdate(BaseModel):
    name: Optional[str] = None
    date_str: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None
    athletes_count: Optional[int] = None
    events_total: Optional[int] = None
    events_completed: Optional[int] = None
    color: Optional[str] = None
