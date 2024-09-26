import torch
import zipfile
import torchaudio
from glob import glob
from utils.transcriptor_utils import prepare_model_input,read_batch

class Transcriptor () :
    def __init__ (self) :
        self.device = torch.device("cpu")
        self.model,self.decoder,_ = torch.hub.load(
            repo_or_dir='snakers4/silero-models',
            model='silero_stt',
            language='es',
            device=self.device
            )
        
    def from_file (self,path : str,format) : 
        file_path = glob(path)
        print("transcripting...")
        input = prepare_model_input(
            read_batch(file_path,format=format),
            device=self.device
            )

        output = self.model(input)
        transcription : str = ""
        for example in output:
            message = self.decoder(example.cpu())
            transcription += f"{message}"
        print("end of transcription")
        if transcription.strip() == "" :
            transcription = "No se ha podido transcribir"
        return transcription

