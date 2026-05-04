import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware # ഇത് പുതിയതാണ്
from groq import Groq
import PyPDF2
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Frontend-ൽ നിന്ന് ഡാറ്റ വരാൻ അനുവാദം കൊടുക്കുന്നു
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # നിലവിൽ എല്ലാവരെയും അനുവദിക്കുന്നു
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.get("/")
def home():
    return {"status": "Nexgen AI Backend is Running!"}

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    pdf_reader = PyPDF2.PdfReader(file.file)
    resume_text = ""
    for page in pdf_reader.pages:
        resume_text += page.extract_text()

    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "You are a professional HR. Provide a score out of 100 and 3 brief tips."},
            {"role": "user", "content": resume_text[:4000]} # ആദ്യത്തെ 4000 അക്ഷരങ്ങൾ മാത്രം എടുക്കുന്നു
        ]
    )

    return {"analysis": completion.choices[0].message.content}