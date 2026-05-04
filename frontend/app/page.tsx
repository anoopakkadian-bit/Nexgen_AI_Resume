'use client'; // ക്ലയന്റ് സൈഡിൽ വർക്ക് ആകാൻ ഇത് നിർബന്ധമാണ്

import React, { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

 const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await fetch('https://nexgen-ai-resume.onrender.com/analye', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data.analysis);
    } catch (error) {
      console.error("Error uploading file:", error);
      setResult("Error: Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {/* Glow Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-4xl">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-slate-800 bg-slate-900/50 text-sm font-medium text-blue-400">
          Powered by Groq & Gemini AI 
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tight">
          NEXGEN <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI V2</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
          Unlock your career potential. Get instant resume scoring and professional AI feedback.
        </p>
      </div>

      {/* Upload Area */}
      <div className="relative z-10 mt-20 w-full max-w-3xl p-1 rounded-3xl bg-gradient-to-b from-slate-700 to-slate-900">
        <label className="bg-black/90 backdrop-blur-2xl rounded-[calc(1.5rem-1px)] p-12 border border-white/5 text-center group cursor-pointer block">
          <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">
            {loading ? "Analyzing..." : "Upload your Resume"}
          </h3>
          <p className="text-slate-500">PDF files only (Max 5MB)</p>
        </label>
      </div>

      {/* Result Display */}
      {result && (
        <div className="relative z-10 mt-10 p-8 max-w-3xl w-full bg-slate-900/50 border border-slate-800 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">AI Analysis Result</h2>
          <div className="text-slate-300 whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </main>
  );
}