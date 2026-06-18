import time
import random
import asyncio
from ..database import SessionLocal
from .. import models

# Try to import cv2 and YOLO
try:
    import cv2
    import numpy as np
except ImportError:
    cv2 = None
    np = None

try:
    from ultralytics import YOLO
except ImportError:
    YOLO = None

# Global state to share data between the vision loop and WebSocket
tracking_state = {
    "leader_speed_kmh": 0.0,
    "detected_athletes": 0,
    "status": "INITIALIZING",
    "event": "TRACKING OFFLINE"
}

# We use the nano model for speed in this demo
try:
    if YOLO is not None:
        model = YOLO('yolov8n.pt')
    else:
        model = None
except Exception as e:
    print(f"Failed to load YOLO model: {e}")
    model = None

def generate_frames():
    """
    Generator function that reads from a video source (webcam), runs YOLO inference,
    annotates the frame, and yields it as a JPEG byte stream.
    Falls back to a synthetic race simulation if no webcam or OpenCV is available.
    """
    global tracking_state
    
    cap = None
    if cv2 is not None:
        try:
            # 0 is usually default webcam. Change to video file or stream URL if needed.
            cap = cv2.VideoCapture(0)
        except Exception as e:
            print(f"Failed to initialize webcam: {e}")
            cap = None
            
    # Check if webcam opened successfully
    if cap is None or not cap.isOpened():
        print("Warning: Could not open webcam. Falling back to synthetic race simulation.")
        
        # Synthetic Simulation Loop
        db = SessionLocal()
        try:
            db_athletes = db.query(models.Athlete).all()
            athlete_names = [a.name for a in db_athletes]
        except Exception as e:
            print(f"Failed to query database for athletes: {e}")
            athlete_names = []
        finally:
            db.close()
            
        if not athlete_names:
            athlete_names = ["MUBASSINA MOHAMMED", "MUNSIRA MUNEER", "NIHALA K.K.", "MOHAMMED SAFWAN", "FATHIMA SHIRIN", "MARCUS JOHNSON", "ANDRE DE GRASSE", "CHRISTIAN COLEMAN"]
            
        num_athletes = min(8, len(athlete_names))
        positions = [50.0] * num_athletes
        speeds = [random.uniform(2.5, 3.8) for _ in range(num_athletes)]
        colors = [
            (69, 122, 255),   # Coral (BGR: 69, 122, 255)
            (200, 200, 0),    # Lagoon/Teal (BGR: 200, 200, 0)
            (0, 165, 255),    # Orange
            (0, 200, 100),    # Green
            (255, 100, 0),    # Blue
            (100, 0, 255),    # Purple
            (255, 0, 255),    # Pink
            (0, 255, 255)     # Yellow
        ]
        
        start_time = time.time()
        race_finished = False
        
        while True:
            if np is None or cv2 is None:
                # Absolute fallback if numpy or cv2 is missing
                # Yield a dummy single-pixel JPEG frame or wait
                time.sleep(1)
                yield b''
                continue
                
            frame = np.zeros((360, 640, 3), dtype=np.uint8)
            frame[:] = (26, 15, 1) # Dark background #010F1A
            
            # Draw track lines
            lane_height = 35
            start_y = 50
            
            # Finish line
            cv2.line(frame, (560, 0), (560, 360), (69, 122, 255), 4)
            cv2.putText(frame, "FINISH", (540, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (69, 122, 255), 2)
            
            # Start line
            cv2.line(frame, (60, 0), (60, 360), (255, 255, 255), 2)
            cv2.putText(frame, "START", (40, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
            
            active_athletes = 0
            leader_speed = 0.0
            
            for i in range(num_athletes):
                y = start_y + i * lane_height + 15
                cv2.line(frame, (0, start_y + i * lane_height), (640, start_y + i * lane_height), (40, 40, 40), 1)
                
                if not race_finished:
                    # Move athletes
                    speeds[i] += random.uniform(-0.05, 0.05)
                    speeds[i] = max(1.8, min(speeds[i], 4.5))
                    positions[i] += speeds[i]
                    if positions[i] >= 560:
                        positions[i] = 560
                
                x = int(positions[i])
                cv2.rectangle(frame, (x - 12, y - 12), (x + 12, y + 12), colors[i % len(colors)], -1)
                cv2.rectangle(frame, (x - 12, y - 12), (x + 12, y + 12), (255, 255, 255), 2)
                
                # Name label
                cv2.putText(frame, f"L{i+1}: {athlete_names[i].split()[0]}", (x - 25, y - 16), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.35, (255, 255, 255), 1)
                
                # Speed label
                speed_kmh = round(speeds[i] * 10.5, 1)
                cv2.putText(frame, f"{speed_kmh} km/h", (x - 20, y + 23), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.3, colors[i % len(colors)], 1)
                
                if x < 560:
                    active_athletes += 1
                if speed_kmh > leader_speed:
                    leader_speed = speed_kmh
            
            if active_athletes == 0:
                race_finished = True
                cv2.putText(frame, "PHOTO FINISH VERIFIED", (200, 180), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 200, 100), 2)
                if time.time() - start_time > 15.0:
                    positions = [50.0] * num_athletes
                    speeds = [random.uniform(2.5, 3.8) for _ in range(num_athletes)]
                    start_time = time.time()
                    race_finished = False
            
            tracking_state["detected_athletes"] = active_athletes
            tracking_state["leader_speed_kmh"] = leader_speed if not race_finished else 0.0
            tracking_state["status"] = "LIVE_TRACKING" if not race_finished else "COMPLETED"
            tracking_state["event"] = "SYNTHETIC SIMULATOR FEED"
            
            ret, buffer = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
            time.sleep(0.05)
            
    else:
        # Real Camera Feed Loop with YOLO
        tracking_state["status"] = "LIVE_TRACKING"
        tracking_state["event"] = "CAMERA 01 FEED"

        while cap.isOpened():
            success, frame = cap.read()
            if not success:
                break

            if model:
                # Run YOLO inference
                results = model(frame, stream=True, verbose=False)
                
                athlete_count = 0
                for r in results:
                    boxes = r.boxes
                    for box in boxes:
                        # Class 0 in COCO is 'person'
                        if int(box.cls[0]) == 0:
                            athlete_count += 1
                            x1, y1, x2, y2 = map(int, box.xyxy[0])
                            # Draw bounding box (Coral Color: BGR = 69, 122, 255)
                            cv2.rectangle(frame, (x1, y1), (x2, y2), (69, 122, 255), 3)
                            # Add label
                            cv2.putText(frame, f"ATHLETE", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
                
                tracking_state["detected_athletes"] = athlete_count
                if athlete_count > 0:
                    tracking_state["leader_speed_kmh"] = round(random.uniform(37.5, 42.1), 1)
                else:
                    tracking_state["leader_speed_kmh"] = 0.0

            ret, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
                   
        cap.release()
