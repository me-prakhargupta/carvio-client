'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { signup } from '@/services/server';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CarvioOnboardingStart() {
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState({ 
      fullname: "", 
      email: "" 
  });

  const router = useRouter();

  const handleSubmit = async(e: React.SubmitEvent) => {
      e.preventDefault();
      setClicked(true);
      try {
        await signup(formData);
        toast.success("We’ve sent a verification link. Check your email to continue.");
        router.push("/onboarding/verify-email");
      } catch(error) {
          
      } finally {
        setClicked(false);
        setFormData({
          fullname: "",
          email: ""
        });
      }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] flex flex-col items-center justify-center px-6">

        <div className="flex flex-col items-center gap-2 mt-5 mb-3">
          <div className="flex gap-1.5">
            <div className="w-8 h-1 rounded-full bg-[#2F8F83]" />
          </div>
          <span className="text-[10px] font-bold text-[#555E67] tracking-widest uppercase">Step 1: Get started with Carvio</span>
      </div>

      {/* Soft background glow (reduced) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[200px] h-[200px] bg-[#2F8F83]/10 blur-3xl rounded-full" />
      </div>

      {/* Card */}
      <main className="w-full max-w-[420px] relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-[#2F8F83]/10 border border-[#2F8F83]/20 text-[#2F8F83] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              <Zap size={12} /> Quick Setup
            </div>

            <h1 className="text-2xl font-medium text-white mb-2">
              Get started with <span><Link href="/">Carvio</Link></span>
            </h1>

            <p className="text-sm text-[#9BA7B4]">
              Start receiving relevant job alerts in seconds.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-[11px] font-bold uppercase text-[#555E67] ml-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
                className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2F8F83]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#555E67] ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2F8F83]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2F8F83] hover:bg-[#3ba89b] text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            >
              {clicked? "Geeting Started.." : "Get Started"}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <div className="flex justify-center gap-4 mb-2">
              <span className="flex items-center gap-1 text-[10px] text-[#555E67] font-bold">
                <ShieldCheck size={12} /> NO SPAM
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#555E67] font-bold">
                <Sparkles size={12} /> FRESH JOBS
              </span>
            </div>

            <p className="text-[11px] text-[#555E67]">
              Takes less than 10 seconds
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 text-[10px] text-[#555E67]">
        Carvio • 2026
      </footer>
    </div>
  );
}