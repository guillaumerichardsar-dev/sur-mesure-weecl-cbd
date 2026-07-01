import type {
  WizardState,
  StarterId,
  Format,
  BaseHuile,
  AromeVape,
  ConcentrationHuile,
  ConcentrationVape,
  Contact,
} from '@/types/config';
import { MAPPING_HUILE_VERS_VAPE } from '@/data/pricing-table';

export const initialWizardState: WizardState = {
  step: 'flacon1-besoin',
  flacon1: {},
  flacon2: null,
  contact: {},
};

export type WizardAction =
  | { type: 'SET_STARTER'; flaconIndex: 1 | 2; starterId: StarterId }
  | {
      type: 'SET_CONCENTRATION';
      flaconIndex: 1 | 2;
      concentration: ConcentrationHuile | ConcentrationVape;
    }
  | { type: 'SET_FORMAT'; flaconIndex: 1 | 2; format: Format }
  | { type: 'SET_BASE_HUILE'; flaconIndex: 1 | 2; baseHuile: BaseHuile }
  | { type: 'SET_AROME_VAPE'; flaconIndex: 1 | 2; aromeVape: AromeVape }
  | { type: 'GO_TO_BRIDGE' }
  | { type: 'ADD_FLACON2_AUTO_SAME' }
  | { type: 'ADD_FLACON2_CUSTOM' }
  | { type: 'SKIP_FLACON2' }
  | { type: 'GO_TO_STEP'; step: WizardState['step'] }
  | { type: 'SET_CONTACT'; contact: Partial<Contact> }
  | { type: 'RESET' };

function inverseConcentrationHuileVersVape(
  c: ConcentrationHuile
): ConcentrationVape {
  return MAPPING_HUILE_VERS_VAPE[c];
}

function inverseConcentrationVapeVersHuile(
  c: ConcentrationVape
): ConcentrationHuile {
  const entry = (
    Object.entries(MAPPING_HUILE_VERS_VAPE) as [string, ConcentrationVape][]
  ).find(([, v]) => v === c);
  if (!entry) return 10; // fallback safe
  return Number(entry[0]) as ConcentrationHuile;
}

export function wizardReducer(
  state: WizardState,
  action: WizardAction
): WizardState {
  switch (action.type) {
    case 'SET_STARTER': {
      const key = action.flaconIndex === 1 ? 'flacon1' : 'flacon2';
      return {
        ...state,
        [key]: { ...(state[key] ?? {}), starterId: action.starterId },
      };
    }
    case 'SET_CONCENTRATION': {
      const key = action.flaconIndex === 1 ? 'flacon1' : 'flacon2';
      return {
        ...state,
        [key]: {
          ...(state[key] ?? {}),
          concentration: action.concentration,
        },
      };
    }
    case 'SET_FORMAT': {
      const key = action.flaconIndex === 1 ? 'flacon1' : 'flacon2';
      return {
        ...state,
        [key]: { ...(state[key] ?? {}), format: action.format },
      };
    }
    case 'SET_BASE_HUILE': {
      const key = action.flaconIndex === 1 ? 'flacon1' : 'flacon2';
      return {
        ...state,
        [key]: {
          ...(state[key] ?? {}),
          baseHuile: action.baseHuile,
        },
      };
    }
    case 'SET_AROME_VAPE': {
      const key = action.flaconIndex === 1 ? 'flacon1' : 'flacon2';
      return {
        ...state,
        [key]: {
          ...(state[key] ?? {}),
          aromeVape: action.aromeVape,
        },
      };
    }
    case 'GO_TO_BRIDGE':
      return { ...state, step: 'bridge' };
    case 'ADD_FLACON2_AUTO_SAME': {
      const f1 = state.flacon1;
      if (!f1.format || !f1.starterId || f1.concentration === undefined) {
        return state;
      }
      if (f1.format === 'huile') {
        const c = inverseConcentrationHuileVersVape(
          f1.concentration as ConcentrationHuile
        );
        return {
          ...state,
          flacon2: {
            format: 'vape',
            starterId: f1.starterId,
            concentration: c,
            aromeVape: 'neutre',
          },
          step: 'recap',
        };
      }
      const c = inverseConcentrationVapeVersHuile(
        f1.concentration as ConcentrationVape
      );
      return {
        ...state,
        flacon2: {
          format: 'huile',
          starterId: f1.starterId,
          concentration: c,
          baseHuile: 'mct',
        },
        step: 'recap',
      };
    }
    case 'ADD_FLACON2_CUSTOM':
      return { ...state, step: 'flacon2-besoin', flacon2: {} };
    case 'SKIP_FLACON2':
      return { ...state, step: 'recap', flacon2: null };
    case 'GO_TO_STEP':
      return { ...state, step: action.step };
    case 'SET_CONTACT':
      return {
        ...state,
        contact: { ...state.contact, ...action.contact },
      };
    case 'RESET':
      return initialWizardState;
    default:
      return state;
  }
}
