import struct
import wave
import tempfile
import numpy as np
import os
from utils.monitoring import describe_data
def wav_path_from_ba (byte_data,sample_rate,sample_width,channels,temp=True) :
    print(f"generating path with...\nsample_rate: {sample_rate}\nsample_width: {sample_width}\nchannels: {channels}")
    if temp : 
        with tempfile.NamedTemporaryFile(delete=False,suffix=".wav") as temp_file :
            with wave.open(temp_file.name,"wb") as wav :
                wav.setnchannels(channels)
                wav.setsampwidth(sample_width)
                wav.setframerate(sample_rate)
                wav.writeframes(byte_data)
            return temp_file.name
    else : 
        path = os.path.join("last_audio.wav")
        with wave.open(path,"wb") as wav :
            wav.setnchannels(channels)
            wav.setsampwidth(sample_width)
            wav.setframerate(sample_rate)
            wav.writeframes(byte_data)
        return path
    
def ogg_path_from_ba (array_buffer) : 
    with open("test.ogg","wb") as f :
        f.write(array_buffer)

