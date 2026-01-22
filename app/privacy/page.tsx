'use client';

import React from 'react';
import { Shield, Lock, EyeOff } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DitherCanvas from '@/components/DitherCanvas';

export default function PrivacyPolicyPage() {
  const accentColor = '#ea628f';

  return (
    <div
      className="relative min-h-screen text-black selection:bg-[var(--accent-color)] selection:text-black font-sans"
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <DitherCanvas accentColor={accentColor} />
      <Header />

      <main>
        <div className="pt-32 md:pt-40 pb-20 px-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-16">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              PRIVACY <br/><span className="text-[var(--accent-color)]">POLICY.</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 font-medium max-w-2xl">
              We keep it simple. We are a recruitment agency, not a data broker.
            </p>
          </div>

          <div className="space-y-16">

            {/* Section 1 */}
            <div className="grid md:grid-cols-[100px_1fr] gap-6">
              <div className="w-16 h-16 bg-neutral-50 border border-neutral-200 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-black">We don&apos;t sell your data.</h3>
                <div className="prose prose-lg text-neutral-600 leading-relaxed">
                  <p>
                    Full stop. When you submit your profile as a candidate or your hiring requirements as a company, that information stays strictly within All Well Talent. We use it solely for the purpose of matching talent with opportunities.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="grid md:grid-cols-[100px_1fr] gap-6">
              <div className="w-16 h-16 bg-neutral-50 border border-neutral-200 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-black" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-black">What we collect.</h3>
                <div className="prose prose-lg text-neutral-600 leading-relaxed">
                  <p className="mb-4">We only collect information necessary to facilitate the hiring process:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>For Talent:</strong> Name, email, LinkedIn profile, resume/CV, and professional experience details.</li>
                    <li><strong>For Companies:</strong> Company name, contact person, email, and job requirements.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="grid md:grid-cols-[100px_1fr] gap-6">
              <div className="w-16 h-16 bg-neutral-50 border border-neutral-200 rounded-full flex items-center justify-center">
                <EyeOff className="w-8 h-8 text-black" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-black">Your Rights.</h3>
                <div className="prose prose-lg text-neutral-600 leading-relaxed">
                  <p>
                    You can request to have your data deleted from our internal database at any time. Simply email us at <strong>privacy@allwelltalent.com</strong> and we will wipe your record within 48 hours. No questions asked.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-24 pt-12 border-t border-neutral-200">
              <p className="text-sm text-neutral-400">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
