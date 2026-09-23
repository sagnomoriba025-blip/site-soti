// components/ContactForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { supabase } from '@/lib/supabase';
import { Mail, User, Info, MessageSquare, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

const contactSchema = zod.object({
  client_name: zod.string().min(3, 'Le nom complet est obligatoire (min 3 caractères).'),
  client_email: zod.string().email('Veuillez entrer une adresse e-mail valide.'),
  subject: zod.string().min(3, 'Le sujet est obligatoire (min 3 caractères).'),
  message: zod.string().min(10, 'Le message doit contenir au moins 10 caractères.'),
  spam_honeypot: zod.string().optional(),
});

type ContactFormValues = zod.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      client_name: '',
      client_email: '',
      subject: '',
      message: '',
      spam_honeypot: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError('');

    // Honeypot spam trap check
    if (data.spam_honeypot && data.spam_honeypot.trim() !== '') {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        reset();
      }, 1000);
      return;
    }

    try {
      // 1. Insert into Supabase messages table
      const { error: dbError } = await supabase.from('messages').insert([
        {
          client_name: data.client_name,
          client_email: data.client_email,
          subject: data.subject,
          message: data.message,
        },
      ]);

      if (dbError) throw dbError;

      // 2. Call the Resend alert API
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.warn('API message notification failed, but DB record was saved.');
      }

      setSubmitSuccess(true);
      reset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Envoyez-nous un Message</h3>
        <p className="text-xs text-slate-400 mt-1">
          Une réponse technique ou commerciale vous sera apportée sous 24h.
        </p>
      </div>

      {submitSuccess ? (
        <div className="p-8 text-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Message envoyé avec succès !</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Merci pour votre message. Nos équipes d&apos;ingénierie et d&apos;affaires l&apos;étudient avec attention et vous recontacteront rapidement.
            </p>
          </div>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="inline-flex items-center justify-center px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded text-xs transition-colors"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Honeypot spam trap */}
          <div className="hidden" aria-hidden="true">
            <input type="text" autoComplete="off" {...register('spam_honeypot')} />
          </div>

          {submitError && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-xs flex items-start gap-2">
              <AlertTriangle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Nom complet *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ex: Ibrahima Diallo"
                  {...register('client_name')}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              {errors.client_name && (
                <p className="text-red-500 text-[11px] mt-1 font-semibold">
                  {errors.client_name.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Adresse e-mail *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="nom@entreprise.com"
                  {...register('client_email')}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              {errors.client_email && (
                <p className="text-red-500 text-[11px] mt-1 font-semibold">
                  {errors.client_email.message}
                </p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Sujet de votre message *
            </label>
            <div className="relative">
              <Info className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Ex: Demande de partenariat / Audit réseau"
                {...register('subject')}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {errors.subject && (
              <p className="text-red-500 text-[11px] mt-1 font-semibold">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Votre Message *
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <textarea
                rows={5}
                placeholder="Détaillez votre besoin ou votre question technique..."
                {...register('message')}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {errors.message && (
              <p className="text-red-500 text-[11px] mt-1 font-semibold">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow hover:shadow-blue-500/10 transition-all duration-200 flex justify-center items-center disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              'Envoyer le Message'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
