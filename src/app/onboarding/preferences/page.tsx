'use client';

import React, { useState } from 'react';
import { BellRing, MapPin, BadgeIndianRupee, Briefcase, Plus, X, Mail, ArrowRight } from 'lucide-react';
import { preferences } from '@/services/server';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function CarvioPreferences() {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  // ✅ NEW (roles as tags)
  const [roles, setRoles] = useState<string[]>([]);
  const [roleInput, setRoleInput] = useState('');

  const [location, setLocation] = useState('remote');
  const [minStipend, setMinStipend] = useState('');
  const router = useRouter();

  // ---------- SKILLS ----------
  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
      e.preventDefault();

      const values = skillInput.split(',').map(s => s.trim());
      const newSkills = values.filter(v => v && !skills.includes(v));

      setSkills([...skills, ...newSkills]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // ---------- ROLES ----------
  const addRole = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && roleInput.trim()) {
      e.preventDefault();

      const values = roleInput.split(',').map(r => r.trim());
      const newRoles = values.filter(v => v && !roles.includes(v));

      setRoles([...roles, ...newRoles]);
      setRoleInput('');
    }
  };

  const removeRole = (roleToRemove: string) => {
    setRoles(roles.filter(r => r !== roleToRemove));
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const payload = {
      roles: roles.map(r => r.toLowerCase().trim()),
      skills: skills.map(s => s.toLowerCase().trim()),
      minStipend: minStipend || undefined,
      location,
    };

    try {
      await preferences(payload);
      router.push("/onboarding/success")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="absolute top-8 flex flex-col items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-8 h-1 rounded-full bg-[#2F8F83]" />
          <div className="w-8 h-1 rounded-full bg-[#2F8F83]" />
          <div className="w-8 h-1 rounded-full bg-[#2F8F83]" />
        </div>
        <span className="text-[10px] font-bold text-[#555E67] tracking-widest uppercase">
          Step 3: Configure Your Alerts
        </span>
      </div>

      <main className="w-full max-w-[500px] relative z-10 py-12">
        <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
          
          <div className="mb-8">
            <h1 className="text-2xl font-medium tracking-tight text-white mb-2 flex items-center gap-2">
              Configure Your Alerts <BellRing size={20} className="text-[#2F8F83]" />
            </h1>
            <p className="text-sm text-[#9BA7B4] font-light">
              Tell us exactly what should trigger a notification.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Job Title (NOW TAG INPUT) */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#555E67] flex items-center gap-2">
                <Briefcase size={14} /> Alert for Job Title
              </label>

              <div className="min-h-[48px] p-2 bg-white/[0.03] border border-white/[0.1] rounded-xl flex flex-wrap gap-2 focus-within:border-[#2F8F83]/50 transition-all">
                {roles.map(role => (
                  <span key={role} className="flex items-center gap-1.5 bg-[#2F8F83]/10 text-[#2F8F83] text-xs font-semibold px-2.5 py-1 rounded-md border border-[#2F8F83]/20">
                    {role}
                    <button type="button" onClick={() => removeRole(role)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}

                <input
                  type="text"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  onKeyDown={addRole}
                  className="flex-1 bg-transparent border-none outline-none text-sm p-1 text-white placeholder:text-white/10"
                  placeholder={roles.length === 0 ? "e.g. Backend, Frontend, SDE" : ""}
                />
              </div>
            </div>

            {/* Skills (UNCHANGED UI) */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#555E67] flex items-center gap-2">
                <Plus size={14} /> Keyword Triggers (Press Enter)
              </label>
              <div className="min-h-[48px] p-2 bg-white/[0.03] border border-white/[0.1] rounded-xl flex flex-wrap gap-2 focus-within:border-[#2F8F83]/50 transition-all">
                {skills.map(skill => (
                  <span key={skill} className="flex items-center gap-1.5 bg-[#2F8F83]/10 text-[#2F8F83] text-xs font-semibold px-2.5 py-1 rounded-md border border-[#2F8F83]/20">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                  className="flex-1 bg-transparent border-none outline-none text-sm p-1 text-white placeholder:text-white/10"
                  placeholder={skills.length === 0 ? "e.g. React, Python, Remote" : ""}
                />
              </div>
            </div>

            {/* Stipend & Work Mode */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#555E67] flex items-center gap-2">
                  <BadgeIndianRupee size={14} /> Min. Stipend
                </label>
                <input
                  type="text"
                  value={minStipend}
                  onChange={(e) => setMinStipend(e.target.value)}
                  placeholder="Optional (₹)"
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#2F8F83]/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#555E67] flex items-center gap-2">
                  <MapPin size={14} /> Preference
                </label>
                <div className="flex bg-white/[0.03] border border-white/[0.1] rounded-xl p-1 h-[48px]">
                  {['remote', 'hybrid', 'onsite'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setLocation(mode)}
                      className={`flex-1 text-[10px] font-bold uppercase tracking-tighter rounded-lg transition-all ${
                        location === mode
                          ? 'bg-[#2F8F83] text-white shadow-lg shadow-[#2F8F83]/20'
                          : 'text-[#555E67] hover:text-[#9BA7B4]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2F8F83] hover:bg-[#3ba89b] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#2F8F83]/10 flex items-center justify-center gap-3 group mt-4"
            >
              Activate My Alerts
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}