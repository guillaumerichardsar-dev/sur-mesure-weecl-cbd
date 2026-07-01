'use client';

import type { StarterId } from '@/types/config';
import { STARTERS } from '@/data/starters';

interface Step1BesoinProps {
  flaconIndex: 1 | 2;
  currentStarterId: StarterId | undefined;
  onSelect: (id: StarterId) => void;
  onNext: () => void;
}

export function Step1Besoin({
  flaconIndex,
  currentStarterId,
  onSelect,
  onNext,
}: Step1BesoinProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-smoke-400 mb-3">
        Flacon {flaconIndex} · Étape 1
      </p>
      <h2 className="font-serif text-3xl mb-2">Qu&apos;est-ce qui vous amène ?</h2>
      <p className="text-smoke-600 mb-8">
        Chaque starter est une recette signature formulée par notre équipe
        scientifique. Vous ajusterez son intensité, sa forme et son goût aux
        étapes suivantes.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STARTERS.map((s) => {
          const selected = currentStarterId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className={`text-left p-6 rounded-lg border-2 transition-all ${
                selected
                  ? 'border-forest-500 bg-forest-50'
                  : 'border-bone-200 hover:border-forest-500/50 bg-white'
              }`}
              aria-pressed={selected}
            >
              <div className="text-3xl mb-2">{s.emoji}</div>
              <p className="font-serif text-xl mb-1">{s.nom}</p>
              <p className="text-sm text-smoke-600 mb-3">{s.besoin}</p>
              <p className="text-xs text-smoke-400 leading-relaxed">
                {s.descriptionSensorielle}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!currentStarterId}
          className="bg-forest-500 hover:bg-forest-900 disabled:bg-smoke-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Étape suivante →
        </button>
      </div>
    </div>
  );
}
