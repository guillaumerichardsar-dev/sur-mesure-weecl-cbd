'use client';

import { useReducer } from 'react';
import {
  wizardReducer,
  initialWizardState,
} from '@/lib/wizard-reducer';
import type { StarterId } from '@/types/config';
import { Stepper } from './Stepper';
import { Step1Besoin } from './Step1Besoin';

export function Wizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialWizardState);

  const flaconIndex: 1 | 2 =
    state.step.startsWith('flacon2') ? 2 : 1;
  const currentFlacon =
    flaconIndex === 1 ? state.flacon1 : state.flacon2 ?? {};

  return (
    <div>
      <Stepper step={state.step} />
      <section className="bg-white border border-bone-200 rounded-lg p-8 shadow-card">
        {(state.step === 'flacon1-besoin' ||
          state.step === 'flacon2-besoin') && (
          <Step1Besoin
            flaconIndex={flaconIndex}
            currentStarterId={
              (currentFlacon as { starterId?: StarterId }).starterId
            }
            onSelect={(id) =>
              dispatch({ type: 'SET_STARTER', flaconIndex, starterId: id })
            }
            onNext={() =>
              dispatch({
                type: 'GO_TO_STEP',
                step:
                  flaconIndex === 1
                    ? 'flacon1-intensite'
                    : 'flacon2-intensite',
              })
            }
          />
        )}

        {state.step !== 'flacon1-besoin' &&
          state.step !== 'flacon2-besoin' && (
            <p className="text-smoke-600">
              Étape <em>{state.step}</em> — implémentée aux tasks suivantes.
            </p>
          )}
      </section>
    </div>
  );
}
