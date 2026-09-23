// components/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const services = [
    'Réseaux Informatiques',
    'Télécommunications',
    'Énergie Solaire',
    'Électricité Bâtiment',
    'Vidéosurveillance',
    'BTP & Génie Civil',
    'Maintenance Informatique',
    'Vente de Matériels & Équipements',
  ];

  return (
    <footer className="bg-[#0A2540] text-slate-300 border-t border-slate-800 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-blue-500 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/logo-soti.svg" 
                alt="Logo SoTI - Société de Technologies & Ingénierie" 
                className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Votre Partenaire Technologique de Confiance. Ingénierie • Innovation • Performance.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['INNOVER', 'CONNECTER', 'SECURISER', 'PERFORMER'].map((val, idx) => (
                <span key={idx} className="text-[9px] tracking-widest font-bold px-2 py-0.5 bg-white/5 border border-white/5 rounded text-slate-400">
                  {val}
                </span>
              ))}
            </div>
          </div>

          {/* 7 Services */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-4 pb-2 border-b border-white/10">
              Nos Services
            </h4>
            <ul className="space-y-2 text-sm">
              {services.map((service, idx) => (
                <li key={idx}>
                  <Link href="/services" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-4 pb-2 border-b border-white/10">
              Liens Rapides
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Accueil', path: '/' },
                { name: 'À Propos', path: '/a-propos' },
                { name: 'Services', path: '/services' },
                { name: 'Réalisations', path: '/realisations' },
                { name: 'Demander un Devis', path: '/devis' },
                { name: 'Contact & Support', path: '/contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.path} className="hover:text-blue-400 transition-colors flex items-center justify-between group">
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-4 pb-2 border-b border-white/10">
              Contacts Officiels
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-500 shrink-0 mt-0.5" />
                <span>Conakry / Guinée</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-blue-500 shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-1">
                  <a href="tel:+224624900424" className="hover:text-white transition-colors">+224 624 900 424</a>
                  <a href="tel:+224669715000" className="hover:text-white transition-colors">+224 669 715 000</a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-blue-500 shrink-0 mt-0.5" />
                <a href="mailto:sotiguineepro@gmail.com" className="hover:text-white transition-colors break-all">
                  sotiguineepro@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {currentYear} SoTI - Société de Technologies & Ingénierie. Tous droits réservés.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className="flex items-center gap-1 text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Ingénierie & Innovation
            </span>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-blue-400 transition-colors">
              Espace Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
