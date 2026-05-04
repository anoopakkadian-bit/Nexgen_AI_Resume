import fitz  # PyMuPDF
from groq import Groq
import os
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

# 1. പരിസ്ഥിതി സെറ്റിംഗ്സ് (Environment Settings)
load_dotenv()
app = FastAPI()

# 2. CORS സെറ്റിംഗ്സ് (ഫ്രണ്ട് എൻഡുമായി കണക്ട് ചെയ്യാൻ)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. AI ക്ലയന്റ് സെറ്റപ്പ്
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# 4. PDF-ൽ നിന്ന് ടെക്സ്റ്റ് എടുക്കാനുള്ള ഫങ്ക്ഷൻ
def extract_text_from_pdf(pdf_stream):
    doc = fitz.open(stream=pdf_stream, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

# 5. AI വഴി റെസ്യൂമെ അനലൈസ് ചെയ്യാനുള്ള ഫങ്ക്ഷൻ
def analyze_resume(resume_text):
    prompt = f"""
    You are an expert HR Manager. Analyze this resume and provide:
    1. A professional summary.
    2. Key skills missing for a software role.
    3. Suggestions to improve.
    Resume Text: {resume_text}
    """
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return completion.choices[0].message.content

# 6. മെയിൻ എൻഡ് പോയിന്റ് (ഇതാണ് ഫ്രണ്ട് എൻഡ് വിളിക്കുന്നത്)
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    try:
        # ഫയൽ വായിക്കുന്നു
        pdf_content = await file.read()
        
        # ടെക്സ്റ്റ് വേർതിരിക്കുന്നു
        resume_text = extract_text_from_pdf(pdf_content)
        
        # AI അനാലിസിസ് നടത്തുന്നു
        analysis_result = analyze_resume(resume_text)
        
        return {"analysis": analysis_result}
    except Exception as e:
        return {"error": str(e)}