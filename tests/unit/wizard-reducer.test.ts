import { describe, it, expect } from 'vitest';
import {
  wizardReducer,
  initialWizardState,
  type WizardAction,
} from '@/lib/wizard-reducer';

describe('wizardReducer', () => {
  it('initialWizardState est à step flacon1-besoin', () => {
    expect(initialWizardState.step).toBe('flacon1-besoin');
    expect(initialWizardState.flacon1).toEqual({});
    expect(initialWizardState.flacon2).toBe(null);
  });

  it('SET_STARTER sur flacon 1 met starterId', () => {
    const s = wizardReducer(initialWizardState, {
      type: 'SET_STARTER',
      flaconIndex: 1,
      starterId: 'soir',
    });
    expect(s.flacon1.starterId).toBe('soir');
  });

  it('SET_CONCENTRATION sur flacon 1', () => {
    const s1 = wizardReducer(initialWizardState, {
      type: 'SET_STARTER',
      flaconIndex: 1,
      starterId: 'soir',
    });
    const s2 = wizardReducer(s1, {
      type: 'SET_CONCENTRATION',
      flaconIndex: 1,
      concentration: 10,
    });
    expect((s2.flacon1 as any).concentration).toBe(10);
  });

  it('SET_FORMAT huile puis SET_BASE_HUILE', () => {
    let s = wizardReducer(initialWizardState, {
      type: 'SET_STARTER',
      flaconIndex: 1,
      starterId: 'brut',
    });
    s = wizardReducer(s, {
      type: 'SET_CONCENTRATION',
      flaconIndex: 1,
      concentration: 10,
    });
    s = wizardReducer(s, {
      type: 'SET_FORMAT',
      flaconIndex: 1,
      format: 'huile',
    });
    expect(s.flacon1.format).toBe('huile');
    s = wizardReducer(s, {
      type: 'SET_BASE_HUILE',
      flaconIndex: 1,
      baseHuile: 'hemp',
    });
    expect((s.flacon1 as any).baseHuile).toBe('hemp');
  });

  it('SET_FORMAT vape puis SET_AROME_VAPE', () => {
    let s = wizardReducer(initialWizardState, {
      type: 'SET_STARTER',
      flaconIndex: 1,
      starterId: 'matin',
    });
    s = wizardReducer(s, {
      type: 'SET_CONCENTRATION',
      flaconIndex: 1,
      concentration: 5,
    });
    s = wizardReducer(s, {
      type: 'SET_FORMAT',
      flaconIndex: 1,
      format: 'vape',
    });
    expect(s.flacon1.format).toBe('vape');
    s = wizardReducer(s, {
      type: 'SET_AROME_VAPE',
      flaconIndex: 1,
      aromeVape: 'citrus',
    });
    expect((s.flacon1 as any).aromeVape).toBe('citrus');
  });

  it('GO_TO_BRIDGE passe l’état à step=bridge', () => {
    const s = wizardReducer(initialWizardState, { type: 'GO_TO_BRIDGE' });
    expect(s.step).toBe('bridge');
  });

  it('ADD_FLACON2_AUTO_SAME crée un flacon 2 avec format opposé et concentration mappée', () => {
    let s: any = {
      ...initialWizardState,
      step: 'bridge',
      flacon1: {
        format: 'huile',
        starterId: 'soir',
        concentration: 10,
        baseHuile: 'hemp',
      },
    };
    s = wizardReducer(s, { type: 'ADD_FLACON2_AUTO_SAME' });
    expect(s.flacon2).toBeDefined();
    expect(s.flacon2.format).toBe('vape');
    expect(s.flacon2.starterId).toBe('soir');
    expect(s.flacon2.concentration).toBe(5); // 10% huile → 5% vape
    expect(s.flacon2.aromeVape).toBe('neutre'); // default
    expect(s.step).toBe('recap');
  });

  it('ADD_FLACON2_AUTO_SAME inverse : vape → huile', () => {
    let s: any = {
      ...initialWizardState,
      step: 'bridge',
      flacon1: {
        format: 'vape',
        starterId: 'matin',
        concentration: 5,
        aromeVape: 'citrus',
      },
    };
    s = wizardReducer(s, { type: 'ADD_FLACON2_AUTO_SAME' });
    expect(s.flacon2.format).toBe('huile');
    expect(s.flacon2.starterId).toBe('matin');
    expect(s.flacon2.concentration).toBe(10); // 5% vape → 10% huile
    expect(s.flacon2.baseHuile).toBe('mct'); // default
  });

  it('ADD_FLACON2_CUSTOM ouvre le mode flacon2-besoin', () => {
    let s: any = { ...initialWizardState, step: 'bridge' };
    s = wizardReducer(s, { type: 'ADD_FLACON2_CUSTOM' });
    expect(s.step).toBe('flacon2-besoin');
    expect(s.flacon2).toEqual({});
  });

  it('SKIP_FLACON2 passe au récap sans ajouter de flacon 2', () => {
    let s: any = { ...initialWizardState, step: 'bridge' };
    s = wizardReducer(s, { type: 'SKIP_FLACON2' });
    expect(s.step).toBe('recap');
    expect(s.flacon2).toBe(null);
  });

  it('SET_CONTACT met à jour les infos utilisateur', () => {
    const s = wizardReducer(initialWizardState, {
      type: 'SET_CONTACT',
      contact: {
        nom: 'Jean',
        email: 'j@example.com',
        ageConfirmed: true,
        rgpdConsent: true,
      },
    });
    expect(s.contact.nom).toBe('Jean');
    expect(s.contact.email).toBe('j@example.com');
    expect(s.contact.ageConfirmed).toBe(true);
  });

  it('RESET remet l’état initial', () => {
    let s: any = wizardReducer(initialWizardState, {
      type: 'SET_STARTER',
      flaconIndex: 1,
      starterId: 'soir',
    });
    s = wizardReducer(s, { type: 'RESET' });
    expect(s).toEqual(initialWizardState);
  });
});
