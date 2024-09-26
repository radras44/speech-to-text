from app_config import socketio,audio_records
@socketio.on("auth:login")
def handle_register (data : dict) : 
    user_id = data["user_id"]
    audio_records[user_id] = b''
    socketio.emit("auth:login_response",{
        "message" : "login succesfully",
        "user_id" : user_id
    })
 