'use client';

import type {
  Format,
  BaseHuile,
  AromeVape,
} from '@/types/config';
import { BASES_HUILE } from '@/data/bases-huile';
import { AROMES_VAPE } from '@/data/aromes-vape';

interface Step4PersonnalisationProps {
  flaconIndex: 1 | 2;
  format: Format;
  currentBase: BaseHuile | undefined;
  currentArome: AromeVape | undefined;
  onSelectBase: (b: BaseHuile) => void;
  onSelectArome: (a: AromeVape) => void;
  onBack: () => void;
  onNext: () => void;
}

export function Step4Personnalisation({
  flaconIndex,
  format,
  currentBase,
  currentArome,
  onSelectBase,
  onSelectArome,
  onBack,
  onNext,
}: Step4PersonnalisationProps) {
  const canProceed =
    format === 'huile' ? currentBase !== undefined : currentArome !== undefined;

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-smoke-400 mb-3">
        Flacon {flaconIndex} · Étape 4
      </p>
      <h2 className="font-serif text-3xl mb-2">
        {format === 'huile' ? "Votre base d'huile" : 'Votre arôme vape'}
      </h2>
      <p className="text-smoke-600 mb-8">
        {format === 'huile'
          ? "La base modifie la saveur en bouche et la texture, pas l'effet."
          : "L'arôme complète le profil terpénique du starter. La base vape est PG 100% (faible puissance)."}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {format === 'huile'
          ? BASES_HUILE.map((b) => {
              const selected = currentBase === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => onSelectBase(b.id)}
                  className={`text-left p-6 rounded-lg border-2 transition-all ${
                    selected
                      ? 'border-forest-500 bg-forest-50'
                      : 'border-bone-200 hover:border-forest-500/50 bg-white'
                  }`}
                  aria-pressed={selected}
                >
                  <p className="font-serif text-xl mb-2">{b.nom}</p>
                  <p className="text-sm text-smoke-600 mb-2">{b.descriptif}</p>
                  {b.surcout > 0 && (
                    <p className="text-xs text-smoke-400">
                      + {b.surcout} €
                    </p>
                  )}
                </button>
              );
            })
          : AROMES_VAPE.map((a) => {
              const selected = currentArome === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => onSelectArome(a.id)}
                  className={`text-left p-6 rounded-lg border-2 transition-all ${
                    selected
                      ? 'border-forest-500 bg-forest-50'
                      : 'border-bone-200 hover:border-forest-500/50 bg-white'
                  }`}
                  aria-pressed={selected}
                >
                  <p className="font-serif text-xl mb-2">{a.nom}</p>
                  <p className="text-sm text-smoke-600 mb-2">{a.descriptif}</p>
                  {a.surcout > 0 && (
                    <p className="text-xs text-smoke-400">
                      + {a.surcout} €
                    </p>
                  )}
                </button>
              );
            })}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-smoke-600 hover:text-carbon underline underline-offset-4"
        >
          ← Étape précédente
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="bg-forest-500 hover:bg-forest-900 disabled:bg-smoke-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          {flaconIndex === 1 ? 'Valider ce flacon →' : 'Vers le récap →'}
        </button>
      </div>
    </div>
  );
}
