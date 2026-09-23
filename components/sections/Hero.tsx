// components/sections/Hero.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Cpu, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0A2540] overflow-hidden text-white pt-24 pb-16">
      {/* Background gradients and abstract shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur-md self-start">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-blue-200">Guinée, Conakry</span>
              <span className="text-white/20">|</span>
              <span className="text-slate-300">Ingénierie • Innovation • Performance</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              L&apos;expertise d&apos;aujourd&apos;hui pour des{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">
                solutions durables et performantes
              </span>{' '}
              de demain.
            </h1>

            <p className="text-lg text-slate-300 max-w-xl">
              <strong className="text-white">SoTI</strong> est votre partenaire technologique de confiance. Nous concevons et déployons des infrastructures de pointe en réseaux, télécoms, énergie solaire et BTP pour propulser votre entreprise.
            </p>

            {/* Values badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {['INNOVER', 'CONNECTER', 'SECURISER', 'PERFORMER'].map((val, idx) => (
                <span key={idx} className="text-xs tracking-widest font-semibold px-3 py-1 bg-white/5 border border-white/5 rounded text-slate-300">
                  {val}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/devis" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
              >
                Demander un devis
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/services" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Découvrir nos services
              </Link>
            </div>
          </div>

          {/* Right side : Eye-catching Hero Image & Floating B2B Cards */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Main Image Frame with glow effect */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-blue-500/10 bg-slate-900 group">
                <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/hero-infrastructure.jpg" 
                    alt="SoTI Guinée - Infrastructures Réseaux et Datacenter" 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-black/20" />
                </div>

                {/* Bottom Bar Info */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-[#0A2540]/85 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">Infrastructures Déployées</p>
                      <p className="text-[11px] text-slate-300">Conakry & Régions • Haute Disponibilité</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-800/50">
                    99.9% Uptime
                  </span>
                </div>
              </div>

              {/* Floating Badge 1: Top Right - Innovation & Fibre */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-slate-900/90 backdrop-blur-md border border-white/15 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 animate-float">
                <div className="h-10 w-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Cpu className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">Expertise B2B</p>
                  <p className="text-xs font-bold text-white">Fibre • Solaire • Réseaux</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left - Security & Certification */}
              <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-slate-900/90 backdrop-blur-md border border-white/15 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">Normes TIA/ISO</p>
                  <p className="text-xs font-bold text-white">Garantie & Support 24/7</p>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
