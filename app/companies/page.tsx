'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Building2, Mail, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DitherCanvas from '@/components/DitherCanvas';

export default function CompaniesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    hiringNeeds: '',
  });
  const accentColor = '#ea628f';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact/companies', {
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
            <h2 className="text-5xl font-bold tracking-tighter mb-4">Got It</h2>
            <p className="text-xl text-neutral-600 max-w-md">
              We&apos;ll reach out today to set up a quick call. Usually within a few hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-12 text-sm font-bold underline hover:text-[var(--accent-color)]"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <div className="pt-32 md:pt-40 pb-20 px-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                  NO AI. <br/><span className="text-[var(--accent-color)]">REAL INTERVIEWS.</span>
                </h1>
                <p className="text-xl md:text-2xl text-neutral-600 mb-12 font-medium max-w-lg">
                  Other agencies run your job through an algorithm. <span className="text-black font-semibold">We actually talk to engineers.</span> You only meet people worth your time.
                </p>

                <div className="space-y-6 hidden md:block">
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center shrink-0">
                         <span className="text-xl font-bold">01</span>
                      </div>
                      <div>
                        <p className="text-lg font-bold">15-minute call</p>
                        <p className="text-neutral-500">We learn your stack, team, and what actually matters.</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center shrink-0">
                         <span className="text-xl font-bold">02</span>
                      </div>
                      <div>
                        <p className="text-lg font-bold">Engineers vet engineers</p>
                        <p className="text-neutral-500">Real technical interviews by people who&apos;ve shipped code. Not recruiters with scripts.</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center shrink-0">
                         <span className="text-xl font-bold">03</span>
                      </div>
                      <div>
                        <p className="text-lg font-bold">You meet who matters</p>
                        <p className="text-neutral-500">3-5 candidates who actually fit. No resume spam.</p>
                      </div>
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
                    <label className="text-sm font-bold uppercase tracking-wider text-neutral-500">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute top-4 left-4 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-200 p-4 pl-12 rounded-lg focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none font-medium transition-all"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-neutral-500">Contact Name</label>
                      <div className="relative">
                        <User className="absolute top-4 left-4 w-5 h-5 text-neutral-400" />
                        <input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 p-4 pl-12 rounded-lg focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none font-medium transition-all"
                          placeholder="Jane Doe"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-neutral-500">Work Email</label>
                      <div className="relative">
                        <Mail className="absolute top-4 left-4 w-5 h-5 text-neutral-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-200 p-4 pl-12 rounded-lg focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none font-medium transition-all"
                          placeholder="jane@acme.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-neutral-500">Hiring Needs</label>
                    <textarea
                      required
                      value={formData.hiringNeeds}
                      onChange={(e) => setFormData({ ...formData, hiringNeeds: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-200 p-4 rounded-lg focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] outline-none font-medium transition-all min-h-[150px]"
                      placeholder="We are looking for a Senior React Engineer with Python experience..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white font-bold text-xl py-5 rounded-lg hover:bg-[var(--accent-color)] hover:text-black transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? 'Processing...' : 'Start Hiring'}
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
