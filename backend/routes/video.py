from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from ..vision.tracker import generate_frames
from ..database import SessionLocal
from .. import models
import random

router = APIRouter(
    prefix="/api/video",
    tags=["video"]
)

@router.get("/feed")
def video_feed():
    """
    Returns a multipart stream of JPEG frames annotated by YOLO.
    Can be used directly in an HTML <img> tag's src attribute.
    """
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")

@router.get("/var-results")
def get_var_results():
    db = SessionLocal()
    try:
        athletes = db.query(models.Athlete).limit(8).all()
    finally:
        db.close()
    
    if not athletes:
        return []
        
    results = []
    base_time = 9.85
    for i, ath in enumerate(athletes):
        finish_time = base_time + (i * 0.04) + random.uniform(-0.01, 0.03)
        results.append({
            "pos": 0,
            "lane": i + 1,
            "name": ath.name,
            "time": f"{finish_time:.3f}",
            "diff": f"+{(finish_time - base_time):.3f}" if i > 0 else "-"
        })
    
    results.sort(key=lambda x: float(x["time"]))
    base_winner = float(results[0]["time"])
    for i, res in enumerate(results):
        res["pos"] = i + 1
        if i == 0:
            res["diff"] = "-"
        else:
            res["diff"] = f"+{(float(res['time']) - base_winner):.3f}"
            
    return results
