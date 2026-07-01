'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Flacon, Contact } from '@/types/config';
import { getStarter } from '@/data/starters';
import { calculerTotalCommande, calculerPrixFlacon } from '@/lib/pricing';

interface RecapProps {
  flacons: Flacon[];
  contact: Partial<Contact>;
  onUpdateContact: (c: Partial<Contact>) => void;
  onBack: () => void;
}

function labelFlacon(f: Flacon): string {
  const starter = getStarter(f.starterId);
  const nom = starter?.nom ?? '';
  if (f.format === 'huile') {
    return `Huile 30ml · ${nom} · ${f.concentration}% · Base ${f.baseHuile}`;
  }
  return `Vape 30ml · ${nom} · ${f.concentration}% · Arôme ${f.aromeVape}`;
}

export function Recap({
  flacons,
  contact,
  onUpdateContact,
  onBack,
}: RecapProps) {
  const totals = calculerTotalCommande(flacons);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  const isValid =
    (contact.nom ?? '').trim().length > 0 &&
    (contact.email ?? '').trim().length > 0 &&
    contact.ageConfirmed === true &&
    contact.rgpdConsent === true;

  async function handleSubmit() {
    if (!isValid) return;
    setSubmitting(true);
    setErreur(null);
    try {
      const res = await fetch('/api/submit-mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flacons, contact, totals }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      router.push('/merci');
    } catch (e) {
      setErreur(e instanceof Error ? e.message : 'Erreur inconnue');
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="font-serif text-3xl mb-6">Récapitulatif</h2>

      <div className="space-y-3 mb-8">
        {flacons.map((f, i) => (
          <div
            key={i}
            className="p-5 border border-bone-200 rounded-lg bg-white flex items-center justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-smoke-400 mb-1">
                Flacon {i + 1}
              </p>
              <p className="font-medium">{labelFlacon(f)}</p>
            </div>
            <p className="font-serif text-xl">
              {calculerPrixFlacon(f)} €
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-bone-200 pt-6 mb-8 space-y-1">
        <div className="flex justify-between text-sm">
          <span>Sous-total</span>
          <span>{totals.sousTotal} €</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>
            Frais de port {totals.fraisPort === 0 && '(offerts dès 89€)'}
          </span>
          <span>{totals.fraisPort === 0 ? 'OFFERTS' : `${totals.fraisPort} €`}</span>
        </div>
        <div className="flex justify-between font-serif text-2xl pt-3 mt-3 border-t border-bone-200">
          <span>Total TTC</span>
          <span>{totals.total} €</span>
        </div>
      </div>

      <section className="space-y-4 mb-8">
        <h3 className="font-serif text-xl">Vos coordonnées</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm block mb-1">Nom *</span>
            <input
              type="text"
              value={contact.nom ?? ''}
              onChange={(e) => onUpdateContact({ nom: e.target.value })}
              required
              className="w-full border border-bone-200 rounded-md px-4 py-3 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm block mb-1">Email *</span>
            <input
              type="email"
              value={contact.email ?? ''}
              onChange={(e) => onUpdateContact({ email: e.target.value })}
              required
              className="w-full border border-bone-200 rounded-md px-4 py-3 text-sm"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm block mb-1">Téléphone (facultatif)</span>
            <input
              type="tel"
              value={contact.telephone ?? ''}
              onChange={(e) =>
                onUpdateContact({ telephone: e.target.value })
              }
              className="w-full border border-bone-200 rounded-md px-4 py-3 text-sm"
            />
          </label>
        </div>

        <label className="flex items-start gap-3 text-xs text-smoke-600">
          <input
            type="checkbox"
            checked={contact.ageConfirmed === true}
            onChange={(e) =>
              onUpdateContact({ ageConfirmed: e.target.checked })
            }
            required
            className="mt-1"
          />
          <span>
            J&apos;ai plus de 18 ans et je comprends que ces produits ne se
            substituent pas à une consultation médicale.
          </span>
        </label>

        <label className="flex items-start gap-3 text-xs text-smoke-600">
          <input
            type="checkbox"
            checked={contact.rgpdConsent === true}
            onChange={(e) =>
              onUpdateContact({ rgpdConsent: e.target.checked })
            }
            required
            className="mt-1"
          />
          <span>
            J&apos;accepte que WEECL traite mes données pour répondre à ma
            demande (prototype — aucune commande réelle enregistrée).
          </span>
        </label>
      </section>

      {erreur && (
        <p className="text-alert-500 text-sm mb-4">Erreur : {erreur}</p>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-smoke-600 hover:text-carbon underline underline-offset-4"
        >
          ← Modifier ma configuration
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          className="bg-forest-500 hover:bg-forest-900 disabled:bg-smoke-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-md font-medium transition-colors"
        >
          {submitting ? 'Envoi…' : 'Envoyer ma demande de devis →'}
        </button>
      </div>
    </div>
  );
}
