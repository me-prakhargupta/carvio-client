'use client';

import Link from 'next/link';
import { ArrowLeft, Search, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] flex flex-col items-center justify-center p-6 font-sans">

      <div className="w-full max-w-[480px] text-center">

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#2F8F83]/10 flex items-center justify-center border border-[#2F8F83]/20">
            <AlertTriangle size={28} className="text-[#2F8F83]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-medium text-white mb-3">
          Page not found
        </h1>

        {/* Description */}
        <p className="text-sm text-[#9BA7B4] mb-8 leading-relaxed">
          The page you're looking for doesn’t exist or may have been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">

          <Link
            href="/"
            className="w-full bg-[#2F8F83] hover:bg-[#3ba89b] text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Go to Homepage
            <ArrowLeft size={16} />
          </Link>

          <Link
            href="/onboarding/start"
            className="w-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Explore Opportunities
            <Search size={16} />
          </Link>

        </div>

        {/* Footer hint */}
        <p className="text-[11px] text-[#555E67] mt-8">
          Error 404 • Carvio
        </p>
      </div>
    </div>
  );
}