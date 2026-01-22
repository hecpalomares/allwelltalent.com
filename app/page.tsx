'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, MapPin, Clock, ChevronLeft, ChevronRight, Database, Cloud, Layout, Terminal, Server, Shield, Phone, Users, X, Check } from 'lucide-react';
import Link from 'next/link';
import DitherCanvas from '@/components/DitherCanvas';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const cities = [
  "Mexico City", "São Paulo", "Bogotá", "Buenos Aires",
  "Guadalajara", "Medellin", "Monterrey", "Rio de Janeiro",
  "Córdoba", "San José"
];


const talentProfiles = [
  {
    id: 1,
    city: "Mexico City",
    icon: <Terminal className="w-8 h-8 text-neutral-400 group-hover:text-[var(--accent-color)] transition-colors duration-200" />,
    name: "Sofia M.",
    role: "Senior Full Stack",
    exp: "6 YOE",
    tech: ["Ruby on Rails", "React", "PostgreSQL"]
  },
  {
    id: 2,
    city: "São Paulo",
    icon: <Server className="w-8 h-8 text-neutral-400 group-hover:text-[var(--accent-color)] transition-colors duration-200" />,
    name: "Mateus S.",
    role: "Backend Lead",
    exp: "8 YOE",
    tech: ["Go", "Microservices", "Kubernetes"]
  },
  {
    id: 3,
    city: "Guadalajara",
    icon: <CodeIcon className="w-8 h-8 text-neutral-400 group-hover:text-[var(--accent-color)] transition-colors duration-200" />,
    name: "Diego R.",
    role: "Senior Backend",
    exp: "10 YOE",
    tech: ["PHP", "Laravel", "Vue.js"]
  },
  {
    id: 4,
    city: "Buenos Aires",
    icon: <Database className="w-8 h-8 text-neutral-400 group-hover:text-[var(--accent-color)] transition-colors duration-200" />,
    name: "Julian G.",
    role: "Python Engineer",
    exp: "4 YOE",
    tech: ["Python", "Django", "AWS"]
  },
  {
    id: 5,
    city: "Lima",
    icon: <Layout className="w-8 h-8 text-neutral-400 group-hover:text-[var(--accent-color)] transition-colors duration-200" />,
    name: "Elena V.",
    role: "Frontend Specialist",
    exp: "9 YOE",
    tech: ["React", "TypeScript", "Next.js"]
  },
  {
    id: 6,
    city: "Montevideo",
    icon: <Cloud className="w-8 h-8 text-neutral-400 group-hover:text-[var(--accent-color)] transition-colors duration-200" />,
    name: "Lucas B.",
    role: "DevOps Engineer",
    exp: "5 YOE",
    tech: ["Terraform", "Azure", "Docker"]
  }
];

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

