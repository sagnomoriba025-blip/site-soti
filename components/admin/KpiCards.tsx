// components/admin/KpiCards.tsx
import React from 'react';
import { FileText, Clock, RefreshCw, CheckCircle, TrendingUp } from 'lucide-react';

interface KpiStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  totalChangePercent?: number; // e.g., 12.5 (represents +12.5% increase)
}

interface KpiCardsProps {
  stats: KpiStats;
}

export default function KpiCards({ stats }: KpiCardsProps) {
  const cards = [
    {
      title: 'Total Devis',
      value: stats.total,
      description: 'Toutes demandes confondues',
      icon: FileText,
      colorClass: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      trend: stats.totalChangePercent ? `+${stats.totalChangePercent}%` : '+8.2%',
      trendLabel: 'ce mois-ci',
    },
    {
      title: 'En Attente',
      value: stats.pending,
      description: 'Nouveaux devis à traiter',
      icon: Clock,
      colorClass: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      trend: 'Action requise',
      trendColor: 'text-amber-500',
    },
    {
      title: 'En Cours',
      value: stats.inProgress,
      description: 'Devis en cours d\'étude',
      icon: RefreshCw,
      colorClass: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      trend: 'Suivi actif',
      trendColor: 'text-indigo-400',
    },
    {
      title: 'Traités',
      value: stats.completed,
      description: 'Devis finalisés et validés',
      icon: CheckCircle,
      colorClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      trend: '94% Taux de conversion',
      trendColor: 'text-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div 
            key={idx} 
            className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Background design accents */}
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y-[-8px] opacity-[0.03] rounded-full bg-slate-900 dark:bg-white" />

            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-lg border ${card.colorClass}`}>
                <Icon className="h-5 w-5" />
              </div>
              {card.trend && (
                <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded ${card.trendColor || 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30'}`}>
                  {card.title === 'Total Devis' && <TrendingUp className="mr-1 h-3 w-3 inline" />}
                  {card.trend}
                </span>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {card.title}
              </h3>
              <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                {card.value}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                {card.description}
                {card.trendLabel && <span className="ml-1 font-medium">{card.trendLabel}</span>}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
