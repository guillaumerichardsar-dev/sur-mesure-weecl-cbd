'use client';

import type { ConcentrationHuile, StarterId } from '@/types/config';
import { getStarter } from '@/data/starters';

interface Step2IntensiteProps {
  flaconIndex: 1 | 2;
  starterId: StarterId;
  currentConcentration: ConcentrationHuile | undefined;
  onSelect: (c: ConcentrationHuile) => void;
  onBack: () => void;
  onNext: () => void;
}

const LABELS: Record<ConcentrationHuile, string> = {
  5: 'Légère',
  10: 'Standard',
  15: 'Forte',
  20: 'Maximale',
};

const HINTS: Record<ConcentrationHuile, string> = {
  5: 'Pour découvrir, pour usage occasionnel',
  10: 'L’intensité la plus demandée',
  15: 'Pour utilisateurs réguliers',
  20: 'Pour besoin spécifique récurrent',
};

export function Step2Intensite({
  flaconIndex,
  starterId,
  currentConcentration,
  onSelect,
  onBack,
  onNext,
}: Step2IntensiteProps) {
  const starter = getStarter(starterId);
  const concentrations: ConcentrationHuile[] = starter?.concentrationsHuile ?? [
    5, 10, 15, 20,
  ];

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-smoke-400 mb-3">
        Flacon {flaconIndex} · Étape 2
      </p>
      <h2 className="font-serif text-3xl mb-2">Quelle intensité ?</h2>
      <p className="text-smoke-600 mb-8">
        La concentration s&apos;exprime en pourcentage de cannabinoïdes totaux.
        Ce choix s&apos;exprime pour votre huile ; en vape, nous adapterons
        automatiquement à l&apos;étape suivante (biodisponibilité pulmonaire
        3 à 5 fois plus élevée qu&apos;en sublingual).
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {concentrations.map((c) => {
          const selected = currentConcentration === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => onSelect(c)}
              className={`text-left p-5 rounded-lg border-2 transition-all ${
                selected
                  ? 'border-forest-500 bg-forest-50'
                  : 'border-bone-200 hover:border-forest-500/50 bg-white'
              }`}
              aria-pressed={selected}
            >
              <p className="font-serif text-2xl mb-1">{c}%</p>
              <p className="text-sm font-medium">{LABELS[c]}</p>
              <p className="text-xs text-smoke-600 mt-1">{HINTS[c]}</p>
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
          disabled={currentConcentration === undefined}
          className="bg-forest-500 hover:bg-forest-900 disabled:bg-smoke-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Étape suivante →
        </button>
      </div>
    </div>
  );
}
