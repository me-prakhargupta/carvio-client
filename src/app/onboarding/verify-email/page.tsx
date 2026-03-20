'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, ArrowRight, ShieldCheck, Timer, RefreshCw, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { verifyCode } from '@/services/server';
import { toast } from 'sonner';

function VerifyContent() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const userEmail = searchParams.get('email') || 'your-email@example.com';

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInput = (index: number, e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    const char = value.substring(value.length - 1);
    newOtp[index] = char;
    setOtp(newOtp);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const code = otp.join('');

    if (code.length !== 6) {
      toast.error("Enter the 6-digit code");
      return;
    }

    try {
      await verifyCode(code);
      toast.success("Email verified successfully");
      router.push("/onboarding/preferences");
    } catch (error) {
      toast.error("Invalid or expired code. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] flex flex-col items-center justify-center p-6 font-sans">
      <div className="flex flex-col items-center gap-2 mb-3">
        <div className="flex gap-1.5">
          <div className="w-8 h-1 rounded-full bg-[#2F8F83]" />
          <div className="w-8 h-1 rounded-full bg-[#2F8F83]" />
        </div>
        <span className="text-[10px] font-bold text-[#555E67] tracking-widest uppercase">Step 2: Verify Your Email</span>
      </div>

      <main className="w-full max-w-[440px] relative z-10">
        <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#2F8F83]/10 text-[#2F8F83] mb-6 mx-auto">
              <Mail size={24} />
            </div>
            <h1 className="text-2xl font-medium tracking-tight text-white mb-2">Verify your email</h1>
            
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm text-[#9BA7B4] font-light leading-relaxed">
                We've sent a 6-digit code to your email
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-2 mb-8">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  value={digit}
                  onInput={(e) => handleInput(idx, e)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-14 bg-white/[0.03] border border-white/[0.1] rounded-xl text-center text-xl font-semibold text-[#2F8F83] outline-none transition-all focus:border-[#2F8F83] focus:ring-1 focus:ring-[#2F8F83]/20 focus:bg-white/[0.06]"
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mb-8 py-2 px-4 rounded-lg bg-white/[0.02] border border-white/[0.05] w-fit mx-auto">
              <Timer size={14} className={timeLeft < 60 ? "text-red-400" : "text-[#2F8F83]"} />
              <span className={`text-[11px] font-bold tracking-widest uppercase ${timeLeft < 60 ? "text-red-400" : "text-[#9BA7B4]"}`}>
                Expires in {formatTime(timeLeft)}
              </span>
            </div>

            <button type='submit' className="w-full bg-[#2F8F83] hover:bg-[#3ba89b] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#2F8F83]/10 flex items-center justify-center gap-2 group">
              Verify Code
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/[0.05] text-center">
            <button 
              type="button"
              onClick={() => setTimeLeft(300)}
              className="inline-flex items-center gap-2 text-xs text-[#2F8F83] font-medium hover:text-[#3ba89b] transition-colors"
            >
              <RefreshCw size={12} /> Resend Verification Code
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CarvioOnboardingVerify() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0F14]" />}>
      <VerifyContent />
    </Suspense>
  );
}