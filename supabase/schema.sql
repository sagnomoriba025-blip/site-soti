-- ==========================================
-- Schéma SQL pour SoTI - Société de Technologies & Ingénierie
-- Table : devis
-- Sécurité : RLS activée
-- ==========================================

-- Création de la table devis
CREATE TABLE IF NOT EXISTS public.devis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    company_name VARCHAR(255),
    client_type VARCHAR(100) NOT NULL, -- Banques, Entreprises, Administrations, Écoles, Hôpitaux, ONG, Hôtels, Particuliers
    service_requested VARCHAR(150) NOT NULL, -- Réseaux, Télécom, Solaire, Électricité, Vidéosurveillance, BTP, Maintenance
    project_description TEXT NOT NULL,
    budget_estimate VARCHAR(100),
    status VARCHAR(50) DEFAULT 'En attente'::character varying NOT NULL, -- En attente, En cours, Traité, Annulé
    admin_notes TEXT,
    
    -- Honeypot field for spam detection (must be empty on submission)
    spam_honeypot VARCHAR(255),

    CONSTRAINT devis_status_check CHECK (status IN ('En attente', 'En cours', 'Traité', 'Annulé'))
);

-- Activation de la sécurité RLS (Row Level Security)
ALTER TABLE public.devis ENABLE ROW LEVEL SECURITY;

-- Suppression des anciennes politiques si existantes pour éviter les conflits
DROP POLICY IF EXISTS "Permettre l'insertion publique des devis" ON public.devis;
DROP POLICY IF EXISTS "Accès complet aux admins authentifiés" ON public.devis;

-- Politique 1 : Permettre au public (utilisateurs non authentifiés) d'insérer des devis
CREATE POLICY "Permettre l'insertion publique des devis" 
    ON public.devis 
    FOR INSERT 
    WITH CHECK (true);

-- Politique 2 : Autoriser uniquement les administrateurs authentifiés à lire/modifier/supprimer
CREATE POLICY "Accès complet aux admins authentifiés" 
    ON public.devis 
    FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');

-- Indexes pour optimiser la recherche dans le Dashboard Admin
CREATE INDEX IF NOT EXISTS idx_devis_status ON public.devis(status);
CREATE INDEX IF NOT EXISTS idx_devis_created_at ON public.devis(created_at DESC);

-- ==========================================
-- Table : messages
-- Sécurité : RLS activée
-- ==========================================

-- Création de la table messages pour les contacts B2B/B2C
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Non lu'::character varying NOT NULL, -- Non lu, Lu, Répondu, Archivé
    spam_honeypot VARCHAR(255),
    CONSTRAINT messages_status_check CHECK (status IN ('Non lu', 'Lu', 'Répondu', 'Archivé'))
);

-- Activation de la sécurité RLS sur la table messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Suppression des anciennes politiques si existantes
DROP POLICY IF EXISTS "Permettre l'insertion publique des messages" ON public.messages;
DROP POLICY IF EXISTS "Accès complet aux messages pour les admins" ON public.messages;

-- Politique 1 : Permettre au public d'insérer des messages via le formulaire
CREATE POLICY "Permettre l'insertion publique des messages" 
    ON public.messages 
    FOR INSERT 
    WITH CHECK (true);

-- Politique 2 : Autoriser uniquement les administrateurs authentifiés à lire/modifier/supprimer
CREATE POLICY "Accès complet aux messages pour les admins" 
    ON public.messages 
    FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');

-- Index pour optimiser la recherche et le tri des messages
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);

