// app/devis/page.tsx
import React from 'react';
import DevisForm from '@/components/DevisForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demander un Devis Technique d\'Ingénierie B2B | SoTI Guinée',
  description: 'Estimez le coût de vos chantiers ou installations en Guinée. Formulaire multi-étapes d\'étude technique sous 48h pour vos projets réseaux, solaires, vidéosurveillance et BTP.',
  keywords: 'devis SoTI, estimation cout reseau Guinee, devis solaire Conakry, chiffrage electricite, travaux BTP Guinee',
};

export default function DemandeDevis() {
  return (
    <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900/30 min-h-screen flex items-center">
      <div className="container mx-auto px-6 max-w-2xl">
        <DevisForm />
      </div>
    </div>
  );
}
