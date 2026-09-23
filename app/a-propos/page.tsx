// app/a-propos/page.tsx
import React from 'react';
import { Target, Rocket, Award } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À Propos de SoTI | Société de Technologies & Ingénierie Guinée',
  description: 'Découvrez l\'histoire de SoTI, notre mission d\'ingénierie globale, nos valeurs et l\'équipe de direction technique à Conakry, Guinée.',
  keywords: 'a propos SoTI, equipe SoTI, direction SoTI, ingénieurs Guinée, BTP solaire Conakry',
};


export default function APropos() {
  
  const coreTeam = [
    {
      name: 'Diallo Ousmane',
      role: 'Directeur Général & Co-fondateur',
      desc: "Ingénieur Télécom chevronné, fort de 15 ans d'expérience dans le déploiement d'infrastructures B2B en Afrique de l'Ouest.",
      initials: 'DO',
    },
    {
      name: 'Barry Mamadou',
      role: 'Directeur Technique - Réseaux & Fibre Optique',
      desc: "Expert certifié Cisco CCNA/CCNP, spécialiste en topologies de réseaux WAN et raccordement de fibre optique longue distance.",
      initials: 'BM',
    },
    {
      name: 'Camara Facinet',
      role: 'Responsable Énergie Solaire & Génie Civil',
      desc: "Ingénieur diplômé en Énergies Renouvelables et Génie Civil, en charge de la conception thermique et de la conformité chantiers.",
      initials: 'CF',
    },
  ];

  const milestones = [
    {
      year: 'Création',
      title: 'Naissance de SoTI',
      desc: "Fondée par un collectif d'ingénieurs guinéens avec pour but de fournir une ingénierie de réseaux et télécoms aux normes internationales à Conakry.",
    },
    {
      year: 'Expansion',
      title: "Intégration de l'Énergie Solaire & BTP",
      desc: "Face aux défis énergétiques locaux, SoTI intègre un département Énergies Renouvelables et Génie Civil pour proposer des infrastructures B2B totalement autonomes.",
    },
    {
      year: "Aujourd'hui",
      title: 'Partenaire Technologique Majeur',
      desc: "SoTI accompagne désormais de nombreuses banques, industries et administrations publiques à travers toute la Guinée avec plus de 30 collaborateurs actifs.",
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900/30">
      
      {/* Page Header */}
      <section className="relative py-20 bg-[#0A2540] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Qui sommes-nous ?</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-3">
            Bâtir les infrastructures technologiques de la Guinée
          </h1>
          <p className="text-lg text-slate-300 mt-4 leading-relaxed">
            Découvrez l&apos;histoire de la Société de Technologies &amp; Ingénierie, notre mission, nos valeurs et les visages de notre équipe technique.
          </p>
        </div>
      </section>

      {/* Mission & Vision cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 self-start inline-block">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Notre Mission</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Concevoir, installer et maintenir des infrastructures informatiques, télécoms et solaires robustes pour permettre aux entreprises guinéennes d&apos;opérer avec une efficacité et une disponibilité maximale.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 self-start inline-block">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Notre Vision</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Devenir la référence incontournable de l&apos;ingénierie globale en Guinée et dans la sous-région, en mariant innovation technologique, respect de l&apos;environnement (solaire) et rigueur du génie civil.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 self-start inline-block">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Notre Rigueur</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Chaque projet est traité comme une oeuvre d&apos;ingénierie unique. Nous appliquons des audits initiaux stricts, des cahiers des charges rigides et des plans d&apos;assurance qualité (PAQ) exigeants.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* History / Milestones */}
      <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-200/50 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Notre Parcours</h2>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">Histoire et Croissance</h3>
            <div className="h-1 w-20 bg-blue-600 mx-auto mt-4" />
          </div>

          <div className="max-w-3xl mx-auto relative border-l-2 border-slate-200 dark:border-slate-800 pl-8 space-y-12">
            {milestones.map((ms, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[41px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg text-xs font-bold">
                  ✓
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                  {ms.year}
                </span>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-3 mb-1">
                  {ms.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ms.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Le Capital Humain</h2>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">Notre Équipe de Direction</h3>
            <div className="h-1 w-20 bg-blue-600 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreTeam.map((member, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all duration-200 hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xl font-bold shadow-md">
                    {member.initials}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{member.name}</h4>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{member.role}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Call to action */}
      <section className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-[#0A2540] to-slate-950 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-white/5 shadow-2xl">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[80px]" />
          </div>
          <div className="relative z-10 max-w-2xl space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold">{"Besoin de collaborer avec une équipe d'ingénieurs expérimentés ?"}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {"Nous étudions vos demandes avec professionnalisme et rigueur sous 48h. Remplissez notre formulaire de devis détaillé ou contactez nos équipes à Conakry."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/devis" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow-lg transition-colors text-sm">
                Demander un devis gratuit
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold rounded transition-colors text-sm">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
