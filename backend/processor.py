import fitz  # PyMuPDF
from groq import Groq
import os
import json
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form # Form ഇവിടെ ആഡ് ചെയ്തു
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

# ഇവിടെ jd_text കൂടി സ്വീകരിക്കാൻ പാകത്തിന് മാറ്റി
def analyze_resume(resume_text, jd_text=None):
    # JD ഉണ്ടെങ്കിൽ അത് പ്രോംപ്റ്റിൽ ഉൾപ്പെടുത്തും
    context_instruction = f"Target Job Description: {jd_text}" if jd_text else "General software engineering role"
    
    prompt = f"""
    You are an expert HR Manager and ATS Optimizer. 
    Analyze the resume based on this context: {context_instruction}.
    
    Return ONLY a valid JSON object with this structure:
    {{
        "ats_score": (number 0-100),
        "professional_summary": "Short summary",
        "missing_skills": ["List skills missing specifically for this role"],
        "strengths": ["Key strengths found"],
        "improvement_suggestions": ["Actionable tips"]
    }}

    Resume Text: {resume_text}
    """
    
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        response_format={ "type": "json_object" }
    )
    
    return json.loads(completion.choices[0].message.content)

@app.post("/analyze")
async def analyze(file: UploadFile = File(...), jd: str = Form(None)): # jd ഇങ്ങോട്ട് സ്വീകരിക്കുന്നു
    try:
        pdf_content = await file.read()
        resume_text = extract_text_from_pdf(pdf_content)
        
        # റെസ്യൂമെയും ജെഡിയും അനലൈസ് ചെയ്യാൻ അയക്കുന്നു
        analysis_result = analyze_resume(resume_text, jd)
        
        return analysis_result
    except Exception as e:
        return {"error": str(e)}