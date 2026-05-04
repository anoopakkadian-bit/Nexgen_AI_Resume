import fitz  # PyMuPDF
from groq import Groq
import os
import json # JSON കൈകാര്യം ചെയ്യാൻ ഇത് വേണം
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_text_from_pdf(pdf_stream):
    doc = fitz.open(stream=pdf_stream, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def analyze_resume(resume_text):
    # ഇവിടെയാണ് നമ്മൾ പ്രോംപ്റ്റ് മാറ്റുന്നത്
    prompt = f"""
    You are an expert HR Manager and ATS Optimizer. Analyze the provided resume and return ONLY a valid JSON object.
    
    The JSON must follow this structure:
    {{
        "ats_score": (a number between 0-100),
        "professional_summary": "A short summary",
        "missing_skills": ["skill1", "skill2"],
        "strengths": ["strength1", "strength2"],
        "improvement_suggestions": ["tip1", "tip2"]
    }}

    Resume Text: {resume_text}
    """
    
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        response_format={ "type": "json_object" } # ഇത് AI-യോട് JSON തന്നെ വേണമെന്ന് നിർബന്ധിക്കും
    )
    
    # സ്ട്രിംഗിനെ പൈത്തൺ ഡിക്ഷണറിയിലേക്ക് മാറ്റുന്നു
    return json.loads(completion.choices[0].message.content)

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    try:
        pdf_content = await file.read()
        resume_text = extract_text_from_pdf(pdf_content)
        
        # ഇപ്പോൾ ഇത് ഒരു ഡിക്ഷണറി ആയിരിക്കും തിരിച്ചു തരുന്നത്
        analysis_result = analyze_resume(resume_text)
        
        return analysis_result # നേരിട്ട് ഡിക്ഷണറി അയക്കാം
    except Exception as e:
        return {"error": str(e)}