'use client';

import { useReducer } from 'react';
import {
  wizardReducer,
  initialWizardState,
} from '@/lib/wizard-reducer';
import type {
  AromeVape,
  BaseHuile,
  ConcentrationHuile,
  Flacon,
  Format,
  StarterId,
} from '@/types/config';
import { Stepper } from './Stepper';
import { Step1Besoin } from './Step1Besoin';
import { Step2Intensite } from './Step2Intensite';
import { Step3Format } from './Step3Format';
import { Step4Personnalisation } from './Step4Personnalisation';
import { BridgeAjoutFlacon } from './BridgeAjoutFlacon';

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

        {(state.step === 'flacon1-intensite' ||
          state.step === 'flacon2-intensite') && (
          <Step2Intensite
            flaconIndex={flaconIndex}
            starterId={
              (currentFlacon as { starterId: StarterId }).starterId
            }
            currentConcentration={
              (currentFlacon as { concentration?: ConcentrationHuile })
                .concentration
            }
            onSelect={(c) =>
              dispatch({
                type: 'SET_CONCENTRATION',
                flaconIndex,
                concentration: c,
              })
            }
            onBack={() =>
              dispatch({
                type: 'GO_TO_STEP',
                step:
                  flaconIndex === 1 ? 'flacon1-besoin' : 'flacon2-besoin',
              })
            }
            onNext={() =>
              dispatch({
                type: 'GO_TO_STEP',
                step:
                  flaconIndex === 1 ? 'flacon1-format' : 'flacon2-format',
              })
            }
          />
        )}

        {(state.step === 'flacon1-format' ||
          state.step === 'flacon2-format') && (
          <Step3Format
            flaconIndex={flaconIndex}
            starterId={
              (currentFlacon as { starterId: StarterId }).starterId
            }
            currentConcentration={
              (currentFlacon as { concentration: ConcentrationHuile })
                .concentration
            }
            currentFormat={
              (currentFlacon as { format?: Format }).format
            }
            onSelectFormat={(format, concentrationOverride) => {
              dispatch({ type: 'SET_FORMAT', flaconIndex, format });
              if (concentrationOverride !== undefined) {
                dispatch({
                  type: 'SET_CONCENTRATION',
                  flaconIndex,
                  concentration: concentrationOverride,
                });
              }
            }}
            onBack={() =>
              dispatch({
                type: 'GO_TO_STEP',
                step:
                  flaconIndex === 1
                    ? 'flacon1-intensite'
                    : 'flacon2-intensite',
              })
            }
            onNext={() =>
              dispatch({
                type: 'GO_TO_STEP',
                step:
                  flaconIndex === 1
                    ? 'flacon1-personnalisation'
                    : 'flacon2-personnalisation',
              })
            }
          />
        )}

        {(state.step === 'flacon1-personnalisation' ||
          state.step === 'flacon2-personnalisation') && (
          <Step4Personnalisation
            flaconIndex={flaconIndex}
            format={(currentFlacon as { format: Format }).format}
            currentBase={
              (currentFlacon as { baseHuile?: BaseHuile }).baseHuile
            }
            currentArome={
              (currentFlacon as { aromeVape?: AromeVape }).aromeVape
            }
            onSelectBase={(b) =>
              dispatch({ type: 'SET_BASE_HUILE', flaconIndex, baseHuile: b })
            }
            onSelectArome={(a) =>
              dispatch({ type: 'SET_AROME_VAPE', flaconIndex, aromeVape: a })
            }
            onBack={() =>
              dispatch({
                type: 'GO_TO_STEP',
                step:
                  flaconIndex === 1 ? 'flacon1-format' : 'flacon2-format',
              })
            }
            onNext={() => {
              if (flaconIndex === 1) {
                dispatch({ type: 'GO_TO_BRIDGE' });
              } else {
                dispatch({ type: 'GO_TO_STEP', step: 'recap' });
              }
            }}
          />
        )}

        {state.step === 'bridge' && (
          <BridgeAjoutFlacon
            flacon1={state.flacon1 as Flacon}
            onAutoSame={() => dispatch({ type: 'ADD_FLACON2_AUTO_SAME' })}
            onCustom={() => dispatch({ type: 'ADD_FLACON2_CUSTOM' })}
            onSkip={() => dispatch({ type: 'SKIP_FLACON2' })}
          />
        )}

        {state.step !== 'flacon1-besoin' &&
          state.step !== 'flacon2-besoin' &&
          state.step !== 'flacon1-intensite' &&
          state.step !== 'flacon2-intensite' &&
          state.step !== 'flacon1-format' &&
          state.step !== 'flacon2-format' &&
          state.step !== 'flacon1-personnalisation' &&
          state.step !== 'flacon2-personnalisation' &&
          state.step !== 'bridge' && (
            <p className="text-smoke-600">
              Étape <em>{state.step}</em> — implémentée aux tasks suivantes.
            </p>
          )}
      </section>
    </div>
  );
}
