'use client';

import React, { useState } from 'react';

interface AnalysisResult {
  ats_score: number;
  professional_summary: string;
  missing_skills: string[];
  strengths: string[];
  improvement_suggestions: string[];
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [jd, setJd] = useState(""); // JD സ്റ്റോർ ചെയ്യാൻ പുതിയ സ്റ്റേറ്റ്

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setLoading(true);
    setResult(null);
    
    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('jd', jd); // യൂസർ ടൈപ്പ് ചെയ്ത JD ബാക്ക്-എൻഡിലേക്ക് അയക്കുന്നു

    try {
      const response = await fetch('https://nexgen-ai-resume.onrender.com/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-6 pb-20">
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 text-center space-y-4 mt-12 mb-10">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
          NEXGEN <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">AI V2</span>
        </h1>
        <p className="text-slate-400 text-lg">Compare your resume with specific job roles instantly.</p>
      </div>

      <div className="relative z-10 w-full max-w-2xl space-y-6">
        {/* Job Description Box */}
        <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl">
          <label className="block text-sm font-medium text-slate-400 mb-2">Paste Job Description (Optional)</label>
          <textarea 
            className="w-full h-32 bg-black/50 border border-slate-700 rounded-xl p-3 text-sm focus:border-blue-500 outline-none transition-all"
            placeholder="Paste the job requirements here to get a tailored ATS score..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
        </div>

        {/* Upload Area */}
        <label className={`block p-10 rounded-3xl border-2 border-dashed transition-all cursor-pointer
          ${loading ? 'border-blue-500 bg-blue-500/5' : 'border-slate-800 hover:border-slate-600 bg-slate-900/30'}`}>
          <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} disabled={loading} />
          <div className="text-center">
            {loading ? (
              <div className="space-y-4">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-blue-400 animate-pulse">Analyzing with AI...</p>
              </div>
            ) : (
              <>
                <div className="text-3xl mb-2">📤</div>
                <h3 className="text-lg font-bold">Upload Resume</h3>
                <p className="text-slate-500 text-sm">Click to select PDF</p>
              </>
            )}
          </div>
        </label>
      </div>

      {/* Results Dashboard (ഇത് പഴയതുപോലെ തന്നെ തുടരും) */}
      {result && (
        <div className="relative z-10 mt-12 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
           {/* പഴയ അതേ result UI കോഡ് ഇവിടെ വരും (ATS Score, Summary, etc.) */}
           {/* (ഞാൻ നേരത്തെ തന്ന result സെക്ഷൻ ഇവിടെ പേസ്റ്റ് ചെയ്താൽ മതി) */}
           <div className="md:col-span-1 bg-slate-900/80 border border-slate-800 p-8 rounded-3xl flex flex-col items-center justify-center">
            <h3 className="text-slate-400 font-bold mb-6 uppercase tracking-wider text-sm">ATS Match Score</h3>
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32">
                <circle className="text-slate-800" strokeWidth="8" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64"/>
                <circle className="text-blue-500" strokeWidth="8" strokeDasharray={364} strokeDashoffset={364 - (364 * result.ats_score) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64"/>
              </svg>
              <span className="absolute text-3xl font-black">{result.ats_score}%</span>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2">⭐ Summary</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{result.professional_summary}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-3xl text-sm">
                <h3 className="text-red-400 font-bold mb-3">⚠️ Missing Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {result.missing_skills.map((s, i) => <span key={i} className="bg-red-500/10 px-2 py-1 rounded border border-red-500/20">{s}</span>)}
                </div>
              </div>
              <div className="bg-green-500/5 border border-green-500/20 p-6 rounded-3xl text-sm">
                <h3 className="text-green-400 font-bold mb-3">✅ Strengths</h3>
                <div className="flex flex-wrap gap-2">
                  {result.strengths.map((s, i) => <span key={i} className="bg-green-500/10 px-2 py-1 rounded border border-green-500/20">{s}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}