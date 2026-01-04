'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 bg-neutral-50 border-t border-neutral-200 text-neutral-500 text-base font-medium">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--accent-color)] rounded-full"></div>
              <span className="font-bold text-black tracking-tight text-xl">All Well</span>
            </div>
            <p className="text-neutral-500 max-w-xs">
              Senior engineers from Latin America. Fully vetted for skills, English, and culture fit.
            </p>
          </div>
          <div className="flex gap-8 md:gap-12">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Company</span>
              <div className="flex flex-col gap-2">
                <Link href="/companies" className="hover:text-black transition-colors">For Companies</Link>
                <Link href="/talent" className="hover:text-black transition-colors">For Engineers</Link>
                <Link href="/#methodology" className="hover:text-black transition-colors">How We Work</Link>
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Legal</span>
              <div className="flex flex-col gap-2">
                <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
          <span>© {new Date().getFullYear()} All Well Talent · Mexico City</span>
          <a
            href="https://claude.ai/code"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-neutral-600 transition-colors"
          >
            <span>Built with Claude Code</span>
            <img src="/claude_ai.png" alt="Anthropic" width={16} height={16} className="opacity-60" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
