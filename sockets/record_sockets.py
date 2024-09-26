from app_config import socketio,audio_records,transcriptor
from utils.path_generator import *
from utils.monitoring import describe_data
from glob import glob
import time
from utils.methods import *
@socketio.on("record:catch_chunk")
def catch_chunk (data : dict) :
    user_id = data["user_id"]
    if user_id in audio_records :  
        audio_records[user_id] = audio_records[user_id] + data["chunk"]
    else : 
        audio_records[user_id] = b'' + data["chunk"]
    
@socketio.on("record:process")
def process (data : dict) :
    
    user_id,username = data["user_id"], data["username"] 
    if user_id not in audio_records :
        socketio.emit("record:process_response","no se encontro ningun audio para procesar")
        return
    array_buffer = audio_records[data["user_id"]]
    print(f"chunk {len(array_buffer)} / {int(data['length'])*2} => {(len(array_buffer) / 4) / data['sample_rate']}")
    transcription = wav_sileros(
        array_buffer=array_buffer,
        sample_rate=data["sample_rate"],
        channels=1,
        sample_width=2
        )
    print(transcription)
    audio_records[data["user_id"]] = b''
    socketio.emit("record:process_response",{
        "message" : transcription,
        "user_id" : user_id,
        "time" : time.time() * 1000,
        "username" : username
    })

    
 