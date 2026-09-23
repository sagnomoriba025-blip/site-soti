// app/realisations/page.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import RealisationsClient from '@/components/RealisationsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Réalisations et Études de Cas B2B | SoTI Guinée',
  description: 'Découvrez nos projets réussis sur le terrain à Conakry et en Guinée. Études de cas détaillées en Réseaux, Fibre Optique, Télécoms et Énergie Solaire (Avant / Après).',
  keywords: 'projets SoTI, etudes de cas, realisations reseau Guinee, installation solaire Conakry, fibre optique avant apres',
};

export default function Realisations() {
  return (
    <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900/30">
      
      {/* Page Header */}
      <section className="relative py-20 bg-[#0A2540] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Études de cas</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-3">
            Nos Réalisations sur le terrain
          </h1>
          <p className="text-xs text-slate-350 mt-4 leading-relaxed">
            Chez SoTI, nous parlons avec des faits. Découvrez l&apos;état initial (Avant) et les solutions déployées (Après) pour nos clients B2B à Conakry et en Guinée.
          </p>
        </div>
      </section>

      {/* Interactive Client Component list */}
      <RealisationsClient />

      {/* Bottom Lead Gen CTA */}
      <section className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-[#0A2540] to-slate-950 text-white rounded-2xl p-8 sm:p-12 border border-white/5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <h3 className="text-2xl font-extrabold">Votre projet mérite la même rigueur technique</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Nous appliquons les mêmes méthodologies d&apos;ingénierie et standards de qualité pour tous nos clients B2B, petits ou grands.
            </p>
          </div>
          <Link 
            href="/devis" 
            className="inline-flex items-center px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow-lg transition-colors text-xs group"
          >
            Estimer le coût de mes travaux
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  );
}
