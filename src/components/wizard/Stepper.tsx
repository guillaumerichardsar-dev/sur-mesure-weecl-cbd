'use client';

import type { WizardStep } from '@/types/config';

interface StepperProps {
  step: WizardStep;
}

const FLACON1_STEPS: WizardStep[] = [
  'flacon1-besoin',
  'flacon1-intensite',
  'flacon1-format',
  'flacon1-personnalisation',
];

const FLACON2_STEPS: WizardStep[] = [
  'flacon2-besoin',
  'flacon2-intensite',
  'flacon2-format',
  'flacon2-personnalisation',
];

export function Stepper({ step }: StepperProps) {
  const isFlacon1 = FLACON1_STEPS.includes(step);
  const isFlacon2 = FLACON2_STEPS.includes(step);
  const isBridge = step === 'bridge';
  const isRecap = step === 'recap';

  let label = '';
  let indexInFlacon = 0;
  if (isFlacon1) {
    label = 'Flacon 1';
    indexInFlacon = FLACON1_STEPS.indexOf(step) + 1;
  } else if (isFlacon2) {
    label = 'Flacon 2';
    indexInFlacon = FLACON2_STEPS.indexOf(step) + 1;
  } else if (isBridge) {
    label = 'Ajouter un flacon ?';
  } else if (isRecap) {
    label = 'Récapitulatif';
  }

  return (
    <nav
      aria-label="Progression du configurateur"
      className="mb-10 flex items-center gap-4 text-sm text-smoke-600"
    >
      <span className="font-medium text-carbon">{label}</span>
      {(isFlacon1 || isFlacon2) && (
        <span className="text-smoke-400">Étape {indexInFlacon} / 4</span>
      )}
      {(isBridge || isRecap) && (
        <span className="text-smoke-400">
          {isBridge ? 'Choix flacon complémentaire' : 'Vérification'}
        </span>
      )}
    </nav>
  );
}
