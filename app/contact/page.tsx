// app/contact/page.tsx
import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import FaqAccordion from '@/components/FaqAccordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contactez SoTI | Société de Technologies & Ingénierie Guinée',
  description: 'Une question technique ? Un projet de câblage, de centrale solaire, de vidéosurveillance ou de BTP à Conakry ? Contactez nos ingénieurs ou posez votre question en ligne.',
  keywords: 'contact SoTI, téléphone SoTI Guinée, email SoTI, adresse SoTI Conakry, FAQ SoTI, ingénieurs Conakry',
};

export default function Contact() {
  
  const contacts = [
    {
      title: 'Téléphones Directs',
      desc: 'Disponibles du lundi au samedi, de 8h00 à 18h00.',
      icon: Phone,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      actions: [
        { label: '+224 614 900 424', href: 'tel:+224614900424' },
        { label: '+224 669 715 000', href: 'tel:+224669715000' }
      ]
    },
    {
      title: 'E-mail Professionnel',
      desc: 'Pour toute demande de collaboration ou administratif.',
      icon: Mail,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      actions: [
        { label: 'sotiguineepro@gmail.com', href: 'mailto:sotiguineepro@gmail.com' }
      ]
    },
    {
      title: 'Adresse Bureaux',
      desc: 'Siège social et locaux techniques.',
      icon: MapPin,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      actions: [
        { label: 'Conakry / Guinée', href: 'https://maps.google.com/?q=Conakry,Guinee' }
      ]
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900/30">
      
      {/* Page Header */}
      <section className="relative py-20 bg-[#0A2540] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Nous Contacter</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-3">
            Parlons de votre projet
          </h1>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed">
            Vous avez une question technique ? Un projet de câblage, de centrale solaire ou de BTP ? Notre équipe commerciale et nos ingénieurs d&apos;affaires vous répondent rapidement.
          </p>
        </div>
      </section>

      {/* Main Content Form & Details */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Left side : Contacts Cards & Hours */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">Nos Coordonnées</h2>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Informations de Contact
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  N&apos;hésitez pas à nous appeler directement ou à venir nous voir pour discuter de vos cahiers des charges.
                </p>
              </div>

              {/* Grid contacts list */}
              <div className="space-y-4">
                {contacts.map((c, idx) => {
                  const Icon = c.icon;
                  return (
                    <div 
                      key={idx} 
                      className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex items-start gap-4"
                    >
                      <div className={`p-2.5 rounded-lg border shrink-0 ${c.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{c.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-2">{c.desc}</p>
                        <div className="flex flex-col gap-1">
                          {c.actions.map((act, index) => (
                            <a 
                              key={index} 
                              href={act.href}
                              target={act.href.startsWith('http') ? '_blank' : undefined}
                              rel={act.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline break-all"
                            >
                              {act.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Opening Hours Info */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Horaires d&apos;Ouverture</h4>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-slate-850">
                    <span className="text-slate-500 font-medium">Lundi - Vendredi</span>
                    <span className="text-slate-950 dark:text-white font-bold">8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-slate-850">
                    <span className="text-slate-500 font-medium">Samedi</span>
                    <span className="text-slate-950 dark:text-white font-bold">9h00 - 15h00</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-red-500 font-semibold">
                    <span>Dimanche &amp; Jours Fériés</span>
                    <span>Fermé</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right side : Contact Form component */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div className="pt-12 border-t border-slate-200/60 dark:border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Des Réponses Rapides</span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Questions Fréquentes (FAQ)
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                  Retrouvez ici les questions les plus fréquentes sur nos processus techniques, nos contrats de maintenance et nos garanties matériels en Guinée.
                </p>
                
                <div className="p-4 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-xl space-y-2">
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400 space-x-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Astreinte Technique</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Pour nos clients sous contrat récurrent, notre hotline d&apos;astreinte d&apos;urgence réseau et solaire reste accessible 24h/24 et 7j/7.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <FaqAccordion />
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-16 rounded-xl border border-slate-200/60 dark:border-slate-800 overflow-hidden relative min-h-[300px] bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center p-6 text-center">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:2rem_2rem]" />
            <div className="relative z-10 max-w-sm space-y-4">
              <MapPin className="h-10 w-10 text-blue-600 mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Bureaux à Conakry</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Nos locaux techniques et de direction sont situés à Conakry, Guinée. Les visites physiques se font sur rendez-vous uniquement.
              </p>
              <div className="pt-2">
                <a 
                  href="https://maps.google.com/?q=Conakry,Guinee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs transition-colors"
                >
                  Ouvrir dans Google Maps
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
