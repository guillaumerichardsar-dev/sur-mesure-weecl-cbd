'use client';

import { useState } from 'react';
import type {
  Format,
  StarterId,
  ConcentrationHuile,
  ConcentrationVape,
} from '@/types/config';
import { getStarter } from '@/data/starters';
import { MAPPING_HUILE_VERS_VAPE } from '@/data/pricing-table';
import { VapeMappingDialog } from './VapeMappingDialog';

interface Step3FormatProps {
  flaconIndex: 1 | 2;
  starterId: StarterId;
  currentConcentration: ConcentrationHuile;
  currentFormat: Format | undefined;
  onSelectFormat: (
    format: Format,
    concentrationOverride?: ConcentrationVape
  ) => void;
  onBack: () => void;
  onNext: () => void;
}

export function Step3Format({
  flaconIndex,
  starterId,
  currentConcentration,
  currentFormat,
  onSelectFormat,
  onBack,
  onNext,
}: Step3FormatProps) {
  const starter = getStarter(starterId);
  const vapeDisponible = starter?.disponibleVape ?? false;
  const [showMappingDialog, setShowMappingDialog] = useState(false);

  function handleSelectVape() {
    if (!vapeDisponible) return;
    // Si concentration > 10 en huile → on propose le mapping via dialog
    if (currentConcentration >= 15) {
      setShowMappingDialog(true);
      return;
    }
    const cVape = MAPPING_HUILE_VERS_VAPE[currentConcentration];
    onSelectFormat('vape', cVape);
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-smoke-400 mb-3">
        Flacon {flaconIndex} · Étape 3
      </p>
      <h2 className="font-serif text-3xl mb-2">Comment vous voulez la vivre ?</h2>
      <p className="text-smoke-600 mb-8">
        Deux formats possibles selon votre rythme et vos rituels.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onSelectFormat('huile')}
          className={`text-left p-6 rounded-lg border-2 transition-all ${
            currentFormat === 'huile'
              ? 'border-forest-500 bg-forest-50'
              : 'border-bone-200 hover:border-forest-500/50 bg-white'
          }`}
          aria-pressed={currentFormat === 'huile'}
        >
          <p className="font-serif text-xl mb-2">Huile sublinguale 30ml</p>
          <p className="text-sm text-smoke-600 mb-2">
            Cure d&apos;environ 90 jours. Effet en 20-45 min, dure 4-6h à
            plateau.
          </p>
          <p className="text-xs text-smoke-400">
            Application ritualisée matin/soir avec spray sublingual.
          </p>
        </button>

        <button
          type="button"
          onClick={handleSelectVape}
          disabled={!vapeDisponible}
          className={`text-left p-6 rounded-lg border-2 transition-all ${
            currentFormat === 'vape'
              ? 'border-forest-500 bg-forest-50'
              : vapeDisponible
                ? 'border-bone-200 hover:border-forest-500/50 bg-white'
                : 'border-bone-200 bg-bone-100 opacity-60 cursor-not-allowed'
          }`}
          aria-pressed={currentFormat === 'vape'}
        >
          <p className="font-serif text-xl mb-2">Vape 30ml PG pur</p>
          <p className="text-sm text-smoke-600 mb-2">
            Effet en 3-10 min, dure 45-90 min. Vape pure ou en additif
            dans votre e-liquide traditionnel.
          </p>
          <p className="text-xs text-smoke-400">
            Faible puissance uniquement. Vous devez déjà avoir un
            dispositif de vape (non fourni).
          </p>
          {!vapeDisponible && (
            <p className="text-xs text-alert-500 mt-3 font-medium">
              Non disponible pour ce starter en V0.
            </p>
          )}
        </button>
      </div>

      <VapeMappingDialog
        open={showMappingDialog}
        concentrationHuile={currentConcentration}
        onAccept={(cVape) => {
          setShowMappingDialog(false);
          onSelectFormat('vape', cVape);
        }}
        onCancel={() => {
          setShowMappingDialog(false);
          onSelectFormat('huile');
        }}
      />

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
          disabled={!currentFormat}
          className="bg-forest-500 hover:bg-forest-900 disabled:bg-smoke-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Étape suivante →
        </button>
      </div>
    </div>
  );
}
