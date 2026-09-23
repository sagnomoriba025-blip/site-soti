// components/DevisForm.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, ShieldCheck, Mail, Phone, User } from 'lucide-react';
import Link from 'next/link';

const devisSchema = zod.object({
  client_name: zod.string().min(3, 'Le nom complet est obligatoire (min 3 caractères).'),
  client_email: zod.string().email('Veuillez entrer une adresse e-mail valide.'),
  client_phone: zod.string().min(8, 'Le numéro de téléphone est requis (min 8 chiffres).'),
  company_name: zod.string().optional(),
  client_type: zod.string().min(1, "Veuillez sélectionner le type d'entité."),
  service_requested: zod.string().min(1, 'Veuillez choisir un service principal.'),
  project_description: zod.string().min(15, 'La description doit faire au moins 15 caractères pour étude.'),
  budget_estimate: zod.string().optional(),
  spam_honeypot: zod.string().optional(),
});

type DevisFormValues = zod.infer<typeof devisSchema>;

function DevisFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialService = searchParams.get('service') || '';

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<DevisFormValues>({
    resolver: zodResolver(devisSchema),
    defaultValues: {
      client_name: '',
      client_email: '',
      client_phone: '',
      company_name: '',
      client_type: '',
      service_requested: initialService,
      project_description: '',
      budget_estimate: '',
      spam_honeypot: '',
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (initialService) {
      setValue('service_requested', initialService);
    }
  }, [initialService, setValue]);

  const handleNextStep = async () => {
    let fieldsToValidate: Array<keyof DevisFormValues> = [];
    if (step === 1) {
      fieldsToValidate = ['client_name', 'client_email', 'client_phone', 'company_name'];
    } else if (step === 2) {
      fieldsToValidate = ['client_type', 'service_requested', 'project_description'];
    }
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep((prev) => prev + 1);
  };

  const onSubmit = async (data: DevisFormValues) => {
    setIsSubmitting(true);
    setSubmitError('');

    if (data.spam_honeypot && data.spam_honeypot.trim() !== '') {
      setTimeout(() => { setIsSubmitting(false); setSubmitSuccess(true); }, 1000);
      return;
    }

    try {
      const { error: dbError } = await supabase.from('devis').insert([{
        client_name: data.client_name,
        client_email: data.client_email,
        client_phone: data.client_phone,
        company_name: data.company_name || null,
        client_type: data.client_type,
        service_requested: data.service_requested,
        project_description: data.project_description,
        budget_estimate: data.budget_estimate || 'Non spécifié',
      }]);

      if (dbError) throw dbError;

      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.warn('API devis notification failed, but DB record was saved.');
      }

      setSubmitSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {submitSuccess ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-8 sm:p-12 text-center shadow-xl space-y-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto shadow">
            <CheckCircle2 className="h-10 w-10 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Demande reçue !</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
              Merci {formValues.client_name}. Votre demande de devis pour <strong>{formValues.service_requested}</strong> a été enregistrée. Nos ingénieurs vous recontacteront sous 48h.
            </p>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded text-xs transition-colors">
              Retour à l&apos;accueil
            </Link>
            <button onClick={() => { setSubmitSuccess(false); setStep(1); router.push('/devis'); }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-xs transition-colors">
              Faire une autre demande
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          
          <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Demander un Devis Professionnel</h2>
              <p className="text-slate-400 text-[10px] mt-0.5">SoTI Guinée - Étude technique sous 48h</p>
            </div>
            <span className="text-xs font-mono text-blue-400 font-bold bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
              Étape {step} sur 3
            </span>
          </div>

          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            
            {/* Honeypot spam trap */}
            <div className="hidden" aria-hidden="true">
              <input type="text" autoComplete="off" {...register('spam_honeypot')} />
            </div>

            {submitError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-xs leading-relaxed">
                {submitError}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">1. Coordonnées &amp; Identité</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Nom complet *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <input type="text" placeholder="Ex: Diallo Ibrahima" {...register('client_name')}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  {errors.client_name && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.client_name.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">E-mail *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <input type="email" placeholder="nom@entreprise.com" {...register('client_email')}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    {errors.client_email && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.client_email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Téléphone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <input type="tel" placeholder="+224 614 900 424" {...register('client_phone')}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    {errors.client_phone && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.client_phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Nom de l&apos;entreprise (Optionnel)</label>
                  <input type="text" placeholder="Ex: Banque Centrale S.A." {...register('company_name')}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">2. Descriptif du Projet</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Profil d&apos;activité *</label>
                    <select {...register('client_type')}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option value="">Sélectionner...</option>
                      <option value="Banque">Banque / Institution financière</option>
                      <option value="Entreprise">Entreprise / PME / Industrie</option>
                      <option value="Administration">Administration Publique</option>
                      <option value="École">Université / École</option>
                      <option value="Hôpital">Hôpital / Clinique</option>
                      <option value="ONG">ONG / International</option>
                      <option value="Hôtel">Hôtel / Résidence hôtelière</option>
                      <option value="Particulier">Particulier Haut de Gamme</option>
                    </select>
                    {errors.client_type && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.client_type.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Service Demandé *</label>
                    <select {...register('service_requested')}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option value="">Sélectionner...</option>
                      <option value="Réseaux Informatiques">Réseaux Informatiques (Fibre, Baies)</option>
                      <option value="Télécommunications">Télécommunications (PABX, Interphone)</option>
                      <option value="Énergie Solaire">Énergie Solaire (Étude, Batteries)</option>
                      <option value="Électricité Bâtiment">Électricité Bâtiment</option>
                      <option value="Vidéosurveillance">Vidéosurveillance (IP 4K, NVR)</option>
                      <option value="BTP & Génie Civil">BTP &amp; Génie Civil</option>
                      <option value="Maintenance Informatique">Maintenance Informatique</option>
                      <option value="Vente de Matériels">Vente de Matériels &amp; Équipements</option>
                    </select>
                    {errors.service_requested && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.service_requested.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Description des travaux *</label>
                  <textarea rows={5} placeholder="Décrivez votre besoin technique..." {...register('project_description')}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  {errors.project_description && <p className="text-red-500 text-[11px] mt-1 font-semibold">{errors.project_description.message}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">3. Enveloppe Budgétaire &amp; Validation</h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Budget Prévu (Optionnel)</label>
                    <select {...register('budget_estimate')}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option value="">Sélectionner...</option>
                      <option value="Moins de 5 000 USD">Moins de 5 000 USD</option>
                      <option value="5 000 - 15 000 USD">5 000 - 15 000 USD</option>
                      <option value="15 000 - 50 000 USD">15 000 - 50 000 USD</option>
                      <option value="Plus de 50 000 USD">Plus de 50 000 USD</option>
                      <option value="Non fixé">Budget non encore arrêté</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800 text-xs space-y-2">
                  <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider pb-1.5 border-b border-slate-200/50 dark:border-slate-800">Récapitulatif</h4>
                  <p><span className="text-slate-400 font-medium">Demandeur :</span> <strong className="text-slate-800 dark:text-slate-200">{formValues.client_name}</strong></p>
                  <p><span className="text-slate-400 font-medium">Service :</span> <strong className="text-blue-600 dark:text-blue-400">{formValues.service_requested}</strong></p>
                  <p className="line-clamp-2"><span className="text-slate-400 font-medium">Descriptif :</span> {formValues.project_description}</p>
                </div>

                <div className="p-3 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-lg flex items-start text-[11px] text-slate-500 leading-relaxed font-normal">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span>Vos informations restent strictement confidentielles et ne seront jamais transmises à des tiers.</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
              {step > 1 ? (
                <button type="button" onClick={() => setStep((prev) => prev - 1)}
                  className="inline-flex items-center justify-center px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded text-xs transition-colors">
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Précédent
                </button>
              ) : <div />}

              {step < 3 ? (
                <button type="button" onClick={handleNextStep}
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 hover:bg-blue-700 text-white font-bold rounded text-xs transition-colors">
                  Suivant
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black rounded text-xs shadow-lg transition-colors disabled:opacity-50">
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Traitement...</>
                  ) : (
                    <><CheckCircle2 className="mr-1.5 h-4 w-4" />Confirmer et Envoyer</>
                  )}
                </button>
              )}
            </div>

          </form>
        </div>
      )}
    </>
  );
}

export default function DevisForm() {
  return (
    <Suspense fallback={
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-8 sm:p-12 text-center shadow-xl">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
        <p className="text-xs text-slate-400 mt-4">Chargement du formulaire...</p>
      </div>
    }>
      <DevisFormContent />
    </Suspense>
  );
}
