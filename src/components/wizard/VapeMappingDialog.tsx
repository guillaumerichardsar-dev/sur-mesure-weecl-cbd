'use client';

import type {
  ConcentrationHuile,
  ConcentrationVape,
} from '@/types/config';
import { MAPPING_HUILE_VERS_VAPE } from '@/data/pricing-table';

interface VapeMappingDialogProps {
  open: boolean;
  concentrationHuile: ConcentrationHuile;
  onAccept: (concentrationVape: ConcentrationVape) => void;
  onCancel: () => void;
}

export function VapeMappingDialog({
  open,
  concentrationHuile,
  onAccept,
  onCancel,
}: VapeMappingDialogProps) {
  if (!open) return null;
  const suggestion = MAPPING_HUILE_VERS_VAPE[concentrationHuile];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mapping-title"
    >
      <div className="bg-white rounded-lg max-w-md p-8 shadow-lg">
        <h3
          id="mapping-title"
          className="font-serif text-2xl mb-3"
        >
          Ajuster l&apos;intensité pour le vape
        </h3>
        <p className="text-smoke-600 mb-6">
          En vape, la biodisponibilité pulmonaire est 3 à 5 fois plus élevée
          qu&apos;en sublingual. Vous aviez choisi{' '}
          <strong>{concentrationHuile}%</strong> — nous vous suggérons{' '}
          <strong>{suggestion}%</strong> en vape (équivalent d&apos;effet
          perçu).
        </p>
        <p className="text-xs text-smoke-400 mb-6">
          Le vape est plafonné à 10% dans cette version pour votre sécurité.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-smoke-600 hover:text-carbon"
          >
            Rester sur huile
          </button>
          <button
            type="button"
            onClick={() => onAccept(suggestion)}
            className="bg-forest-500 hover:bg-forest-900 text-white px-5 py-2.5 rounded-md text-sm font-medium"
          >
            Adapter en vape {suggestion}%
          </button>
        </div>
      </div>
    </div>
  );
}
