'use client';

import { useReducer } from 'react';
import {
  wizardReducer,
  initialWizardState,
  type WizardAction,
} from '@/lib/wizard-reducer';
import { Stepper } from './Stepper';

export function Wizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialWizardState);

  return (
    <div>
      <Stepper step={state.step} />
      <section className="bg-white border border-bone-200 rounded-lg p-8 shadow-card">
        <h2 className="font-serif text-3xl mb-4">
          Wizard step : <em>{state.step}</em>
        </h2>
        <p className="text-smoke-600">
          Le contenu des étapes sera implémenté dans les tasks suivantes.
        </p>
        <button
          className="mt-6 bg-forest-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch({ type: 'RESET' } satisfies WizardAction)}
        >
          Reset
        </button>
      </section>
    </div>
  );
}
