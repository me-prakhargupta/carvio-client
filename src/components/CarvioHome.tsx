// app/page.tsx
import React from "react";
import { Mail, ArrowRight, Clock, MapPin, CheckCircle2, Sparkles, Layers } from "lucide-react";
import Link from "next/link";

type JobCardProps = {
  role: string;
  time: string;
  tags: string[];
  opacity?: number;
};

const JobCard = React.memo(({ role, time, tags, opacity = 1 }: JobCardProps) => (
  <div
    className="p-4 rounded-xl border border-white/10 bg-white/5 transition-all hover:border-[#2F8F83]/40"
    style={{ opacity }}
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-medium text-sm text-white tracking-tight">{role}</h3>
      <div className="flex gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#2F8F83]/10 text-[#2F8F83] border border-[#2F8F83]/20 uppercase tracking-tight"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-3 text-[11px] text-[#9BA7B4]">
      <span className="flex items-center gap-1.5">
        <Clock size={12} /> {time}
      </span>
      <span className="hidden sm:flex items-center gap-1.5">
        <MapPin size={12} /> India
      </span>
    </div>
  </div>
));

export default function CarvioHome() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] antialiased">

      {/* 🧭 Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0B0F14]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
            <span className="text-white">Carvio</span>
          </div>

          <Link href="/onboarding/start" className="bg-[#2F8F83] hover:bg-[#3ba89b] text-white text-xs font-bold px-4 py-1.5 rounded-lg transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* 🎯 Hero */}
      <main className="pt-20 lg:pt-24 pb-12 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Left */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2F8F83]/10 border border-[#2F8F83]/20 text-[#2F8F83] text-[10px] font-bold tracking-[0.2em] uppercase">
              <Sparkles size={12} /> India High-Signal Feed
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-white">
              Stop Scrolling. <br />
              <span className="text-[#9BA7B4]">While Others Search, You Apply.</span>
            </h1>

            <p className="text-base md:text-lg text-[#9BA7B4] max-w-md leading-relaxed">
              Carvio currently filters 5+ sources to deliver only fresh, relevant opportunities directly to your inbox.
            </p>

            {/* Email Form Section */}
            <div className="space-y-4 max-w-md pt-2">
              {/* ⚡ NEW: Three Step Instruction Line */}
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#2F8F83] tracking-wider uppercase bg-[#2F8F83]/5 w-fit px-3 py-1.5 rounded-lg border border-[#2F8F83]/10">
                <Layers size={14} />
                <span>Just 3 steps to your first alert</span>
              </div>

              <div className="space-y-3">
                <Link href="/onboarding/start" className="w-full bg-[#2F8F83] hover:bg-[#3ba89b] py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition text-white group">
                  Get Started
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="text-center text-[10px] text-[#555E67] font-bold tracking-[0.15em] uppercase">
                  No spam • Only relevant jobs
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-6 bg-[#2F8F83]/10 blur-3xl rounded-full -z-10" />

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-[#2F8F83] rounded-full" />
                  <span className="text-[10px] font-bold text-[#2F8F83] tracking-widest uppercase">
                    Live Activity
                  </span>
                </div>

                <span className="text-[10px] text-[#9BA7B4] font-medium">
                  12 relevant from 20+
                </span>
              </div>

              <div className="space-y-3">
                <JobCard role="Frontend Engineer" time="2h ago" tags={["Full-time", "Remote"]} />
                <JobCard role="Product Design Intern" time="5h ago" tags={["Internship"]} />
                <JobCard role="Backend Developer" time="1d ago" tags={["Full-time"]} opacity={0.5} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 🧩 Features */}
      <section className="py-12 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            { t: "Fresh Only", d: "Jobs from last 72 hours." },
            { t: "High Signal", d: "No spam, no noise." },
            { t: "Student Focused", d: "Internships prioritized." }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-3">
              <CheckCircle2 className="text-[#2F8F83]" size={16} />
              <div>
                <h4 className="text-sm font-semibold text-white">{item.t}</h4>
                <p className="text-xs text-[#9BA7B4]">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🏁 Final CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-white mb-10 leading-tight">
          Stop wasting time scrolling. <br className="hidden sm:block" />
          Start applying.
        </h2>
        <Link href="/onboarding/start" className="bg-[#2F8F83] hover:bg-[#3ba89b] text-white font-bold px-10 py-4 mt-5 rounded-xl transition inline-block shadow-lg shadow-[#2F8F83]/10">
          Get Started
        </Link>
      </section>

      <footer className="py-8 border-t border-white/10 text-center text-xs text-[#555E67]">
        Carvio India • 2026
      </footer>
    </div>
  );
}