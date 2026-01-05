'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Linkedin, Code2, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DitherCanvas from '@/components/DitherCanvas';

export default function TalentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedinUrl: '',
    primaryTech: 'JavaScript / TypeScript',
    yoe: '3-5 Years',
    location: '',
  });
  const accentColor = '#9D62EA';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact/talent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative min-h-screen text-black selection:bg-[var(--accent-color)] selection:text-black font-sans"
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <DitherCanvas accentColor={accentColor} />
      <Header />

      <main>
        {submitted ? (
          <div className="pt-48 pb-20 px-6 max-w-3xl mx-auto min-h-[60vh] flex flex-col justify-center items-center text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-[var(--accent-color)] rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-12 h-12 text-black" />
            </div>
            <h2 className="text-5xl font-bold tracking-tighter mb-4">You&apos;re In</h2>
            <p className="text-xl text-neutral-600 max-w-md">
              We&apos;ll review your profile and reach out when we have something that fits. No spam, just real opportunities.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-12 text-sm font-bold underline hover:text-[var(--accent-color)]"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="pt-32 md:pt-40 pb-20 px-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                  WORK WITH <br/><span className="text-[var(--accent-color)]">US STARTUPS.</span>
                </h1>
                <p className="text-xl md:text-2xl text-neutral-600 mb-12 font-medium max-w-lg">
                  Full-time roles. USD salary. Remote. Your hours.
                </p>

                <div className="grid grid-cols-1 gap-6 mb-12">
                  <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-[var(--accent-color)] rounded-full"></span>
                          Real Pay
                      </h3>
                      <p className="text-neutral-500">We push for what you&apos;re worth. No lowballing. Competitive with US rates.</p>
                  </div>
                  <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-[var(--accent-color)] rounded-full"></span>
                          Real Jobs
                      </h3>
                      <p className="text-neutral-500">No 3-month gigs. We only work with companies looking for long-term hires.</p>
                  </div>
                  <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-[var(--accent-color)] rounded-full"></span>
                          Real Process
                      </h3>
                      <p className="text-neutral-500">We vet for technical skills, English fluency, and culture match. If you pass, you&apos;re in.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-neutral-200 p-8 md:p-10 rounded-2xl shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-neutral-500">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 p-4 rounded-lg focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none font-medium transition-all"
                      placeholder="Mateus Silva"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-neutral-500">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 p-4 rounded-lg focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none font-medium transition-all"
                      placeholder="mateus@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-neutral-500">LinkedIn URL</label>
                    <div className="relative">
                      <Linkedin className="absolute top-4 left-4 w-5 h-5 text-neutral-400" />
                      <input
                        type="url"
                        required
                        value={formData.linkedinUrl}
                        onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 p-4 pl-12 rounded-lg focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none font-medium transition-all"
                        placeholder="linkedin.com/in/..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-neutral-500">Primary Tech</label>
                      <div className="relative">
                          <Code2 className="absolute top-4 left-4 w-5 h-5 text-neutral-400" />
                          <select
                            value={formData.primaryTech}
                            onChange={(e) => setFormData({ ...formData, primaryTech: e.target.value })}
                            className="w-full bg-neutral-50 border border-neutral-200 p-4 pl-12 rounded-lg focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none font-medium transition-all appearance-none"
                          >
                              <option>JavaScript / TypeScript</option>
                              <option>Python</option>
                              <option>Go</option>
                              <option>Ruby</option>
                              <option>Java / Kotlin</option>
                              <option>Rust</option>
                              <option>Other</option>
                          </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-neutral-500">YOE</label>
                      <div className="relative">
                          <Clock className="absolute top-4 left-4 w-5 h-5 text-neutral-400" />
                          <select
                            value={formData.yoe}
                            onChange={(e) => setFormData({ ...formData, yoe: e.target.value })}
                            className="w-full bg-neutral-50 border border-neutral-200 p-4 pl-12 rounded-lg focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none font-medium transition-all appearance-none"
                          >
                              <option>3-5 Years</option>
                              <option>5-8 Years</option>
                              <option>8-10 Years</option>
                              <option>10+ Years</option>
                          </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-bold uppercase tracking-wider text-neutral-500">Location (City/Country)</label>
                      <div className="relative">
                        <MapPin className="absolute top-4 left-4 w-5 h-5 text-neutral-400" />
                        <input
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 p-4 pl-12 rounded-lg focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none font-medium transition-all"
                          placeholder="São Paulo, Brazil"
                        />
                      </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white font-bold text-xl py-5 rounded-lg hover:bg-[var(--accent-color)] hover:text-black transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? 'Processing...' : 'Apply Now'}
                    {!isSubmitting && <ArrowRight className="w-6 h-6" />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
