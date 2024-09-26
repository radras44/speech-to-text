from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from models import Transcriptor
transcriptor = Transcriptor()
audio_records = {}
app = Flask(__name__)
CORS(
    app,
    resources={r"/*" : {"origins" : "*"}}
    )
socketio = SocketIO(app,cors_allowed_origins="*")
