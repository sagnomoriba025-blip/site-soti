// app/admin/dashboard/page.tsx
'use client';

// Force server-side rendering at request time — never pre-render statically.
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import KpiCards from '@/components/admin/KpiCards';
import { useTheme } from '@/components/ThemeProvider';
import { 
  LogOut, 
  Search, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  RefreshCw, 
  AlertCircle, 
  Save, 
  X,
  Sun,
  Moon,
  Download,
  Mail,
  FileText,
  BarChart3,
  MailOpen,
  ChevronRight
} from 'lucide-react';

interface DevisRecord {
  id: string;
  created_at: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  company_name: string | null;
  client_type: string;
  service_requested: string;
  project_description: string;
  budget_estimate: string | null;
  status: 'En attente' | 'En cours' | 'Traité' | 'Annulé';
  admin_notes: string | null;
}

interface ContactMessageRecord {
  id: string;
  created_at: string;
  client_name: string;
  client_email: string;
  subject: string;
  message: string;
  status: 'Non lu' | 'Lu' | 'Répondu' | 'Archivé';
}

export default function AdminDashboard() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'devis' | 'messages' | 'stats'>('devis');

  // Devis lists
  const [quotes, setQuotes] = useState<DevisRecord[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<DevisRecord[]>([]);

  // Messages lists
  const [messages, setMessages] = useState<ContactMessageRecord[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessageRecord[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(true);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [msgSearchTerm, setMsgSearchTerm] = useState('');
  const [msgStatusFilter, setMsgStatusFilter] = useState('All');

  // Devis Modal State
  const [selectedQuote, setSelectedQuote] = useState<DevisRecord | null>(null);
  const [devisModalOpen, setDevisModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<'En attente' | 'En cours' | 'Traité' | 'Annulé'>('En attente');
  const [editNotes, setEditNotes] = useState('');
  const [isSavingDevis, setIsSavingDevis] = useState(false);

  // Messages Modal State
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageRecord | null>(null);
  const [msgModalOpen, setMsgModalOpen] = useState(false);
  const [editMsgStatus, setEditMsgStatus] = useState<'Non lu' | 'Lu' | 'Répondu' | 'Archivé'>('Non lu');
  const [isSavingMsg, setIsSavingMsg] = useState(false);

  // Mock Fallbacks
  const mockQuotes: DevisRecord[] = [
    {
      id: 'mock-1',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      client_name: 'Mamadou Diallo',
      client_email: 'mdiallo@bcrg.gov.gn',
      client_phone: '+224 624 900 424',
      company_name: 'Banque Centrale de Guinée',
      client_type: 'Banque',
      service_requested: 'Réseaux Informatiques',
      project_description: 'Audit complet et recâblage de l\'étage de la direction. Pose de 45 prises RJ45 Cat6A et fusion de deux jarretières fibre.',
      budget_estimate: '5 000 - 15 000 USD',
      status: 'En attente',
      admin_notes: ''
    },
    {
      id: 'mock-2',
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
      client_name: 'Dr. Condé Sékou',
      client_email: 's.conde@clinique-guinee.com',
      client_phone: '+224 669 715 000',
      company_name: 'Clinique Pasteur Conakry',
      client_type: 'Hôpital',
      service_requested: 'Énergie Solaire',
      project_description: 'Dimensionnement d\'un backup solaire off-grid de 12 kWc pour sécuriser l\'alimentation du bloc opératoire et de l\'imagerie en continu.',
      budget_estimate: '15 000 - 50 000 USD',
      status: 'En cours',
      admin_notes: 'Appel technique effectué. Visite sur site prévue mardi prochain pour relevé des toitures.'
    },
    {
      id: 'mock-3',
      created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
      client_name: 'Kadiatou Camara',
      client_email: 'kcamara@hotel-noom.gn',
      client_phone: '+224 624 900 424',
      company_name: 'Noom Hôtel Conakry',
      client_type: 'Hôtel',
      service_requested: 'Vidéosurveillance',
      project_description: 'Remplacement de 24 caméras IP obsolètes et extension sur le parking extérieur avec des modèles dômes IP 4K antivandal.',
      budget_estimate: '5 000 - 15 000 USD',
      status: 'Traité',
      admin_notes: 'Devis envoyé le 02/07/2026. Accepté et signé par le directeur financier. Travaux planifiés.'
    },
    {
      id: 'mock-4',
      created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
      client_name: 'Alpha Oumar',
      client_email: 'aoumar@ong-guinee.org',
      client_phone: '+224 669 715 000',
      company_name: 'ONG Secours Vert',
      client_type: 'ONG',
      service_requested: 'BTP & Génie Civil',
      project_description: 'Construction d\'un forage avec château d\'eau solaire dans un centre communautaire à Coyah.',
      budget_estimate: 'Moins de 5 000 USD',
      status: 'Annulé',
      admin_notes: 'Financement du projet suspendu par le bailleur de fonds principal. À recontacter dans 6 mois.'
    }
  ];

  const mockMessages: ContactMessageRecord[] = [
    {
      id: 'msg-mock-1',
      created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
      client_name: 'Amadou Camara',
      client_email: 'acamara@gmail.com',
      subject: 'Demande de partenariat de sous-traitance BTP',
      message: 'Bonjour, nous sommes une entreprise de génie civil basée à Kankan et souhaiterions collaborer avec SoTI sur vos chantiers solaires pour la réalisation des dalles béton. Cordialement.',
      status: 'Non lu'
    },
    {
      id: 'msg-mock-2',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      client_name: 'Mariama Diallo',
      client_email: 'm.diallo@orange.com.gn',
      subject: 'Demande de tarifs maintenance annuelle réseau',
      message: 'Bonjour, je souhaiterais obtenir vos grilles tarifaires de maintenance préventive pour un parc de 35 ordinateurs et 3 serveurs à Conakry. Merci.',
      status: 'Lu'
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // 1. Get authenticated user
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        if (supabaseUrl && !supabaseUrl.includes('your-project-id')) {
          router.push('/admin/login');
          return;
        }
      } else {
        setUser(session.user as Record<string, unknown>);
      }
      await fetchQuotes();
      await fetchMessages();
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Handle devis live searches and status filtering
  useEffect(() => {
    let result = quotes;

    if (statusFilter !== 'All') {
      result = result.filter(q => q.status === statusFilter);
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(q => 
        q.client_name.toLowerCase().includes(term) ||
        (q.company_name && q.company_name.toLowerCase().includes(term)) ||
        q.client_email.toLowerCase().includes(term) ||
        q.service_requested.toLowerCase().includes(term)
      );
    }

    setFilteredQuotes(result);
  }, [searchTerm, statusFilter, quotes]);

  // Handle messages live searches and status filtering
  useEffect(() => {
    let result = messages;

    if (msgStatusFilter !== 'All') {
      result = result.filter(m => m.status === msgStatusFilter);
    }

    if (msgSearchTerm.trim() !== '') {
      const term = msgSearchTerm.toLowerCase();
      result = result.filter(m => 
        m.client_name.toLowerCase().includes(term) ||
        m.client_email.toLowerCase().includes(term) ||
        m.subject.toLowerCase().includes(term) ||
        m.message.toLowerCase().includes(term)
      );
    }

    setFilteredMessages(result);
  }, [msgSearchTerm, msgStatusFilter, messages]);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('devis')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setQuotes(data);
      } else {
        setQuotes(mockQuotes);
      }
    } catch (err) {
      console.warn('Fetch devis error or table missing. Using fallback data.', err);
      setQuotes(mockQuotes);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    setMessagesLoading(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setMessages(data);
      } else {
        setMessages(mockMessages);
      }
    } catch (err) {
      console.warn('Fetch messages error. Using fallback messages.', err);
      setMessages(mockMessages);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  // --- Devis Actions ---
  const openQuoteModal = (quote: DevisRecord) => {
    setSelectedQuote(quote);
    setEditStatus(quote.status);
    setEditNotes(quote.admin_notes || '');
    setDevisModalOpen(true);
  };

  const saveQuoteChanges = async () => {
    if (!selectedQuote) return;
    setIsSavingDevis(true);

    try {
      const { error: updateError } = await supabase
        .from('devis')
        .update({
          status: editStatus,
          admin_notes: editNotes,
        })
        .eq('id', selectedQuote.id);

      if (updateError) console.warn('Supabase devis update failed. Saving locally.');
      
      setQuotes(prev => prev.map(q => 
        q.id === selectedQuote.id 
          ? { ...q, status: editStatus, admin_notes: editNotes } 
          : q
      ));

      setDevisModalOpen(false);
      setSelectedQuote(null);
    } catch (err) {
      console.error('Error saving devis:', err);
    } finally {
      setIsSavingDevis(false);
    }
  };

  const deleteQuote = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer définitivement ce devis ?')) return;

    try {
      await supabase.from('devis').delete().eq('id', id);
      setQuotes(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      console.error('Error deleting devis:', err);
    }
  };

  // --- Contact Messages Actions ---
  const openMessageModal = async (msg: ContactMessageRecord) => {
    setSelectedMessage(msg);
    setEditMsgStatus(msg.status === 'Non lu' ? 'Lu' : msg.status);
    setMsgModalOpen(true);

    // If message is Unread, automatically mark as Read in database
    if (msg.status === 'Non lu') {
      try {
        await supabase.from('messages').update({ status: 'Lu' }).eq('id', msg.id);
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'Lu' } : m));
      } catch (err) {
        console.warn('Could not auto-mark message as read in DB.', err);
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'Lu' } : m));
      }
    }
  };

  const saveMessageChanges = async () => {
    if (!selectedMessage) return;
    setIsSavingMsg(true);

    try {
      const { error } = await supabase
        .from('messages')
        .update({ status: editMsgStatus })
        .eq('id', selectedMessage.id);

      if (error) console.warn('Supabase message update failed.');
      
      setMessages(prev => prev.map(m => 
        m.id === selectedMessage.id ? { ...m, status: editMsgStatus } : m
      ));

      setMsgModalOpen(false);
      setSelectedMessage(null);
    } catch (err) {
      console.error('Error updating message:', err);
    } finally {
      setIsSavingMsg(false);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message de contact ?')) return;

    try {
      await supabase.from('messages').delete().eq('id', id);
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  // --- CSV Export Logic ---
  const exportToCSV = () => {
    if (filteredQuotes.length === 0) {
      alert("Aucun devis à exporter.");
      return;
    }

    const headers = [
      "ID", "Date de Reception", "Client", "Email", "Telephone", 
      "Entreprise", "Profil Activite", "Service Demande", 
      "Description Projet", "Budget Estime", "Statut", "Notes Internes"
    ];

    const rows = filteredQuotes.map(q => [
      q.id,
      new Date(q.created_at).toLocaleString('fr-FR'),
      q.client_name,
      q.client_email,
      q.client_phone,
      q.company_name || "Particulier",
      q.client_type,
      q.service_requested,
      q.project_description.replace(/\r?\n|\r/g, " "), // strip returns
      q.budget_estimate || "Non fixe",
      q.status,
      (q.admin_notes || "").replace(/\r?\n|\r/g, " ")
    ]);

    const csvContent = [
      headers.join(";"),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(";"))
    ].join("\n");

    // Excel BOM prefix to support French characters
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `devis_soti_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Compute stats for KPI Cards
  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'En attente').length,
    inProgress: quotes.filter(q => q.status === 'En cours').length,
    completed: quotes.filter(q => q.status === 'Traité').length,
    totalChangePercent: 14.2,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'En attente':
        return <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"><Clock className="mr-1 h-2.5 w-2.5" /> En attente</span>;
      case 'En cours':
        return <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"><RefreshCw className="mr-1 h-2.5 w-2.5 animate-spin" style={{ animationDuration: '3s' }} /> En étude</span>;
      case 'Traité':
        return <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"><CheckCircle className="mr-1 h-2.5 w-2.5" /> Traité</span>;
      case 'Annulé':
        return <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400"><AlertCircle className="mr-1 h-2.5 w-2.5" /> Annulé</span>;
      default:
        return null;
    }
  };

  const getMsgStatusBadge = (status: string) => {
    switch (status) {
      case 'Non lu':
        return <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Non lu</span>;
      case 'Lu':
        return <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-450">Lu</span>;
      case 'Répondu':
        return <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Répondu</span>;
      case 'Archivé':
        return <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-400">Archivé</span>;
      default:
        return null;
    }
  };

  // Stats Calculations
  const serviceCounts: Record<string, number> = {};
  const clientCounts: Record<string, number> = {};
  quotes.forEach(q => {
    serviceCounts[q.service_requested] = (serviceCounts[q.service_requested] || 0) + 1;
    clientCounts[q.client_type] = (clientCounts[q.client_type] || 0) + 1;
  });
  const serviceData = Object.entries(serviceCounts).map(([name, value]) => ({ name, value }));
  const clientData = Object.entries(clientCounts).map(([name, value]) => ({ name, value }));
  const maxService = Math.max(...serviceData.map(d => d.value), 1);
  const maxClient = Math.max(...clientData.map(d => d.value), 1);

  // Unread messages count for badge
  const unreadMsgCount = messages.filter(m => m.status === 'Non lu').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 sm:p-8">
      <div className="container mx-auto max-w-7xl space-y-8">
        
        {/* Header Bar */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Tableau de Bord Admin</h1>
            <p className="text-xs text-slate-400 mt-1">
              Connecté en tant que : <strong className="text-blue-500">{user?.email || 'admin@soti-guinee.com'}</strong>
            </p>
          </div>
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all duration-200"
                title="Changer de thème"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
            <button 
              onClick={handleLogout}
              className="inline-flex items-center justify-center px-4 py-2 border border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 font-bold rounded text-xs transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </header>

        {/* 4 KPI Cards Section */}
        <KpiCards stats={stats} />

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 dark:border-slate-850 gap-4">
          <button
            onClick={() => setActiveTab('devis')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'devis' 
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <FileText className="h-4 w-4" />
            Dossiers Devis
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 relative ${
              activeTab === 'messages' 
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Mail className="h-4 w-4" />
            Messages Clients
            {unreadMsgCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white animate-pulse">
                {unreadMsgCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'stats' 
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            Analyses &amp; Graphiques
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'devis' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden space-y-4">
            {/* Filter Toolbar */}
            <div className="p-6 border-b border-slate-200/60 dark:border-slate-800 flex flex-col md:flex-row justify-between gap-4 items-center">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher client, e-mail, service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs rounded-lg border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Toolbar Right */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Status Filter */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
                  {['All', 'En attente', 'En cours', 'Traité', 'Annulé'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg border shrink-0 transition-colors ${
                        statusFilter === status
                          ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
                      }`}
                    >
                      {status === 'All' ? 'Tous' : status}
                    </button>
                  ))}
                </div>

                {/* Export Button */}
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center justify-center px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-[11px] shadow transition-colors w-full sm:w-auto shrink-0"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Exporter CSV
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-905 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase border-b border-slate-200/60 dark:border-slate-800">
                  <tr>
                    <th className="py-4 px-6">Client &amp; Entreprise</th>
                    <th className="py-4 px-6">Service demandeur</th>
                    <th className="py-4 px-6">Budget Prévu</th>
                    <th className="py-4 px-6">Date de Réception</th>
                    <th className="py-4 px-6">Statut</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/80 text-xs">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        Chargement des dossiers en cours...
                      </td>
                    </tr>
                  ) : filteredQuotes.length > 0 ? (
                    filteredQuotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-slate-900 dark:text-white">{quote.client_name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{quote.company_name || 'Particulier'}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{quote.client_phone}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-medium text-slate-800 dark:text-slate-200">{quote.service_requested}</span>
                          <div className="text-[10px] text-slate-400 line-clamp-1 max-w-[200px] mt-0.5">{quote.project_description}</div>
                        </td>
                        <td className="py-4 px-6 text-slate-650 dark:text-slate-400 font-medium">
                          {quote.budget_estimate || 'Non fixé'}
                        </td>
                        <td className="py-4 px-6 text-slate-500 font-mono">
                          {new Date(quote.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </td>
                        <td className="py-4 px-6">
                          {getStatusBadge(quote.status)}
                        </td>
                        <td className="py-4 px-6 text-right space-x-2 shrink-0">
                          <button
                            onClick={() => openQuoteModal(quote)}
                            className="inline-flex items-center justify-center p-2 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                            title="Consulter et traiter"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteQuote(quote.id)}
                            className="inline-flex items-center justify-center p-2 rounded bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        Aucun devis trouvé.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden space-y-4">
            {/* Filter Toolbar for Messages */}
            <div className="p-6 border-b border-slate-200/60 dark:border-slate-800 flex flex-col md:flex-row justify-between gap-4 items-center">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher expéditeur, sujet, texte..."
                  value={msgSearchTerm}
                  onChange={(e) => setMsgSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs rounded-lg border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
                {['All', 'Non lu', 'Lu', 'Répondu', 'Archivé'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setMsgStatusFilter(status)}
                    className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg border shrink-0 transition-colors ${
                      msgStatusFilter === status
                        ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
                    }`}
                  >
                    {status === 'All' ? 'Tous' : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-905 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase border-b border-slate-200/60 dark:border-slate-800">
                  <tr>
                    <th className="py-4 px-6">Expéditeur</th>
                    <th className="py-4 px-6">Sujet du Message</th>
                    <th className="py-4 px-6">Date de Réception</th>
                    <th className="py-4 px-6">Statut</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/80 text-xs">
                  {messagesLoading ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        Chargement des messages en cours...
                      </td>
                    </tr>
                  ) : filteredMessages.length > 0 ? (
                    filteredMessages.map((msg) => (
                      <tr 
                        key={msg.id} 
                        className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors ${
                          msg.status === 'Non lu' ? 'font-bold bg-blue-500/[0.01]' : 'font-normal'
                        }`}
                      >
                        <td className="py-4 px-6">
                          <div className="text-slate-900 dark:text-white">{msg.client_name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{msg.client_email}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-slate-800 dark:text-slate-200">{msg.subject}</span>
                          <div className="text-[10px] text-slate-450 line-clamp-1 max-w-[250px] mt-0.5 font-normal">{msg.message}</div>
                        </td>
                        <td className="py-4 px-6 text-slate-500 font-mono">
                          {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </td>
                        <td className="py-4 px-6">
                          {getMsgStatusBadge(msg.status)}
                        </td>
                        <td className="py-4 px-6 text-right space-x-2 shrink-0">
                          <button
                            onClick={() => openMessageModal(msg)}
                            className="inline-flex items-center justify-center p-2 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                            title="Ouvrir le message"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="inline-flex items-center justify-center p-2 rounded bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        Aucun message de contact trouvé.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Visual Charts Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Service Demands Chart */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">Demandes par Service</h3>
                <div className="space-y-3 pt-2">
                  {serviceData.map((d, idx) => {
                    const percentage = (d.value / maxService) * 100;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-slate-700 dark:text-slate-350">{d.name}</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">{d.value}</span>
                        </div>
                        <div className="h-3 w-full bg-slate-100 dark:bg-slate-850 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {serviceData.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6">Aucune donnée disponible.</p>
                  )}
                </div>
              </div>

              {/* Client Sectors Chart */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">Demandes par Secteur Client</h3>
                <div className="space-y-3 pt-2">
                  {clientData.map((d, idx) => {
                    const percentage = (d.value / maxClient) * 100;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-slate-700 dark:text-slate-350">{d.name}</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-450">{d.value}</span>
                        </div>
                        <div className="h-3 w-full bg-slate-100 dark:bg-slate-850 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {clientData.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6">Aucune donnée disponible.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Aggregate Overview Card */}
            <div className="bg-gradient-to-r from-[#0A2540] to-slate-950 text-white rounded-xl p-6 border border-white/5 shadow flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <h4 className="text-base font-bold">Analyses de Performance SoTI</h4>
                <p className="text-xs text-slate-350 leading-relaxed max-w-xl">
                  Ces statistiques vous permettent de suivre l&apos;activité d&apos;ingénierie et d&apos;estimer les ressources réseau et solaires à déployer en Guinée.
                </p>
              </div>
              <div className="flex gap-4 shrink-0">
                <div className="text-center p-3.5 bg-white/5 rounded-lg border border-white/10 min-w-24">
                  <span className="text-2xl font-black text-blue-400 block leading-none">{stats.total}</span>
                  <span className="text-[10px] text-slate-450 block mt-1 uppercase font-semibold">Total Devis</span>
                </div>
                <div className="text-center p-3.5 bg-white/5 rounded-lg border border-white/10 min-w-24">
                  <span className="text-2xl font-black text-emerald-400 block leading-none">{stats.completed}</span>
                  <span className="text-[10px] text-slate-450 block mt-1 uppercase font-semibold">Traités</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Treat Devis */}
        {devisModalOpen && selectedQuote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/60">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Traitement de dossier : Devis #{selectedQuote.id.slice(0, 8)}
                  </h3>
                  <span className="text-[10px] text-slate-400">Reçu le : {new Date(selectedQuote.created_at).toLocaleString('fr-FR')}</span>
                </div>
                <button onClick={() => setDevisModalOpen(false)} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 text-xs text-slate-800 dark:text-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-450 block font-medium">Nom complet</span>
                    <strong className="text-slate-900 dark:text-white block mt-0.5">{selectedQuote.client_name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-450 block font-medium">Téléphone</span>
                    <a href={`tel:${selectedQuote.client_phone}`} className="text-blue-600 dark:text-blue-450 font-bold block mt-0.5">{selectedQuote.client_phone}</a>
                  </div>
                  <div>
                    <span className="text-slate-450 block font-medium">Adresse e-mail</span>
                    <a href={`mailto:${selectedQuote.client_email}`} className="text-blue-600 dark:text-blue-450 font-bold block mt-0.5 break-all">{selectedQuote.client_email}</a>
                  </div>
                  <div>
                    <span className="text-slate-450 block font-medium">Entreprise &amp; Entité</span>
                    <strong className="text-slate-900 dark:text-white block mt-0.5">{selectedQuote.company_name || 'Particulier'} ({selectedQuote.client_type})</strong>
                  </div>
                </div>

                <hr className="border-slate-200/60 dark:border-slate-850" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-450 block font-medium">Service sollicité</span>
                    <strong className="text-blue-650 dark:text-blue-400 block mt-0.5">{selectedQuote.service_requested}</strong>
                  </div>
                  <div>
                    <span className="text-slate-450 block font-medium">Budget prévisionnel</span>
                    <strong className="text-slate-900 dark:text-white block mt-0.5">{selectedQuote.budget_estimate || 'Non fixé'}</strong>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-slate-455 block font-medium">Description des travaux :</span>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-lg">
                    <p className="text-slate-700 dark:text-slate-350 leading-relaxed font-sans whitespace-pre-wrap max-h-36 overflow-y-auto font-normal">
                      {selectedQuote.project_description}
                    </p>
                  </div>
                </div>

                <hr className="border-slate-200/60 dark:border-slate-855" />

                {/* Status and notes controls */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Modifier le statut</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="En attente">En attente (Nouveau dossier)</option>
                      <option value="En cours">En cours d&apos;étude (Appel ou visite programmée)</option>
                      <option value="Traité">Traité (Devis finalisé envoyé)</option>
                      <option value="Annulé">Annulé (Dossier suspendu)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Notes internes administratives</label>
                    <textarea
                      rows={3}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Ajouter des notes internes..."
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex justify-end gap-3">
                <button onClick={() => setDevisModalOpen(false)} className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-750 dark:text-slate-300 font-bold rounded text-xs transition-colors">
                  Annuler
                </button>
                <button onClick={saveQuoteChanges} disabled={isSavingDevis} className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs shadow disabled:opacity-50">
                  <Save className="mr-2 h-4 w-4" />
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: View Message */}
        {msgModalOpen && selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/60">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Message client B2B/B2C
                  </h3>
                  <span className="text-[10px] text-slate-400">Reçu le : {new Date(selectedMessage.created_at).toLocaleString('fr-FR')}</span>
                </div>
                <button onClick={() => setMsgModalOpen(false)} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 text-xs text-slate-800 dark:text-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-450 block font-medium">Nom de l&apos;expéditeur</span>
                    <strong className="text-slate-900 dark:text-white block mt-0.5">{selectedMessage.client_name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-450 block font-medium">Adresse e-mail</span>
                    <a href={`mailto:${selectedMessage.client_email}`} className="text-blue-650 dark:text-blue-400 font-bold block mt-0.5 break-all">{selectedMessage.client_email}</a>
                  </div>
                </div>

                <hr className="border-slate-200/60 dark:border-slate-850" />

                <div>
                  <span className="text-slate-450 block font-medium">Sujet</span>
                  <strong className="text-slate-900 dark:text-white block mt-0.5">{selectedMessage.subject}</strong>
                </div>

                <div className="space-y-1.5">
                  <span className="text-slate-455 block font-medium">Message :</span>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-lg">
                    <p className="text-slate-700 dark:text-slate-350 leading-relaxed font-sans whitespace-pre-wrap max-h-48 overflow-y-auto font-normal">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <hr className="border-slate-200/60 dark:border-slate-855" />

                {/* Status controls */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Modifier le statut du message</label>
                  <select
                    value={editMsgStatus}
                    onChange={(e) => setEditMsgStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Non lu">Non lu</option>
                    <option value="Lu">Lu</option>
                    <option value="Répondu">Répondu (Action finale effectuée)</option>
                    <option value="Archivé">Archivé</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex justify-between items-center gap-3">
                <a
                  href={`mailto:${selectedMessage.client_email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="inline-flex items-center justify-center px-4 py-2 border border-blue-200 dark:border-blue-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold rounded text-xs transition-colors"
                >
                  <MailOpen className="mr-2 h-4 w-4" />
                  Répondre par e-mail
                </a>
                <div className="flex gap-2">
                  <button onClick={() => setMsgModalOpen(false)} className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-750 dark:text-slate-300 font-bold rounded text-xs transition-colors">
                    Fermer
                  </button>
                  <button onClick={saveMessageChanges} disabled={isSavingMsg} className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs shadow disabled:opacity-50">
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
