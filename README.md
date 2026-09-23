# SoTI - Société de Technologies & Ingénierie
> **Votre Partenaire Technologique de Confiance**  
> *Ingénierie • Innovation • Performance*

Ce dépôt contient le code source complet du site vitrine professionnel B2B et du Tableau de Bord d'Administration pour l'entreprise **SoTI**, basée à Conakry, Guinée.

---

## 🚀 Fonctionnalités Clés

### Site Vitrine (Public)
1. **Accueil (`/`)** : Présentation dynamique, section Hero immersive, valeurs fondamentales (INNOVER - CONNECTER - SECURISER - PERFORMER), aperçu des 7 services et secteurs cibles.
2. **À Propos (`/a-propos`)** : Histoire de l'entreprise, mission, vision et présentation de l'équipe de direction.
3. **Nos Services (`/services`)** : Détail complet des 7 domaines d'activité avec fiches techniques et bénéfices B2B.
4. **Réalisations (`/realisations`)** : Galerie interactive filtrable par domaine technique avec étude de cas au format **Avant / Après**.
5. **Demande de Devis (`/devis`)** : Formulaire d'ingénierie multi-étapes (React Hook Form + Zod) sécurisé contre le spam (champ Honeypot) avec enregistrement en base de données et alerte e-mail.
6. **Contact (`/contact`)** : Informations de contact complètes, appels directs, adresse physique et bouton d'action WhatsApp flottant.

### Portail Administration (`/admin`)
1. **Connexion Sécurisée (`/admin/login`)** : Formulaire d'authentification lié à Supabase Auth.
2. **Tableau de Bord Protégé (`/admin/dashboard`)** : 
   - **Middleware** Next.js interceptant les accès non autorisés.
   - **4 KPI Cards** dynamiques (Total, En attente, En cours, Traités).
   - **DataTable interactive** avec recherche plein texte, filtres par statut.
   - **Modal de gestion** permettant de lire le détail des projets, modifier le statut du devis et enregistrer des notes internes administratives.

---

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router) + TypeScript
- **Styling** : TailwindCSS + Lucide-React
- **Formulaires & Sécurité** : React Hook Form, Zod, Honeypot Anti-Spam
- **Backend & Database** : Supabase (Auth, PostgreSQL DB, RLS activé)
- **Notifications E-mail** : Resend API

---

## ⚙️ Configuration & Installation

### 1. Variables d'Environnement
Renommez le fichier `.env.example` en `.env.local` et renseignez vos identifiants :

```bash
cp .env.example .env.local
```

Renseignez les valeurs suivantes :
- `NEXT_PUBLIC_SUPABASE_URL` : URL de votre projet Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Clé d'accès publique anonyme.
- `RESEND_API_KEY` : Clé d'API obtenue sur [Resend](https://resend.com).
- `RESEND_FROM_EMAIL` : Adresse d'expédition validée sur Resend (ex: `onboarding@resend.dev` pour les tests).
- `NOTIFICATION_RECEIVER_EMAIL` : `sotiguineepro@gmail.com` (Destinataire officiel).
- `NEXT_PUBLIC_SITE_URL` : URL racine du site (ex: `http://localhost:3000` en local).

### 2. Initialisation de la Base de Données
Exécutez le script SQL présent dans `supabase/schema.sql` dans l'éditeur de requêtes SQL (SQL Editor) de votre tableau de bord Supabase.

Ce script va :
1. Créer la table `devis` avec tous les champs requis.
2. Activer la sécurité au niveau des lignes (RLS - Row Level Security).
3. Créer une politique publique d'insertion (`INSERT`) pour que les clients puissent soumettre des devis.
4. Créer une politique privée pour les utilisateurs authentifiés (`auth.role() = 'authenticated'`) pour sécuriser la lecture/écriture sur le dashboard.

### 3. Exécution en mode développement

Installez d'abord les dépendances du projet :
```bash
npm install
```

Lancez le serveur de développement :
```bash
npm run dev
```

Accédez à l'adresse suivante : [http://localhost:3000](http://localhost:3000).

---

## 📂 Structure du Code Source

```
├── app/
│   ├── layout.tsx                # Structure et SEO global (Inter Font, Meta tags)
│   ├── page.tsx                  # Page d'accueil (Hero, Services, Atouts)
│   ├── a-propos/
│   │   └── page.tsx              # Page À Propos
│   ├── services/
│   │   └── page.tsx              # Les 7 services détaillés
│   ├── realisations/
│   │   └── page.tsx              # Galerie filtrable Avant/Après
│   ├── devis/
│   │   └── page.tsx              # Formulaire multi-étapes sécurisé
│   ├── contact/
│   │   └── page.tsx              # Contacts officiels et carte
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx          # Authentification Supabase Admin
│   │   └── dashboard/
│   │       └── page.tsx          # Dashboard de gestion des devis
│   └── api/
│       └── devis/
│           └── route.ts          # Endpoint d'envoi de mail Resend
├── components/
│   ├── sections/
│   │   └── Hero.tsx              # Section Hero animée
│   ├── admin/
│   │   └── KpiCards.tsx          # 4 cartes d'indicateurs
│   ├── Header.tsx                # En-tête responsive
│   ├── Footer.tsx                # Pied de page informatif (avec lien admin)
│   └── WhatsAppButton.tsx        # Bouton flottant WhatsApp
├── lib/
│   ├── supabase.ts               # Initialisation Client Supabase
│   └── utils.ts                  # Utilitaire de classes Tailwind CSS (cn)
├── middleware.ts                 # Protection de la zone d'administration
├── supabase/
│   └── schema.sql                # Requêtes SQL de création de base de données
└── README.md                     # Documentation du projet
```

---

## 🔒 Sécurité & Performance

- **Protection contre le Spam** : Un champ de saisie invisible (Honeypot) est intégré dans le formulaire. Les robots de spam remplissant automatiquement tous les champs verront leur soumission bloquée immédiatement, allégeant la base de données.
- **Sécurité Supabase** : Aucune donnée de devis n'est lisible publiquement. Les requêtes `SELECT` sans jeton d'authentification valide échoueront systématiquement grâce aux règles RLS.
- **Optimisation Mobile First** : Tout le site est responsive et conçu en grille Tailwind flexible pour assurer un score Google PageSpeed > 90.
