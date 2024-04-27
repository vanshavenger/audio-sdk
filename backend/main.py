import audiostack
import os
import audiostack.content
import audiostack.speech
from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uuid
import uvicorn
from contextlib import asynccontextmanager
from fastapi.responses import FileResponse

from dotenv import load_dotenv

load_dotenv()

os.makedirs('audio_files', exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        print('App is starting up')
        yield
    finally:
        print('App is shutting down')
        for file in os.listdir('audio_files'):
            if file.endswith('.wav'):
                os.remove(os.path.join('audio_files', file))
        print('App is shut down successfully')

app = FastAPI(lifespan=lifespan)
app.mount('/audio_files', StaticFiles(directory='audio_files'), name='audio_files')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'], #Fun Purpose only
)

audiostack.api_key = os.getenv('AUDIOSTACK_API_KEY')

#routes

@app.post('/build_audio')
async def build_audio(script: str = Form(...)):
    try:
        os.makedirs('audio_files', exist_ok=True)
        name='Supriya'
        preset='musicenhanced'
        template='spring_day'
        file_name='audio_' + str(uuid.uuid4())
        file_path=os.path.join('audio_files', file_name)
        created_script = audiostack.content.Script.create(
            scriptText=script,
            scriptName='test_vansh',
            projectName='test_vansh',
        )
        speech= audiostack.Speech.TTS.create(
            scriptItem=created_script,
            voice=name,
            speed=1,
        )

        mix = audiostack.Production.Mix.create(
            speechItem=speech,
            masteringPreset=preset,
            soundTemplate=template,
        )

        mix.download(fileName=file_path)
        return {'url' : f'/audio_files/{file_name}'} #returning the file path (To download the file, no route set for now)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000) # everywhere host