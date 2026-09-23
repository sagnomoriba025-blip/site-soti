// app/admin/login/page.tsx
'use client';

// Force server-side rendering at request time — never pre-render statically.
export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, Loader2, ArrowLeft, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextRoute = searchParams.get('next') || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check if user is already authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push(nextRoute);
      }
    };
    checkUser();
  }, [router, nextRoute]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push(nextRoute);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Identifiants incorrects. Veuillez réessayer.';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A2540] flex flex-col justify-center items-center px-6 relative overflow-hidden text-white">
      {/* Decorative background orbits */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Logo and Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Retour au site public</span>
          </Link>
          <div className="pt-4 flex flex-col items-center">
            <span className="text-4xl font-black tracking-wider text-white leading-none">
              SoTI
            </span>
            <span className="text-[10px] tracking-widest text-blue-400 font-bold uppercase mt-1">
              Portail Administratif
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Connexion</h2>
            <p className="text-xs text-slate-400">Accès restreint au personnel habilité</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-slate-200">
            {errorMsg && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs flex items-start gap-2.5">
                <ShieldAlert className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1">
                Adresse e-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="admin@soti-guinee.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-slate-950/40 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-white/10 bg-slate-950/40 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-350 focus:outline-none"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-blue-500/10 transition-all duration-200 flex justify-center items-center disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authentification...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>

        <div className="text-center text-[10px] text-slate-500">
          Système sécurisé par chiffrement de bout en bout • Supabase Guard
        </div>

      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A2540] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    }>
      <AdminLoginContent />
    </Suspense>
  );
}
