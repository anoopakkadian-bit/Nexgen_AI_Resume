"use client";
import React, { useState } from "react";
import axios from "axios";
import { 
  LayoutDashboard, FileText, Briefcase, Settings, 
  Upload, Search, Bell, User, CheckCircle, AlertCircle 
} from "lucide-react";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      // പ്രധാനപ്പെട്ടത്: ഇവിടെ നിന്റെ Render ലിങ്ക് പേസ്റ്റ് ചെയ്യുക (ഉദാഹരണത്തിന്: https://nexgen-backend.onrender.com/analyze)
      const res = await axios.post("https://nexgen-ai-resume-backend.onrender.com/analyze", formData);
      setScore(res.data.ats_score);
    } catch (err) {
      console.error(err);
      alert("Backend connection error. Please wait for Render to wake up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111114] border-r border-gray-800 flex flex-col hidden md:flex">
        <div className="p-6 text-2xl font-bold tracking-tighter text-blue-500">
          NEXGEN <span className="text-white">AI</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<FileText size={20}/>} label="AI Resume Builder" />
          <NavItem icon={<Search size={20}/>} label="Job Matcher" />
          <NavItem icon={<Briefcase size={20}/>} label="Interview Prep" />
          <NavItem icon={<Settings size={20}/>} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-[#111114] border-b border-gray-800 flex items-center justify-between px-8">
          <div className="text-lg font-medium text-gray-400">Overview</div>
          <div className="flex items-center space-x-4">
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <div className="flex items-center space-x-2 bg-[#1c1c21] px-3 py-1.5 rounded-full border border-gray-700">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs">A</div>
              <span className="text-sm font-medium">Anoop Raj</span>
            </div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back, Anoop</h1>
            <p className="text-gray-500 mt-1">Ready to upgrade your career journey?</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#111114] p-8 rounded-2xl border border-gray-800 shadow-xl">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Upload size={20} className="text-blue-500" /> AI Smart Scan
                </h2>
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-10 text-center hover:border-blue-500 transition-colors bg-[#16161a]">
                  <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden" 
                    id="resume-upload" 
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="bg-blue-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="text-blue-500" size={32} />
                    </div>
                    <p className="text-lg font-medium">{file ? file.name : "Click to upload resume"}</p>
                  </label>
                </div>
                <button 
                  onClick={handleUpload}
                  disabled={loading}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50"
                >
                  {loading ? "Analyzing..." : "Run AI Analysis"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatCard title="Applications" value="12" icon={<Briefcase size={18}/>} color="text-blue-400" />
                <StatCard title="Interviews" value="03" icon={<CheckCircle size={18}/>} color="text-green-400" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-[#111114] p-8 rounded-2xl border border-gray-800 flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold mb-8">ATS Readiness Score</h3>
                <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="#1c1c21" strokeWidth="12" fill="transparent" />
                    <circle 
                      cx="80" cy="80" r="70" stroke="#2563eb" strokeWidth="12" fill="transparent"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (440 * (score || 0)) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <span className="absolute text-4xl font-bold">{score || 0}%</span>
                </div>
                <p className="text-sm text-gray-400 mb-6">Resume Health: {score && score > 70 ? 'Excellent' : 'Needs Review'}</p>
                <div className="w-full space-y-3 text-left">
                   <div className="flex items-center justify-between p-3 bg-[#16161a] rounded-lg border border-gray-800">
                      <div className="flex items-center gap-2 text-sm text-red-400"><AlertCircle size={14}/> Formatting</div>
                      <span className="text-xs font-bold text-gray-500">Fixed</span>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-[#16161a] rounded-lg border border-gray-800">
                      <div className="flex items-center gap-2 text-sm text-green-400"><CheckCircle size={14}/> Industry Keywords</div>
                      <span className="text-xs font-bold text-gray-500">Good</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' : 'text-gray-400 hover:bg-gray-800'}}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: any, color: string }) {
  return (
    <div className="bg-[#111114] p-6 rounded-2xl border border-gray-800">
      <div className={mb-4 ${color}}>{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-gray-500 text-sm">{title}</div>
    </div>
  );
}