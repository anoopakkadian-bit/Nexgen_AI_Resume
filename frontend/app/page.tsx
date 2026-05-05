"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !jobDescription) {
      alert("Please upload a resume and provide a job description.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      const response = await axios.post("https://nexgen-ai-resume-backend.onrender.com/analyze", formData);
      setResult(response.data);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Error connecting to backend. Please wait a minute and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 1. PROFESSIONAL NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="text-2xl font-bold text-blue-600 tracking-tighter">
          NEXGEN <span className="text-gray-900">AI</span>
        </div>
        <div className="hidden md:flex space-x-8 font-medium text-gray-600">
          <a href="#" className="hover:text-blue-600">Resume Checker</a>
          <a href="#" className="hover:text-blue-600">Features</a>
          <a href="#" className="hover:text-blue-600">FAQ</a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 font-medium px-4 py-2">Log in</button>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition">
            Sign up free
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION & UPLOADER */}
      <main className="max-w-4xl mx-auto pt-16 pb-24 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Get more interviews with an <span className="text-blue-600">AI-powered</span> resume
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Upload your resume and the job description to see how well you match. 
          Our AI gives you instant feedback to land your 20 LPA dream job.
        </p>

        <div className="bg-gray-50 p-8 rounded-3xl border-2 border-dashed border-gray-200 shadow-sm">
          <textarea
            className="w-full p-4 mb-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-40"
            placeholder="Paste Job Description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-gray-200 shadow-sm mb-4">
            <input
              type="file"
              className="mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <p className="text-gray-400 text-sm">Upload PDF or DOCX</p>
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full py-4 rounded-xl text-lg font-bold text-white transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg"
            }`}
          >
            {loading ? "AI is Analyzing..." : "Analyze My Resume"}
          </button>
        </div>

        {/* 3. RESULTS SECTION */}
        {result && (
          <div className="mt-12 p-8 bg-white rounded-3xl border border-gray-200 shadow-xl text-left animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
              <div className="text-4xl font-black text-blue-600 bg-blue-50 px-6 py-2 rounded-2xl">
                {result.match_score}%
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-green-600 mb-2 flex items-center">
                   ✅ Strengths
                </h3>
                <ul className="space-y-2">
                  {result.strengths?.map((s: string, i: number) => (
                    <li key={i} className="bg-green-50 p-3 rounded-lg text-gray-700 text-sm">{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-red-600 mb-2 flex items-center">
                   ⚠️ Missing Skills
                </h3>
                <ul className="space-y-2">
                  {result.missing_skills?.map((m: string, i: number) => (
                    <li key={i} className="bg-red-50 p-3 rounded-lg text-gray-700 text-sm">{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. FAQ / MOTIVES SECTION */}
      <footer className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-800 p-6 rounded-2xl">
              <h4 className="font-bold mb-2">How accurate is the AI?</h4>
              <p className="text-gray-400 text-sm">We use advanced NLP models to compare your resume against industry standards and specific JD requirements.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl">
              <h4 className="font-bold mb-2">Is my data safe?</h4>
              <p className="text-gray-400 text-sm">We do not store your resumes. Your files are processed in real-time and deleted immediately after analysis.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}