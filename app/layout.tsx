import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ThemeProvider } from '@/components/ThemeProvider';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SoTI - Société de Technologies & Ingénierie | Guinée',
  description: 'SoTI (Société de Technologies & Ingénierie) est votre partenaire technologique de confiance à Conakry, Guinée. Spécialiste B2B en Réseaux Informatiques, Fibre Optique, Télécoms, Énergie Solaire, Électricité et Génie Civil.',
  keywords: 'SoTI, Société de Technologies et Ingénierie, Conakry, Guinée, BTP, Fibre optique, Réseaux informatiques, Télécoms, Énergie solaire, Électricité bâtiment, Vidéosurveillance, Maintenance informatique',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.soti-guinee.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SoTI - Société de Technologies & Ingénierie | Guinée',
    description: 'Expertise B2B en infrastructures réseaux, télécoms, solaire, vidéosurveillance et BTP en Guinée. Votre Partenaire Technologique de Confiance.',
    url: '/',
    siteName: 'SoTI Guinée',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {}
          })();
        `}} />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
