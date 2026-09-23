// app/services/page.tsx
import React from 'react';
import { 
  Network, 
  PhoneCall, 
  Sun, 
  Zap, 
  Eye, 
  Building2, 
  Wrench, 
  ShoppingBag,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Services d\'Ingénierie B2B | SoTI Guinée',
  description: 'Découvrez nos domaines d\'expertise en Guinée : Réseaux Informatiques, Fibre Optique, Télécoms, Énergie Solaire, Électricité, Vidéosurveillance, BTP et Vente de Matériels.',
  keywords: 'services SoTI, cablage reseau, fibre optique Conakry, onduleur solaire Guinee, electricite batiment, videosurveillance IP, BTP Guinee',
};


export default function Services() {
  
  const servicesList = [
    {
      id: 1,
      title: 'Réseaux Informatiques',
      icon: Network,
      colorClass: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      description: "Conception et réalisation d'infrastructures de câblage structuré cuivre et optique pour garantir la vélocité et la fiabilité de vos flux de données.",
      details: [
        'Câblage structuré RJ45 Catégorie 6 et 6A (UTP/FTP/SFTP).',
        'Tirage, raccordement et fusion de fibre optique monomode et multimode.',
        'Installation, aménagement et étiquetage de baies et coffrets de brassage.',
        "Configuration d'équipements de routage, commutation (switches) et bornes Wi-Fi professionnelles."
      ],
      benefits: [
        'Débit optimal et réduction des latences réseau.',
        'Évolutivité facilitée du parc informatique.',
        'Facilité de diagnostic en cas de panne (brassage propre).'
      ]
    },
    {
      id: 2,
      title: 'Télécommunications',
      icon: PhoneCall,
      colorClass: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      description: "Déploiement de solutions de communication vocale d'entreprise performantes pour connecter vos collaborateurs et vos clients sans interruption.",
      details: [
        'Installation d\'IPBX (PABX IP) logiciels (3CX, Asterisk) et physiques.',
        'Configuration de serveurs de téléphonie analogique et hybride.',
        "Solutions d'interphonie audio/vidéo pour le contrôle d'accès des bâtiments.",
        'Couplage téléphonie-informatique (CTI) et messagerie unifiée.'
      ],
      benefits: [
        'Réduction des coûts de communication interne.',
        'Gestion intelligente des appels (serveur vocal interactif, transferts).',
        "Sécurisation des accès physiques via l'interphonie intégrée."
      ]
    },
    {
      id: 3,
      title: 'Énergie Solaire',
      icon: Sun,
      colorClass: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      description: "Conception, fourniture et maintenance de centrales solaires photovoltaïques autonomes ou hybrides pour assurer votre transition énergétique.",
      details: [
        'Études dimensionnelles complètes, fourniture, installation et maintenance.',
        'Fourniture et pose de panneaux solaires monocristallins à haut rendement.',
        "Installation d'onduleurs intelligents (hybrides/réseau) et régulateurs MPPT.",
        'Mise en place de parcs de stockage batterie (Plomb gel, Lithium LiFePO4).',
        'Maintenance préventive (nettoyage, resserrage) et corrective.'
      ],
      benefits: [
        'Autonomie totale face aux coupures du réseau électrique public.',
        'Réduction drastique des dépenses de carburant de groupe électrogène.',
        "Énergie propre, silencieuse et respectueuse de l'environnement."
      ]
    },
    {
      id: 4,
      title: 'Électricité Bâtiment',
      icon: Zap,
      colorClass: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
      description: "Travaux d'installations électriques intérieures et extérieures conformes aux normes NFC 15-100 pour la sécurité des biens et des personnes.",
      details: [
        "Études d'implantation de réseaux de puissance et d'éclairage.",
        'Câblage de tableaux divisionnaires et généraux de basse tension (TGBT).',
        'Mise en conformité et reprise de réseaux électriques vétustes.',
        "Pose d'onduleurs de secours de grande puissance pour serveurs informatiques.",
        'Systèmes de mise à la terre et protection contre la foudre (parafoudres).'
      ],
      benefits: [
        'Protection de vos équipements électroniques sensibles contre les surtensions.',
        "Réduction des risques d'incendies d'origine électrique.",
        'Conformité réglementaire vis-à-vis des assureurs et inspections.'
      ]
    },
    {
      id: 5,
      title: 'Vidéosurveillance',
      icon: Eye,
      colorClass: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
      description: "Systèmes de vidéosurveillance sur IP intelligents pour surveiller et sécuriser vos locaux industriels, bureaux et résidences 24h/24.",
      details: [
        "Étude des angles morts et définition de l'emplacement optimal des caméras.",
        'Pose de caméras IP (résolution 4K, vision nocturne infrarouge, thermique).',
        "Configuration d'enregistreurs NVR avec stockage redondant (RAID).",
        'Paramétrage d\'alertes intelligentes par détection de mouvement ou franchissement.',
        "Mise en service d'applications de visionnage à distance sur mobile et tablette."
      ],
      benefits: [
        "Effet dissuasif fort contre les intrusions et vols.",
        'Possibilité de visionner vos locaux à distance en temps réel.',
        'Preuves vidéo haute définition exploitables en cas de litige.'
      ]
    },
    {
      id: 6,
      title: 'BTP & Génie Civil',
      icon: Building2,
      colorClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      description: "Étude architecturale, gros oeuvre, second oeuvre et suivi de chantiers pour toutes vos constructions tertiaires ou industrielles.",
      details: [
        'Études architecturales et plans d\'ingénierie béton armé.',
        'Travaux de fondations, gros oeuvre et élévation de structures.',
        'Aménagements extérieurs et voiries réseaux divers (VRD).',
        "Suivi de chantiers par un ingénieur dédié avec rapports d'avancement réguliers."
      ],
      benefits: [
        'Respect strict des délais et budgets validés au cahier des charges.',
        'Solidité et pérennité des ouvrages garanties par nos calculs de structure.',
        "Interlocuteur unique pour l'ensemble du projet de construction."
      ]
    },
    {
      id: 7,
      title: 'Maintenance Informatique',
      icon: Wrench,
      colorClass: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
      description: "Gestion externalisée de votre système d'information (infogérance) pour vous recentrer sur votre coeur de métier en toute sérénité.",
      details: [
        'Audits de parcs informatiques (matériel, logiciel, réseau).',
        "Contrats d'infogérance mensuels avec visites préventives régulières.",
        "Dépannage d'urgence matériel et système d'exploitation sous 4h.",
        'Mise en place de solutions de sauvegarde locale et Cloud automatisées.',
        "Installation d'antivirus d'entreprise et de pare-feu de sécurité."
      ],
      benefits: [
        'Disponibilité maximale de vos postes de travail et serveurs.',
        'Prévention des pertes de données grâce aux sauvegardes testées.',
        'Maîtrise et prévisibilité de vos coûts informatiques annuels.'
      ]
    },
    {
      id: 8,
      title: 'Vente de Matériels & Équipements',
      icon: ShoppingBag,
      colorClass: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      description: "Fourniture et commercialisation de matériels réseau, équipements solaires, systèmes de surveillance et informatique de marques reconnues, disponibles en stock à Conakry.",
      details: [
        'Vente de switches, routeurs, bornes Wi-Fi et câbles réseau (Cisco, MikroTik, TP-Link Pro).',
        'Kits solaires complets : panneaux, onduleurs hybrides, régulateurs MPPT et batteries.',
        'Caméras IP de surveillance intérieure/extérieure (Hikvision, Dahua) et NVR.',
        'Ordinateurs portables et de bureau, écrans, imprimantes et accessoires informatiques.',
        'Fourniture de consommables réseau : prises RJ45, goulottes, chevilles et câbles.'
      ],
      benefits: [
        'Matériels d’origine garantis avec factures officielles et suivi SAV.',
        'Disponibilité immédiate en stock local — zéro délai d’importation.',
        'Conseils techniques gratuits pour choisir l’équipement adapté à vos besoins.'
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
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Notre Offre B2B</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-3">
            Des services d&apos;ingénierie globale de haute qualité
          </h1>
          <p className="text-lg text-slate-300 mt-4 leading-relaxed">
            Chez SoTI, nous combinons les compétences technologiques et le génie civil pour proposer une offre clé en main unique en Guinée.
          </p>
        </div>
      </section>

      {/* Services List Details */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl space-y-16">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                id={`service-${service.id}`}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-24"
              >
                {/* Icon & Title info */}
                <div className="lg:col-span-4 space-y-4">
                  <div className={`p-4 rounded-xl border self-start inline-block ${service.colorClass}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-blue-500 font-bold uppercase">Service #0{service.id}</span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="pt-2">
                    <Link 
                      href={`/devis?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Demander un devis pour ce service →
                    </Link>
                  </div>
                </div>

                {/* Technical Actions Column */}
                <div className="lg:col-span-4 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Ce que nous faisons :</h3>
                  <ul className="space-y-3">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2.5 mt-1.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Business Benefits Column */}
                <div className="lg:col-span-4 p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900/50 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Bénéfices Entreprise :</h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <CheckCircle className="h-4 w-4 text-emerald-500 mr-2.5 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suppress unused index warning */}
                <span className="hidden">{index}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom FAQ CTA */}
      <section className="container mx-auto px-6">
        <div className="bg-[#0A2540] text-white rounded-2xl p-8 sm:p-12 border border-white/5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <h3 className="text-2xl font-extrabold">Vous ne trouvez pas un besoin spécifique ?</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Nos ingénieurs réalisent également des études sur-mesure et de la R&amp;D pour des architectures réseaux ou énergétiques atypiques en Guinée.
            </p>
          </div>
          <Link 
            href="/contact" 
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow-lg transition-colors shrink-0 text-sm"
          >
            Contacter un ingénieur d&apos;affaires
          </Link>
        </div>
      </section>

    </div>
  );
}
