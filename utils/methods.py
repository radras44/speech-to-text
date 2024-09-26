from utils.monitoring import describe_data
from utils.path_generator import *
from glob import glob
from app_config import audio_records,transcriptor
def wav_sileros (array_buffer,sample_rate,sample_width,channels) : 
    path= wav_path_from_ba(
        byte_data=array_buffer,
        sample_rate=int(sample_rate),
        sample_width=2,
        channels=1,
        temp=True
    )
    print("path: ",path)
    file_path = glob(path)[0]
    message = transcriptor.from_file(file_path,format="wav")
    return message
    
   

