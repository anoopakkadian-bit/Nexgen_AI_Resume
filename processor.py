import fitz  # PyMuPDF
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_text_from_pdf(pdf_file):
    doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

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