const CountUp = ({ end, label, subLabel }: { end: number, label: string, subLabel: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2500;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(ease * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="relative group cursor-default flex flex-col items-center md:items-start">
        <div className="flex items-start">
            <span className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-bold leading-[0.8] tracking-tight text-neutral-900 group-hover:text-[var(--accent-color)] transition-colors duration-300 select-none">
                {count}
            </span>
            <span className="text-4xl md:text-6xl font-bold text-[var(--accent-color)] group-hover:text-black transition-colors duration-300 mt-4 md:mt-8">+</span>
        </div>
        <div className="mt-6 md:mt-8 border-t-4 border-black w-12 group-hover:w-full transition-all duration-300 ease-out"></div>
        <div className="mt-6 text-center md:text-left">
            <p className="text-2xl md:text-4xl font-bold text-black tracking-normal leading-tight mb-2">
                {label}
            </p>
            <p className="text-lg md:text-xl text-neutral-400 font-medium">
                {subLabel}
            </p>
        </div>
    </div>
  );
};

export default function HomePage() {
  const [accentColor, setAccentColor] = useState('#ea628f');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);


  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className="relative min-h-screen text-black selection:bg-[var(--accent-color)] selection:text-black font-sans"
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <DitherCanvas accentColor={accentColor} />
      <Header />

      {/* Color Picker Toggle Button */}
      <button
        onClick={() => setShowColorPicker(!showColorPicker)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform"
        style={{ backgroundColor: accentColor }}
        aria-label="Change accent color"
      />

      {/* Color Picker Widget */}
      {showColorPicker && (
        <div className="fixed bottom-16 right-4 md:bottom-20 md:right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-white border border-neutral-200 p-3 md:p-4 rounded-xl shadow-2xl">
            <div className="grid grid-cols-4 gap-2 md:gap-3 mb-3">
              {['#ea628f', '#9D62EA', '#7000ff', '#00ffd5', '#ccff00', '#ffaa00', '#0066ff', '#000000'].map(color => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 ${accentColor === color ? 'border-black scale-110' : 'border-neutral-200'} shadow-sm transition-all hover:scale-110`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="relative h-8 md:h-10 rounded-lg overflow-hidden border border-neutral-200">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="absolute inset-0 w-full h-full cursor-pointer border-0"
              />
            </div>
            <div className="mt-2 md:mt-3 text-center text-xs text-neutral-400 font-medium">
              Pick your vibe
            </div>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-4 md:px-6 overflow-hidden">
          {/* LATAM Silhouette Background */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[800px] md:w-[800px] md:h-[1000px] pointer-events-none opacity-[0.04]">
            <svg viewBox="0 0 400 600" fill="currentColor" className="w-full h-full text-black">
              {/* Simplified LATAM silhouette */}
              <path d="M180 20 L220 25 L240 40 L250 60 L260 50 L280 55 L300 70 L310 90 L320 85 L340 100 L350 120 L345 140 L350 160 L340 180 L320 190 L300 185 L280 200 L270 220 L280 240 L290 260 L285 280 L270 300 L250 310 L240 330 L250 350 L260 370 L255 390 L240 410 L220 420 L200 415 L180 430 L160 450 L150 480 L160 510 L150 540 L130 560 L110 570 L90 560 L80 540 L90 520 L85 500 L70 480 L60 450 L70 420 L80 400 L75 380 L60 360 L50 340 L55 320 L70 300 L90 290 L100 270 L95 250 L80 230 L70 210 L75 190 L90 170 L110 160 L120 140 L115 120 L100 100 L90 80 L100 60 L120 50 L140 40 L160 30 Z" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto relative">
            <div className="max-w-5xl">
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight leading-[0.85] mb-8 md:mb-12">
                Recruiting got automated.<br />
                <span className="text-[var(--accent-color)]">We didn&apos;t.</span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-500 max-w-xl mb-12 md:mb-16">
                Senior LATAM engineers. Vetted by humans.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start">
                <Link href="/companies" className="group px-8 py-4 bg-black text-white font-semibold text-lg hover:bg-[var(--accent-color)] hover:text-black transition-colors duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-3">
                  Hire Engineers <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link href="/talent" className="flex items-center justify-center px-8 py-4 text-neutral-500 hover:text-black font-semibold text-lg transition-colors duration-200">
                  I&apos;m an Engineer
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <div className="w-full border-y border-neutral-200 bg-white/80 backdrop-blur-sm py-8 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap items-center">
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="flex items-center shrink-0">
                {cities.map((city, i) => (
                  <React.Fragment key={`${setIndex}-${i}`}>
                    <span className="text-3xl md:text-4xl font-bold text-neutral-300 tracking-normal hover:text-[var(--accent-color)] transition-colors duration-200 cursor-default px-8">{city}</span>
                    <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full shrink-0"></span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Experience Stats Module */}
        <section className="py-24 md:py-32 bg-white border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="flex justify-center md:justify-center">
                    <CountUp end={80} label="Candidates" subLabel="Placed in US Startups" />
                </div>
                <div className="flex justify-center md:justify-center">
                    <CountUp end={25} label="Companies" subLabel="Trust our vetting" />
                </div>
             </div>
          </div>
        </section>

        {/* Methodology */}
        <section id="methodology" className="py-24 md:py-32 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">

            <div className="space-y-5">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center border border-neutral-200">
                <Phone className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">We Pick Up the Phone</h3>
              <p className="text-lg text-neutral-500 leading-relaxed">
                No keyword matching. No AI screening. We have real conversations with every engineer.
              </p>
            </div>

            <div className="space-y-5">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center border border-neutral-200">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">Engineers Vet Engineers</h3>
              <p className="text-lg text-neutral-500 leading-relaxed">
                Technical interviews by people who&apos;ve shipped code. Not recruiters reading scripts.
              </p>
            </div>

            <div className="space-y-5">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center border border-neutral-200">
                <MapPin className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">Based in LATAM</h3>
              <p className="text-lg text-neutral-500 leading-relaxed">
                Mexico City HQ. Plugged into engineering communities across Latin America.
              </p>
            </div>

          </div>
        </section>

        {/* Why LATAM - Timezone Visual */}
        <section className="py-24 md:py-32 px-4 md:px-6 bg-gradient-to-b from-neutral-50 to-white border-y border-neutral-200 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-black">Why <span className="text-[var(--accent-color)]">LATAM</span>?</h2>
              <p className="text-xl text-neutral-500">Same timezone. Senior talent. Real collaboration.</p>
            </div>

            {/* Timezone Strip */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 max-w-4xl mx-auto">
                {/* San Francisco */}
                <div className="text-center p-8 rounded-2xl transition-all duration-300 hover:bg-neutral-100 group">
                  <div className="mb-4">
                    <span className="text-6xl md:text-7xl font-bold text-neutral-800 transition-colors duration-300 group-hover:text-[var(--accent-color)]">9</span>
                    <span className="text-xl text-neutral-400 font-medium">AM</span>
                  </div>
                  <p className="text-neutral-800 text-lg font-medium">San Francisco</p>
                  <p className="text-neutral-400 text-sm mt-1">You start your day</p>
                </div>

                {/* Mexico City */}
                <div className="text-center p-8 rounded-2xl transition-all duration-300 hover:bg-neutral-100 group relative">
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-neutral-200"></div>
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-neutral-200"></div>
                  <div className="mb-4">
                    <span className="text-6xl md:text-7xl font-bold text-neutral-800 transition-colors duration-300 group-hover:text-[var(--accent-color)]">11</span>
                    <span className="text-xl text-neutral-400 font-medium">AM</span>
                  </div>
                  <p className="text-neutral-800 text-lg font-medium">Mexico City</p>
                  <p className="text-neutral-400 text-sm mt-1">Already in flow</p>
                </div>

                {/* São Paulo */}
                <div className="text-center p-8 rounded-2xl transition-all duration-300 hover:bg-neutral-100 group">
                  <div className="mb-4">
                    <span className="text-6xl md:text-7xl font-bold text-neutral-800 transition-colors duration-300 group-hover:text-[var(--accent-color)]">1</span>
                    <span className="text-xl text-neutral-400 font-medium">PM</span>
                  </div>
                  <p className="text-neutral-800 text-lg font-medium">São Paulo</p>
                  <p className="text-neutral-400 text-sm mt-1">Peak productivity</p>
                </div>
              </div>
            </div>

            {/* Supporting points */}
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 px-5 py-4 rounded-full bg-neutral-100/80 border border-neutral-200/50 transition-all duration-300 hover:border-[var(--accent-color)]/30 hover:bg-neutral-100">
                <div className="w-2 h-2 bg-[var(--accent-color)] rounded-full shrink-0"></div>
                <p className="text-neutral-700 font-medium">Real standups. Real collaboration.</p>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 rounded-full bg-neutral-100/80 border border-neutral-200/50 transition-all duration-300 hover:border-[var(--accent-color)]/30 hover:bg-neutral-100">
                <div className="w-2 h-2 bg-[var(--accent-color)] rounded-full shrink-0"></div>
                <p className="text-neutral-700 font-medium">Bay Area caliber. Better value.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 md:py-32 px-4 md:px-6 bg-neutral-50 border-y border-neutral-200">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-16 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight">How it <span className="text-[var(--accent-color)]">works</span></h2>
              <p className="text-lg md:text-xl text-neutral-600">From first call to first hire. Usually under two weeks.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Line */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-px border-t border-dashed border-neutral-300 -z-10"></div>

              {[
                { num: 1, title: "You Tell Us", text: "15-minute call. Who do you need? What matters most?" },
                { num: 2, title: "We Search", text: "We tap our network. Real conversations, not keyword matching." },
                { num: 3, title: "We Interview", text: "Technical deep-dive by engineers. Not recruiters reading scripts." },
                { num: 4, title: "You Meet Them", text: "3-5 candidates who actually fit. Ready to talk this week." }
              ].map((step) => (
                <div key={step.num} className="relative bg-white border border-neutral-200 p-8 hover:border-[var(--accent-color)] hover:shadow-lg transition-all duration-200 group rounded-xl h-full">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 flex items-center justify-center text-xl font-bold mb-8 group-hover:bg-[var(--accent-color)] group-hover:text-black transition-colors duration-200 rounded-full">
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-black">{step.title}</h3>
                  <p className="text-lg text-neutral-500 leading-relaxed font-medium">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24 md:py-32 px-4 md:px-6 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-[var(--accent-color)]/10 md:skew-x-12 md:translate-x-1/4 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 md:mb-8 text-black leading-tight">One number.</h2>
                <p className="text-lg md:text-2xl text-neutral-600 mb-8 md:mb-12 font-medium">No hourly rates. No retainers. No surprises.</p>

                <div className="space-y-10">
                    <div className="flex items-start gap-6">
                        <div className="mt-1 p-3 bg-white border border-neutral-200 rounded-xl shadow-sm">
                            <Clock className="w-6 h-6 text-[var(--accent-color)]" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-black mb-2">90-Day Guarantee</h4>
                            <p className="text-lg text-neutral-500 font-medium">Not working out? We find someone else. No charge.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6">
                        <div className="mt-1 p-3 bg-white border border-neutral-200 rounded-xl shadow-sm">
                            <Shield className="w-6 h-6 text-[var(--accent-color)]" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-black mb-2">No Ghosting</h4>
                            <p className="text-lg text-neutral-500 font-medium">Every candidate gets real feedback. Win or lose.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative mt-8 md:mt-0">
                <div className="bg-white border border-neutral-200 p-8 md:p-16 rounded-3xl relative group hover:border-[var(--accent-color)] hover:shadow-xl transition-all duration-200 shadow-lg">
                  <div className="absolute -top-5 -right-5 bg-[var(--accent-color)] text-black font-bold px-6 py-2 text-lg transform rotate-3 shadow-md border border-black/5">
                      PAY ON HIRE
                  </div>
                  <div className="text-center">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-[8rem] md:text-[10rem] leading-none font-bold text-black tracking-tighter">15</span>
                        <span className="text-6xl font-bold text-[var(--accent-color)]">%</span>
                      </div>
                      <p className="text-xl text-neutral-500 font-medium mt-4">of first year salary</p>

                      <div className="my-12 w-full h-px bg-neutral-100"></div>

                      <div className="text-left">
                          <div>
                              <span className="block text-sm text-neutral-400 font-medium mb-1">Terms</span>
                              <span className="block text-2xl font-bold text-black">Net 30</span>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* Talent Showcase */}
        <section className="py-24 md:py-32 border-t border-neutral-200 bg-neutral-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
                Real <span className="text-[var(--accent-color)]">people</span>
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 font-medium">
                No algorithm decided they were good. A person did.
              </p>
            </div>
            <div className="hidden md:flex gap-3">
              <button
                onClick={() => scroll('left')}
                className="p-4 rounded-full border border-neutral-300 hover:bg-black hover:text-white transition-colors duration-200 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-4 rounded-full border border-neutral-300 hover:bg-black hover:text-white transition-colors duration-200 active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto px-4 md:px-6 pb-12 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {talentProfiles.map((profile) => (
              <div
                key={profile.id}
                className="min-w-[300px] md:min-w-[400px] snap-center"
              >
                <div className="h-full p-8 md:p-10 bg-white rounded-2xl border border-neutral-200 hover:border-[var(--accent-color)] hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1 rounded-full border border-neutral-100">
                        <span className="w-2 h-2 bg-[var(--accent-color)] rounded-full"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-black">{profile.city}</span>
                      </div>
                      {profile.icon}
                    </div>

                    <h4 className="text-4xl md:text-5xl font-bold text-black mb-3">{profile.name}</h4>
                    <p className="text-2xl text-neutral-600 font-medium mb-2">{profile.role}</p>
                    <p className="text-neutral-400 text-base font-mono font-bold">{profile.exp}</p>
                  </div>

                  <div className="space-y-6 mt-10">
                    <div className="h-px w-full bg-neutral-100"></div>
                    <div className="flex flex-wrap gap-2">
                        {profile.tech.map((tech) => (
                          <span key={tech} className="px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-lg text-sm font-bold text-neutral-700">{tech}</span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="min-w-[1px]"></div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-24 md:py-32 px-4 md:px-6 bg-neutral-100">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block px-4 py-2 bg-neutral-200 rounded-full text-sm font-medium text-neutral-700 mb-6">
                Why choose us
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Hiring is a <span className="text-[var(--accent-color)]">human</span> job.
              </h2>
              <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto">
                AI can parse a resume. It can&apos;t tell you who will thrive on your team.
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Other Agencies Card */}
              <div className="relative rounded-3xl overflow-hidden min-h-[380px] md:min-h-[420px]">
                {/* Blurred Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(/vibe-2.webp)',
                    filter: 'blur(5px)',
                    transform: 'scale(1.05)',
                  }}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-auto">
                    Other agencies
                  </h3>

                  <div className="space-y-5 mt-auto">
                    <div className="flex items-start gap-4">
                      <X className="w-5 h-5 text-neutral-400 mt-1 shrink-0" />
                      <p className="text-neutral-300 text-base md:text-lg">Keyword matching. Spray and pray.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <X className="w-5 h-5 text-neutral-400 mt-1 shrink-0" />
                      <p className="text-neutral-300 text-base md:text-lg">Non-technical recruiters reading scripts.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <X className="w-5 h-5 text-neutral-400 mt-1 shrink-0" />
                      <p className="text-neutral-300 text-base md:text-lg">Hard to fill? You get deprioritized.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Well Card */}
              <div className="relative rounded-3xl overflow-hidden min-h-[380px] md:min-h-[420px]">
                {/* Blurred Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(/vibe-1.webp)',
                    filter: 'blur(5px)',
                    transform: 'scale(1.05)',
                  }}
                />
                {/* Accent Color Overlay */}
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{ backgroundColor: accentColor, opacity: 0.7 }}
                />
                <div className="absolute inset-0 bg-black/20" />

                {/* Content */}
                <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-auto">
                    All Well
                  </h3>

                  <div className="space-y-5 mt-auto">
                    <div className="flex items-start gap-4">
                      <Check className="w-5 h-5 text-white mt-1 shrink-0" />
                      <p className="text-white text-base md:text-lg">Real conversations with every engineer.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <Check className="w-5 h-5 text-white mt-1 shrink-0" />
                      <p className="text-white text-base md:text-lg">Engineers interview engineers. Period.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <Check className="w-5 h-5 text-white mt-1 shrink-0" />
                      <p className="text-white text-base md:text-lg">Every role gets our full attention.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <Link
                href="/companies"
                className="group inline-flex items-center gap-4 bg-black text-white px-8 py-4 text-lg font-bold hover:bg-[var(--accent-color)] hover:text-black transition-colors duration-200"
              >
                <span>Talk to Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
