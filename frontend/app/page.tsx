'use client';

import React, { ReactNode } from 'react';
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
} from 'lucide-react';

type NavItemProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
};

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
        active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
};

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#16181d] to-[#0f1115] p-6 hover:scale-[1.02] transition-all duration-300">
      <div
        className="{w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color}}"
      >
        {icon}
      </div>

      <h2 className="text-3xl font-bold text-white">{value}</h2>
      <p className="text-sm text-gray-400 mt-1">{title}</p>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 border-r border-white/10 bg-[#0b0c10] p-6 flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-600/20">
              N
            </div>

            <div>
              <h1 className="text-xl font-bold">Nexgen AI</h1>
              <p className="text-xs text-gray-500">Resume Platform</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="space-y-2">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active
            />

            <NavItem
              icon={<FileText size={20} />}
              label="My Resumes"
            />

            <NavItem
              icon={<Briefcase size={20} />}
              label="Job Matches"
            />

            <NavItem
              icon={<Settings size={20} />}
              label="Settings"
            />
          </nav>
        </div>

        {/* Profile */}
        <div className="border-t border-white/10 pt-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-semibold">
              AR
            </div>

            <div>
              <h3 className="font-medium">Anoop Raj</h3>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-5 md:p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <button className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Menu size={20} />
            </button>

            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-sm text-gray-400 mt-1">
                Welcome back, Anoop 👋
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
              <Bell size={20} />
            </button>

            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-semibold">
              AR
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <StatCard
            title="Total Resumes"
            value="12"
            icon={<FileText size={22} />}
            color="bg-blue-500/10 text-blue-500"
          />

          <StatCard
            title="AI Reviews"
            value="45"
            icon={<CheckCircle2 size={22} />}
            color="bg-emerald-500/10 text-emerald-500"
          />

          <StatCard
            title="System Status"
            value="Active"
            icon={<Activity size={22} />}
            color="bg-orange-500/10 text-orange-500"
          />
        </section>

        {/* Upload Section */}
        <section className="rounded-[32px] border border-dashed border-white/10 bg-gradient-to-br from-[#12141a] to-[#0d0f13] p-10 md:p-16 text-center hover:border-blue-500/40 transition-all duration-300">
          <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center mx-auto mb-5 text-blue-500">
            <Upload size={28} />
          </div>

          <h2 className="text-2xl font-bold mb-2">
            Upload Your Resume
          </h2>

          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Upload your resume and let AI analyze ATS score,
            formatting, and job matching instantly.
          </p>

          <label className="inline-flex">
            <input type="file" className="hidden" />

            <span className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer font-medium shadow-lg shadow-blue-600/20">
              Browse Files
            </span>
          </label>
        </section>
      </main>
    </div>
  );
}