from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from ..vision.tracker import generate_frames

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
