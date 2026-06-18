import asyncio
import time
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from ..vision.tracker import tracking_state

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass

manager = ConnectionManager()

@router.websocket("/ws/live-metrics")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Push live metrics from tracker state
            payload = {
                "timestamp": time.time(),
                "event": tracking_state.get("event", "MEN'S 100M FINAL"),
                "leader_speed_kmh": tracking_state.get("leader_speed_kmh", 0.0),
                "status": tracking_state.get("status", "INITIALIZING"),
                "detected_athletes": tracking_state.get("detected_athletes", 0)
            }
            await websocket.send_json(payload)
            await asyncio.sleep(0.2) # Update 5 times per second
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
