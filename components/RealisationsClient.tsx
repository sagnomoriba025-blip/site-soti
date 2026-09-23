// components/RealisationsClient.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Network, PhoneCall, Sun, CheckCircle2 } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  location: string;
  icon: React.ComponentType<{ className?: string }>;
  before: string;
  after: string;
  beforeImage: string;
  afterImage: string;
  results: string[];
}

export default function RealisationsClient() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = [
    { key: 'All', label: 'Toutes les réalisations' },
    { key: 'Réseaux', label: 'Réseaux & Baies' },
    { key: 'Fibre', label: 'Fibre Optique' },
    { key: 'Télécom', label: 'Télécommunications' },
    { key: 'Solaire', label: 'Énergie Solaire' },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Restructuration du réseau d'une banque commerciale",
      category: 'Réseaux',
      client: 'Institution Bancaire',
      location: 'Kaloum, Conakry',
      icon: Network,
      beforeImage: '/images/realisations/reseau-banque-avant.jpg',
      afterImage: '/images/realisations/reseau-banque-apres.jpg',
      before: "Fouillis de câbles non répertoriés, déconnexions intempestives de postes clients, armoire réseau saturée de poussière sans ventilation.",
      after: "Câblage structuré RJ45 Cat6A, réaménagement complet de la baie de brassage, installation de switches manageables et mise en place d'un schéma d'adressage propre.",
      results: ['Zéro interruption de service constatée depuis 6 mois', 'Débits réseaux multipliés par 10 (10 Gbps backbone)', 'Temps de diagnostic d\'incident réduit à moins de 5 min']
    },
    {
      id: 2,
      title: 'Raccordement inter-sites en Fibre Optique',
      category: 'Fibre',
      client: 'Groupe Industriel de Guinée',
      location: 'Zone Industrielle de Kagbelen',
      icon: Network,
      beforeImage: '/images/realisations/fibre-optique-avant.jpg',
      afterImage: '/images/realisations/fibre-optique-apres.jpg',
      before: "Liaison Wi-Fi instable entre les entrepôts et le siège social provoquant des coupures dans la saisie des stocks en temps réel.",
      after: "Tirage de 2,4 km de fibre optique monomode aérienne et souterraine, soudures par fusion de précision et installation de convertisseurs de médias optiques.",
      results: ['Connexion résiliente 100% insensible aux intempéries', 'Latence réseau passée de 45ms à moins de 2ms', 'Saisie de stocks instantanée sans perte de paquets']
    },
    {
      id: 3,
      title: 'Migration vers un système IPBX logiciel 3CX',
      category: 'Télécom',
      client: 'Administration Publique',
      location: 'Conakry Centre',
      icon: PhoneCall,
      beforeImage: '/images/realisations/telecom-ipbx-avant.jpg',
      afterImage: '/images/realisations/telecom-ipbx-apres.jpg',
      before: "Vieux commutateur analogique PABX avec lignes cuivres dégradées, combinés fixes limités et factures de télécommunication internes exorbitantes.",
      after: "Déploiement d'un IPBX logiciel 3CX sécurisé, installation de 85 postes IP Yealink, intégration de softphones sur les smartphones des agents.",
      results: ['Économie de 65% sur les factures mensuelles', 'Travail collaboratif renforcé (visio, chat interne)', 'Serveur vocal interactif pour guider les usagers']
    },
    {
      id: 4,
      title: "Autonomie énergétique solaire d'une clinique médicale",
      category: 'Solaire',
      client: 'Clinique de Conakry',
      location: 'Kipe, Conakry',
      icon: Sun,
      beforeImage: '/images/realisations/solaire-clinique-avant.jpg',
      afterImage: '/images/realisations/solaire-clinique-apres.jpg',
      before: "Coupures d'électricité quotidiennes forçant l'usage fréquent de groupes électrogènes bruyants, coûteux et menaçant les blocs opératoires.",
      after: "Centrale solaire hybride de 15 kWc (24 panneaux monocristallins), 2 onduleurs Victron Energy et parc de stockage Lithium LiFePO4 de 30 kWh.",
      results: ["Autonomie électrique garantie 24h/24 pour le bloc opératoire", 'Réduction de 85% de la consommation de gasoil', 'Amortissement calculé sur 3,5 ans']
    },
    {
      id: 5,
      title: 'Sécurisation par vidéosurveillance IP intelligente',
      category: 'Réseaux',
      client: 'Complexe Hôtelier Premium',
      location: 'Boulbinet, Conakry',
      icon: Network,
      beforeImage: '/images/realisations/videosurveillance-avant.jpg',
      afterImage: '/images/realisations/videosurveillance-apres.jpg',
      before: "Système analogique basse définition obsolète, nombreux angles morts et impossibilité de visionner à distance en cas d'incident.",
      after: "Réseau de 48 caméras IP Uniview 4K avec analyse vidéo intelligente (détection d'intrusion nocturne), NVR de 64 canaux avec disques redondants.",
      results: ['Surveillance totale sans angles morts', "Accès sécurisé pour la direction depuis l'étranger", 'Alertes intelligentes instantanées sur smartphone des vigiles']
    },
    {
      id: 6,
      title: 'Alimentation solaire de secours pour site télécom isolé',
      category: 'Solaire',
      client: 'Opérateur Télécom Régional',
      location: 'Coyah / Guinée',
      icon: Sun,
      beforeImage: '/images/realisations/solaire-telecom-avant.jpg',
      afterImage: '/images/realisations/solaire-telecom-apres.jpg',
      before: "Pylône relais alimenté uniquement par un groupe électrogène tombant régulièrement en panne, coupant le réseau mobile de toute une commune.",
      after: "Système solaire site isolé (Off-Grid) de 8 kWc avec châssis antivol en acier renforcé et batteries solaires OPzV gel à décharge lente.",
      results: ['Taux de disponibilité du relais mobile passé à 99,9%', 'Visites de maintenance carburant divisées par 12', 'Protection antivol éprouvée sur site']
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      {/* Filter Buttons */}
      <section className="py-8 bg-white dark:bg-slate-950 border-b border-slate-200/50 dark:border-slate-800">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-2 text-xs font-bold tracking-wide rounded-full border transition-all duration-200 ${
                activeFilter === cat.key
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Realizations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl space-y-12">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => {
              return (
                <div 
                  key={project.id} 
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col"
                >
                  {/* Card Header */}
                  <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/30">
                        {project.category}
                      </span>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-2">
                        {project.title}
                      </h2>
                    </div>
                    <div className="text-right text-xs text-slate-400 shrink-0 font-medium font-mono">
                      <p>Client : {project.client}</p>
                      <p>Lieu : {project.location}</p>
                    </div>
                  </div>

                  {/* Before / After Images */}
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Before Image */}
                    <div className="relative">
                      <div className="absolute top-3 left-3 z-10 flex items-center space-x-1.5 bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                        <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Avant</span>
                      </div>
                      <div className="relative aspect-[4/3] bg-red-50 dark:bg-red-950/20">
                        <ProjectImage 
                          src={project.beforeImage} 
                          alt={`${project.title} - État initial (Avant)`}
                          fallbackColor="rgb(239 68 68)"
                          fallbackLabel="AVANT"
                        />
                      </div>
                    </div>

                    {/* After Image */}
                    <div className="relative">
                      <div className="absolute top-3 left-3 z-10 flex items-center space-x-1.5 bg-emerald-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                        <span className="h-2 w-2 rounded-full bg-white" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Après</span>
                      </div>
                      <div className="relative aspect-[4/3] bg-emerald-50 dark:bg-emerald-950/20">
                        <ProjectImage 
                          src={project.afterImage} 
                          alt={`${project.title} - Solution déployée (Après)`}
                          fallbackColor="rgb(16 185 129)"
                          fallbackLabel="APRÈS"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Before / After Text Description */}
                  <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-200/50 dark:border-slate-800">
                    
                    {/* Before Card */}
                    <div className="p-8 bg-red-500/[0.02] border-r-0 md:border-r border-b md:border-b-0 border-slate-200/50 dark:border-slate-800 space-y-3">
                      <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <h3 className="text-xs font-black uppercase tracking-wider">État Initial (Avant)</h3>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                        &ldquo;{project.before}&rdquo;
                      </p>
                    </div>

                    {/* After Card */}
                    <div className="p-8 bg-emerald-500/[0.02] space-y-3">
                      <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <h3 className="text-xs font-black uppercase tracking-wider">Solution Déployée (Après)</h3>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {project.after}
                      </p>
                    </div>

                  </div>

                  {/* Quantitative Benefits */}
                  <div className="p-6 bg-slate-50/50 dark:bg-slate-950/20 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Bénéfices constatés :</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {project.results.map((res, index) => (
                        <div key={index} className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800">
              <p className="text-sm text-slate-500">Aucun projet trouvé dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/** Composant interne : affichage robuste des images avec fallback */
function ProjectImage({ src, alt, fallbackColor, fallbackLabel }: { 
  src: string; 
  alt: string; 
  fallbackColor: string; 
  fallbackLabel: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
        style={{ backgroundColor: `${fallbackColor}15` }}
      >
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-inner"
          style={{ backgroundColor: `${fallbackColor}25` }}
        >
          <svg className="w-7 h-7" style={{ color: fallbackColor }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
        </div>
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: fallbackColor }}>
          Photo {fallbackLabel}
        </span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">SoTI Terrain</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
