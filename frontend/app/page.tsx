'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Settings,
  Upload,
  Bell,
  CheckCircle2,
  Activity,
  Menu,
  GraduationCap,
  Map,
  Compass,
  CheckSquare,
  Users,
  Loader2,
  FileCheck
} from 'lucide-react';

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

function NavItem({ icon, label, active = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
        active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
};

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#16181d] to-[#0f1115] p-6 hover:scale-[1.02] transition-all duration-300">
      <div className="{w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color}}">
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-white">{value}</h2>
      <p className="text-sm text-gray-400 mt-1">{title}</p>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  // File Upload States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // File Change Handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsUploading(true);
      setUploadSuccess(false);

      // Simulating an AI Upload process for 2 seconds
      setTimeout(() => {
        setIsUploading(false);
        setUploadSuccess(true);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 border-r border-white/10 bg-[#0b0c10] p-6 flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-600/20">
              C
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-wide">CAREER OS</h1>
              <p className="text-[10px] text-blue-500 font-semibold tracking-widest uppercase">Nextgen AI</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            <NavItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              active={activeTab === 'Dashboard'}
              onClick={() => setActiveTab('Dashboard')}
            />
            <NavItem
              icon={<FileText size={18} />}
              label="AI Resume Builder"
              active={activeTab === 'AI Resume Builder'}
              onClick={() => setActiveTab('AI Resume Builder')}
            />
            <NavItem
              icon={<Compass size={18} />}
              label="AI Portfolio Gen"
              active={activeTab === 'AI Portfolio Gen'}
              onClick={() => setActiveTab('AI Portfolio Gen')}
            />
            <NavItem
              icon={<CheckSquare size={18} />}
              label="Job Tracker"
              active={activeTab === 'Job Tracker'}
              onClick={() => setActiveTab('Job Tracker')}
            />
            <NavItem
              icon={<GraduationCap size={18} />}
              label="Interview Prep AI"
              active={activeTab === 'Interview Prep AI'}
              onClick={() => setActiveTab('Interview Prep AI')}
            />
            <NavItem
              icon={<Users size={18} />}
              label="AI Career Mentor"
              active={activeTab === 'AI Career Mentor'}
              onClick={() => setActiveTab('AI Career Mentor')}
            />
            <NavItem
              icon={<Map size={18} />}
              label="Skill Roadmap"
              active={activeTab === 'Skill Roadmap'}
              onClick={() => setActiveTab('Skill Roadmap')}
            />
            <NavItem
              icon={<Settings size={18} />}
              label="Settings"
              active={activeTab === 'Settings'}
              onClick={() => setActiveTab('Settings')}
            />
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="border-t border-white/10 pt-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-semibold text-sm text-white">
              AR
            </div>
            <div>
              <h3 className="font-semibold text-sm">Anoop Raj</h3>
              <p className="text-[10px] text-gray-500 font-medium">Pro Access Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-5 md:p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <button className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{activeTab}</h1>
              <p className="text-xs text-gray-400 mt-1">
                Your entire professional growth journey in one single system.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
              <Bell size={18} />
            </button>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-semibold text-sm">
              AR
            </div>
          </div>
        </header>

        {activeTab === 'Dashboard' && (
          <>
            {/* Highlights Stats */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
              <StatCard
                title="ATS Score Avg"
                value="88/100"
                icon={<FileText size={20} />}
                color="bg-blue-500/10 text-blue-500"
              />
              <StatCard
                title="Active Job Applications"
                value="14 Applications"
                icon={<CheckSquare size={20} />}
                color="bg-purple-500/10 text-purple-500"
              />
              <StatCard
                title="Mock Interview Accuracy"
                value="82%"
                icon={<GraduationCap size={20} />}
                color="bg-emerald-500/10 text-emerald-500"
              />
              <StatCard
                title="Roadmap Progress"
                value="65% Completed"
                icon={<Map size={20} />}
                color="bg-amber-500/10 text-amber-500"
              />
            </section>

            {/* Quick Hub grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 space-y-6">
                {/* AI Interactive Assistant Console */}
                <div className="rounded-3xl border border-white/10 bg-[#111216] p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                    AI Career Mentor Prompt
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Ask your personal AI Copilot anything about resumes, job hunting strategies, or career transitions.
                  </p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ask Mentor: 'Give me a mock interview question for Next.js developer'..." 
                      className="flex-1 bg-[#16181d] border border-white/5 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-3 rounded-2xl transition-all">
                      Analyze
                    </button>
                  </div>
                </div>

                {/* Main Core Modules Showcase */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer">
                    <h4 className="font-bold text-white mb-1">AI Resume Matcher</h4>
                    <p className="text-xs text-gray-400">Upload resume and job description to get instant ATS scores.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all cursor-pointer">
                    <h4 className="font-bold text-white mb-1">Portfolio Builder</h4>
                    <p className="text-xs text-gray-400">Generate a live, clean personal portfolio in seconds with AI.</p>
                  </div>
                </div>
              </div>

              {/* Right: Activity Track */}
              <div className="rounded-3xl border border-white/10 bg-[#111216] p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Live Roadmap Tracker</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-xs font-semibold text-white">Next.js + TypeScript Integration</p>
                        <p className="text-[10px] text-gray-500">Completed yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="text-xs font-semibold text-white">Supabase Auth Setup</p>
                        <p className="text-[10px] text-gray-500">In Progress</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400">AI Prompt Fine-tuning</p>
                        <p className="text-[10px] text-gray-500">Next Up</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 py-2.5 rounded-xl border border-white/10 text-xs font-medium text-white hover:bg-white/5 transition-all">
                  Open Career Blueprint
                </button>
              </div>
            </div>

            {/* Interactive Document upload block */}
            <section className="rounded-[32px] border border-dashed border-white/10 bg-gradient-to-br from-[#12141a] to-[#0d0f13] p-10 md:p-16 text-center hover:border-blue-500/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center mx-auto mb-5 text-blue-500">
                {isUploading ? (
                  <Loader2 size={28} className="animate-spin text-blue-500" />
                ) : uploadSuccess ? (
                  <FileCheck size={28} className="text-emerald-500" />
                ) : (
                  <Upload size={28} />
                )}
              </div>
              
              <h2 className="text-2xl font-bold mb-2">
                {isUploading ? "AI is parsing..." : uploadSuccess ? "Resume Loaded Successfully!" : "Upload Your Resume"}
              </h2>
              
              <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm">
                {selectedFile ? (
                  <span className="text-blue-400 font-semibold bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20">
                    📄 {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                ) : (
                  "Upload your latest resume. Our AI Engine parses and distributes data to Job Tracker, Interview prep, and Portfolio sections."
                )}
              </p>
              
              <label className="inline-flex">
                <input 
                  type="file" 
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden" 
                />
                <span className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer font-medium shadow-lg shadow-blue-600/20 text-sm">
                  {isUploading ? "Uploading..." : uploadSuccess ? "Change File" : "Browse Files"}
                </span>
              </label>
            </section>
          </>
        )}

        {/* Fallback for other sections under construction */}
        {activeTab !== 'Dashboard' && (
          <div className="min-h-[400px] rounded-3xl border border-white/10 bg-[#111216] p-12 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold mb-2">Connecting Module...</h3>
            <p className="text-sm text-gray-400 max-w-md">
              We are routing your AI engine requests to setup <span className="text-blue-500 font-semibold">{activeTab}</span> using Supabase & Gemini endpoints.
            </p>
            <button 
              onClick={() => setActiveTab('Dashboard')}
              className="mt-6 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-medium transition-all"
            >
              Back to System Monitor
            </button>
          </div>
        )}
      </main>
    </div>
  );
}