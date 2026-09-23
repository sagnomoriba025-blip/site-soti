// components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ArrowRight, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/a-propos' },
    { name: 'Services', path: '/services' },
    { name: 'Réalisations', path: '/realisations' },
    { name: 'Contact', path: '/contact' },
  ];

  const isDarkMode = pathname !== '/devis';

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center space-x-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/logo-soti.svg" 
            alt="Logo SoTI - Société de Technologies & Ingénierie" 
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-blue-500',
                  isActive
                    ? 'text-blue-500'
                    : scrolled || isDarkMode
                    ? 'text-slate-300'
                    : 'text-slate-700 dark:text-slate-300'
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <a
              href="tel:+224624900424"
              className={cn(
                'flex items-center text-xs font-bold transition-colors duration-200 hover:text-blue-500',
                scrolled || isDarkMode ? 'text-slate-300' : 'text-slate-700 dark:text-slate-300'
              )}
            >
              <Phone className="h-4 w-4 mr-2 text-blue-500 animate-pulse" />
              +224 624 900 424
          </a>

          {/* Theme Toggle (Desktop) */}
          {mounted ? (
            <button
              onClick={toggleTheme}
              className={cn(
                'p-2 rounded-lg border transition-all duration-300 hover:scale-110 active:scale-95',
                scrolled || isDarkMode
                  ? 'border-white/10 hover:bg-white/10 text-slate-300 hover:text-white'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
              )}
              aria-label="Changer de thème"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>
          ) : (
            <div className="w-8 h-8" />
          )}

          <Link
            href="/devis"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors duration-200 group"
          >
            Devis Gratuit
            <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Theme Toggle (Mobile) */}
          {mounted ? (
            <button
              onClick={toggleTheme}
              className={cn(
                'p-2 rounded-lg border transition-all duration-300',
                scrolled || isDarkMode
                  ? 'border-white/10 hover:bg-white/10 text-slate-300 hover:text-white'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
              )}
              aria-label="Changer de thème"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>
          ) : (
            <div className="w-8 h-8" />
          )}

          <Link
            href="/devis"
            className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded"
          >
            Devis
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
              scrolled || isDarkMode ? 'text-white' : 'text-slate-900 dark:text-white'
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          'fixed inset-0 top-[60px] z-40 bg-slate-950/95 backdrop-blur-lg md:hidden transition-all duration-300 transform',
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        )}
      >
        <div className="flex flex-col h-full justify-between p-6">
          <nav className="flex flex-col space-y-6 pt-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    'text-lg font-bold tracking-wide border-b border-white/5 pb-2',
                    isActive ? 'text-blue-400' : 'text-slate-300'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/devis"
              className={cn(
                'text-lg font-bold tracking-wide border-b border-white/5 pb-2',
                pathname === '/devis' ? 'text-blue-400' : 'text-slate-300'
              )}
            >
              Demander un Devis
            </Link>
          </nav>

          <div className="space-y-4 pb-12">
            {/* Theme Toggle inside Mobile Drawer */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-3 bg-white/5 rounded border border-white/10 text-slate-300 font-bold text-sm"
              >
                <span>Mode {theme === 'dark' ? 'Clair' : 'Sombre'}</span>
                {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <a
              href="tel:+224614900424"
              className="flex items-center text-slate-300 font-bold justify-center p-3 bg-white/5 rounded border border-white/10"
            >
              <Phone className="h-5 w-5 mr-3 text-blue-400" />
              Appeler le +224 614 900 424
            </a>
            <div className="text-center text-xs text-slate-500">
              sotiguineepro@gmail.com • Conakry, Guinée
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
