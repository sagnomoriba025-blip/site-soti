// app/page.tsx
import React from 'react';
import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import { 
  Network, 
  PhoneCall, 
  Sun, 
  Zap, 
  Eye, 
  Building2, 
  Wrench, 
  ShoppingBag,
  ArrowRight,
  Shield, 
  Lightbulb, 
  TrendingUp 
} from 'lucide-react';

export default function Home() {
  
  // 7 services details
  const services = [
    {
      id: 1,
      title: 'Réseaux Informatiques',
      desc: 'Câblage RJ45 Cat6/Cat6A, raccordement et fusion de Fibre optique, installation de baies de brassage et équipements réseaux actifs.',
      icon: Network,
      color: 'from-blue-600 to-cyan-500',
    },
    {
      id: 2,
      title: 'Télécommunications',
      desc: 'Déploiement de serveurs de téléphonie PABX / IPBX IP et Analogiques, ainsi que des solutions d\'interphonie professionnelle.',
      icon: PhoneCall,
      color: 'from-blue-700 to-indigo-500',
    },
    {
      id: 3,
      title: 'Énergie Solaire',
      desc: 'Études dimensionnelles complètes, fourniture, installation et maintenance d\'équipements solaires (panneaux, onduleurs, batteries).',
      icon: Sun,
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 4,
      title: 'Électricité Bâtiment',
      desc: 'Installations électriques complètes pour bâtiments résidentiels, industriels et tertiaires. Câblage et mise aux normes de sécurité.',
      icon: Zap,
      color: 'from-yellow-500 to-amber-600',
    },
    {
      id: 5,
      title: 'Vidéosurveillance',
      desc: 'Sécurisation de vos sites par des caméras IP haut de gamme (dôme, bullet), serveurs d\'enregistrement NVR et configuration d\'accès à distance.',
      icon: Eye,
      color: 'from-indigo-600 to-blue-500',
    },
    {
      id: 6,
      title: 'BTP & Génie Civil',
      desc: 'Études techniques architecturales et d\'ingénierie, réalisation de travaux de construction et suivi rigoureux de chantiers.',
      icon: Building2,
      color: 'from-emerald-600 to-teal-500',
    },
    {
      id: 7,
      title: 'Maintenance Informatique',
      desc: 'Contrats de maintenance préventive et corrective pour parcs informatiques, mise en place de sauvegardes automatiques sécurisées.',
      icon: Wrench,
      color: 'from-slate-600 to-slate-800',
    },
    {
      id: 8,
      title: 'Vente de Matériels',
      desc: 'Vente de matériel réseau, kits solaires, caméras de surveillance, ordinateurs et équipements informatiques de marques reconnues.',
      icon: ShoppingBag,
      color: 'from-purple-600 to-pink-500',
    },
  ];

  // 4 Core Values
  const values = [
    {
      title: 'INNOVER',
      desc: "Concevoir et proposer des solutions technologiques de pointe adaptées aux enjeux de demain.",
      icon: Lightbulb,
      textColor: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/50',
    },
    {
      title: 'CONNECTER',
      desc: "Rapprocher les hommes et optimiser l'échange de données via des infrastructures fiables.",
      icon: Network,
      textColor: 'text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/50',
    },
    {
      title: 'SECURISER',
      desc: 'Protéger vos données, vos équipements, vos locaux et vos investissements de bout en bout.',
      icon: Shield,
      textColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/50',
    },
    {
      title: 'PERFORMER',
      desc: 'Garantir une qualité de service sans compromis pour maximiser la rentabilité de vos projets.',
      icon: TrendingUp,
      textColor: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/50',
    },
  ];

  // Atouts / Strengths
  const strengths = [
    {
      title: 'Expertise Locale & Normes Internationales',
      desc: 'Basés à Conakry, nous maîtrisons parfaitement les contraintes techniques du terrain guinéen tout en respectant les standards internationaux (ISO, TIA/EIA).',
    },
    {
      title: 'Équipe d\'Ingénieurs Qualifiés',
      desc: 'Nos équipes sont formées et certifiées sur les dernières technologies pour garantir des installations de haute technicité, durables et évolutives.',
    },
    {
      title: 'Solutions Clés en Main',
      desc: 'De l\'audit initial à la maintenance en passant par l\'installation complète, nous gérons l\'intégralité du cycle de vie de vos projets technologiques.',
    },
    {
      title: 'Support Client 24/7',
      desc: 'Parce que vos opérations ne s\'arrêtent jamais, nous proposons des contrats de support réactifs avec astreinte technique pour une tranquillité d\'esprit totale.',
    },
  ];

  // Client Sectors
  const sectors = [
    { name: 'Banques & Institutions Financières', count: '10+' },
    { name: 'Grandes Entreprises & PME', count: '40+' },
    { name: 'Administrations Publiques', count: '5+' },
    { name: 'Établissements Scolaires & Universités', count: '12+' },
    { name: 'Hôpitaux & Cliniques', count: '8+' },
    { name: 'ONGs & Organisations Internationales', count: '15+' },
    { name: 'Hôtels & Résidences Haut de Gamme', count: '20+' },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Values Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Nos Fondations</h2>
            <p className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
              Les Valeurs qui nous Animent au Quotidien
            </p>
            <div className="h-1 w-20 bg-blue-600 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx} 
                  className={`p-8 rounded-xl border flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg ${val.bgColor}`}
                >
                  <div className={`p-4 rounded-full bg-white dark:bg-slate-900 shadow-md ${val.textColor} mb-5`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-wide mb-3">{val.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Nos Spécialités</h2>
              <p className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl leading-tight">
                Une Expertise Multidisciplinaire au Service de vos Ambitions
              </p>
              <div className="h-1 w-20 bg-blue-600 mt-4" />
            </div>
            <Link 
              href="/services" 
              className="inline-flex items-center text-blue-600 hover:text-blue-500 font-bold mt-4 md:mt-0 transition-colors group text-sm shrink-0"
            >
              Voir le détail des 7 services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id} 
                  className="group relative flex flex-col justify-between p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-1"
                >
                  {/* Decorative corner gradient */}
                  <div className={`absolute top-0 right-0 h-2 w-full bg-gradient-to-r ${service.color}`} />
                  
                  <div className="space-y-4">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${service.color} text-white shadow-md`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                  
                  <div className="pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Service #0{service.id}</span>
                    <Link 
                      href="/services" 
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                    >
                      En savoir plus
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Atouts Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Header info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 bg-white/5 border border-white/10 rounded-full self-start inline-block">
                Pourquoi nous choisir ?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Pourquoi faire confiance à <span className="text-blue-400">SoTI</span> pour vos projets complexes ?
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Parce que la réussite d'un projet industriel ou de télécommunication repose sur des fondations solides et un partenaire réactif, nous nous engageons à offrir le plus haut niveau de service en Guinée.
              </p>
              <div className="pt-2">
                <Link 
                  href="/devis" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow-lg transition-colors group"
                >
                  Lancer votre projet
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* List of Strengths */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {strengths.map((st, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-slate-100">{st.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Target Sectors / Trust Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Notre Clientèle</h2>
            <p className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
              Ils Nous Font Confiance
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Nous intervenons auprès des acteurs les plus exigeants de la sous-région.
            </p>
            <div className="h-1 w-20 bg-blue-600 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {sectors.map((sec, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between items-center text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-1">{sec.count}</span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight">
                  {sec.name}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center p-6 bg-blue-600/5 rounded-xl border border-blue-500/10 max-w-xl mx-auto">
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              Besoin d'un audit de votre réseau ou d'une étude d'ingénierie solaire ? 
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-bold ml-1">
                Discutez avec nos experts →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
