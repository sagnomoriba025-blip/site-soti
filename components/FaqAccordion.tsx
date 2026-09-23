// components/FaqAccordion.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "Quels types d'équipements solaires utilisez-vous ?",
      answer: "Nous utilisons exclusivement du matériel de classe industrielle certifié. Pour les onduleurs et convertisseurs, nous travaillons principalement avec Victron Energy et Fronius. Nos panneaux monocristallins proviennent de leaders mondiaux (Tier 1 comme Longi, JinkoSolar) et nous installons des parcs de stockage Lithium LiFePO4 de dernière génération pour maximiser la durée de vie des installations.",
    },
    {
      question: "Vos installations de câblage réseau sont-elles certifiées ?",
      answer: "Oui, absolument. Toutes nos réalisations en câblage structuré RJ45 (Cat6/Cat6A) et en raccordement de fibre optique font l'objet d'une recette technique obligatoire. Nous utilisons des certificateurs professionnels (Fluke Networks) et remettons à la fin du chantier un rapport de test complet détaillant la conformité de chaque lien.",
    },
    {
      question: "Quel est votre délai moyen d'étude et de chiffrage pour un devis ?",
      answer: "Après soumission de votre formulaire de devis en ligne ou contact direct, un ingénieur d'affaires qualifié vous recontacte sous 24 heures pour affiner votre besoin. Si une visite technique sur site est nécessaire à Conakry, elle est programmée sous 48 heures, et l'offre commerciale finale vous est transmise sous 3 à 5 jours ouvrés.",
    },
    {
      question: "Proposez-vous un support technique après installation ?",
      answer: "Oui, nous proposons plusieurs niveaux de Contrats de Services et de Maintenance (SLA) adaptés aux exigences B2B. Nos contrats d'astreinte incluent un support téléphonique dédié ainsi qu'une garantie d'intervention sur site sous 2h à 4h à Conakry, 24h/24 et 7j/7, pour assurer la continuité de vos opérations critiques.",
    },
    {
      question: "Intervenez-vous à l'intérieur du pays (hors Conakry) ?",
      answer: "Tout à fait. Bien que basés à Conakry, nous disposons d'une flotte mobile capable de se projeter sur l'ensemble du territoire guinéen (Boké, Kamsar, Kindia, Labé, Kankan, Siguiri, Nzérékoré) pour réaliser des audits, des installations d'énergie solaire en site isolé ou le suivi de chantiers de génie civil.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-all duration-250"
          >
            <button
              onClick={() => handleToggle(idx)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
              aria-expanded={isOpen}
            >
              <div className="flex items-start space-x-3 pr-4">
                <HelpCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-500 transition-colors">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-slate-400 transition-transform duration-250 shrink-0",
                  isOpen && "transform rotate-180 text-blue-500"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="p-5 pt-0 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal border-t border-slate-100 dark:border-slate-850/50">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
