'use client';

import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  BellRing,
  ArrowRight,
  Mail,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signout } from '@/services/server';

export default function CarvioOnboardingSuccess() {
  const [timeLeft, setTimeLeft] = useState(7);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push('/');
      return;
    }

    const signoutUser = async() => {
      await signout();
    };

    signoutUser();

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router]);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] bg-gradient-radial from-[#2F8F83]/20 to-transparent opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-gradient-radial from-[#2F8F83]/10 to-transparent opacity-20" />
      </div>

      <main className="w-full max-w-[480px] relative z-10 animate-fadeInUp">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-10 shadow-xl text-center relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-white/[0.05]">
            <div className="h-full bg-[#2F8F83] w-full" />
          </div>

          <div className="mb-8 relative inline-block">
            <div className="w-20 h-20 rounded-full bg-[#2F8F83]/10 flex items-center justify-center mx-auto mb-2 border border-[#2F8F83]/20">
              <CheckCircle2 size={40} className="text-[#2F8F83]" />
            </div>
            <Sparkles
              className="absolute -top-2 -right-4 text-[#2F8F83] animate-bounce"
              size={20}
            />
          </div>

          <h1 className="text-3xl font-medium tracking-tight text-white mb-4">
            You're all set!
          </h1>

          <div className="space-y-4 mb-10">
            <p className="text-sm text-[#9BA7B4] leading-relaxed">
              Thank you for trusting{' '}
              <span className="text-white font-medium">Carvio</span>. We’re excited
              to help you find your next big opportunity without the noise.
            </p>

            <div className="bg-[#2F8F83]/5 border border-[#2F8F83]/10 rounded-xl p-4">
              <p className="text-xs text-[#2F8F83] font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                <BellRing size={14} /> Alerts Activated
              </p>
              <p className="text-[11px] text-[#9BA7B4] mt-1 font-light">
                We'll notify you as soon as a relevant role drops.
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="w-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group mb-4"
          >
            Return to Homepage
            <ArrowRight
              size={18}
              className="opacity-50 group-hover:translate-x-1 transition-transform"
            />
          </Link>

          {/* ✅ Timer text (minimal, no UI change) */}
          <p className="text-[11px] text-[#555E67]">
            Redirecting to homepage in {timeLeft}s
          </p>

          <div className="pt-8 border-t border-white/[0.05] space-y-4 mt-8">
            <div className="flex items-center justify-center gap-6">
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#555E67] tracking-widest uppercase">
                <ShieldCheck size={12} className="text-[#2F8F83]/60" /> Verified
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#555E67] tracking-widest uppercase">
                <Mail size={12} className="text-[#2F8F83]/60" /> Daily Drops
              </span>
            </div>

            <p className="text-[11px] text-[#555E67] leading-relaxed">
              Need to cancel or update your alerts? <br />
              Email us at{' '}
              <a
                href="mailto:xyz@gmail.com"
                className="text-[#2F8F83] hover:underline font-medium"
              >
                carvio.team@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-8 text-[10px] text-[#555E67] font-bold tracking-[0.4em] uppercase">
        Carvio India • 2026
      </footer>
    </div>
  );
}