from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .routes import athletes, competitions, ws, video, stats

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="TrackEye Backend API")

# Setup CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"], # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(athletes.router)
app.include_router(competitions.router)
app.include_router(ws.router)
app.include_router(video.router)
app.include_router(stats.router)

@app.get("/")
def read_root():
    return {"message": "TrackEye Backend is running"}
