from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Athlete(Base):
    __tablename__ = "athletes"

    id = Column(Integer, primary_key=True, index=True)
    athlete_id = Column(String, unique=True, index=True) # e.g. ATH-1001
    name = Column(String, index=True)
    event = Column(String)
    island = Column(String)
    pb = Column(String) # Personal Best
    status = Column(String, default="ACTIVE")

class Competition(Base):
    __tablename__ = "competitions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    date_str = Column(String)
    location = Column(String)
    status = Column(String, default="UPCOMING")
    athletes_count = Column(Integer, default=0)
    events_total = Column(Integer, default=0)
    events_completed = Column(Integer, default=0)
    color = Column(String, default="bg-track-dark")
