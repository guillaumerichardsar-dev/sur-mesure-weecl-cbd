import { describe, it, expect } from 'vitest';
import {
  calculerPrixFlacon,
  calculerTotalCommande,
  getFraisPort,
} from '@/lib/pricing';
import type { FlaconHuile, FlaconVape } from '@/types/config';

describe('calculerPrixFlacon', () => {
  it('retourne 89€ pour huile Brut 10% base MCT', () => {
    const f: FlaconHuile = {
      format: 'huile',
      starterId: 'brut',
      concentration: 10,
      baseHuile: 'mct',
    };
    expect(calculerPrixFlacon(f)).toBe(89);
  });

  it('ajoute 3€ pour base Hemp', () => {
    const f: FlaconHuile = {
      format: 'huile',
      starterId: 'brut',
      concentration: 10,
      baseHuile: 'hemp',
    };
    expect(calculerPrixFlacon(f)).toBe(92);
  });

  it('ajoute 3€ pour base Olive', () => {
    const f: FlaconHuile = {
      format: 'huile',
      starterId: 'calme',
      concentration: 10,
      baseHuile: 'olive',
    };
    expect(calculerPrixFlacon(f)).toBe(92);
  });

  it('retourne 65€ pour vape Brut 5% arôme Neutre', () => {
    const f: FlaconVape = {
      format: 'vape',
      starterId: 'brut',
      concentration: 5,
      aromeVape: 'neutre',
    };
    expect(calculerPrixFlacon(f)).toBe(65);
  });

  it('ajoute 5€ pour arôme Citrus', () => {
    const f: FlaconVape = {
      format: 'vape',
      starterId: 'matin',
      concentration: 5,
      aromeVape: 'citrus',
    };
    expect(calculerPrixFlacon(f)).toBe(70);
  });

  it('retourne 109€ pour huile Soir 10% MCT', () => {
    const f: FlaconHuile = {
      format: 'huile',
      starterId: 'soir',
      concentration: 10,
      baseHuile: 'mct',
    };
    expect(calculerPrixFlacon(f)).toBe(109);
  });

  it('lève une erreur pour combinaison inexistante', () => {
    const f: FlaconVape = {
      format: 'vape',
      starterId: 'confort-musc',
      concentration: 5,
      aromeVape: 'neutre',
    };
    expect(() => calculerPrixFlacon(f)).toThrow(
      /combinaison non disponible/i
    );
  });
});

describe('getFraisPort', () => {
  it('retourne 4.9€ pour sous-total < 89€', () => {
    expect(getFraisPort(50)).toBe(4.9);
  });

  it('retourne 0€ pour sous-total >= 89€', () => {
    expect(getFraisPort(89)).toBe(0);
    expect(getFraisPort(150)).toBe(0);
  });
});

describe('calculerTotalCommande', () => {
  it('calcule total 1 flacon huile Calme 5% MCT = 45€ + 4.9 port', () => {
    const flacons: FlaconHuile[] = [
      {
        format: 'huile',
        starterId: 'calme',
        concentration: 5,
        baseHuile: 'mct',
      },
    ];
    const r = calculerTotalCommande(flacons);
    expect(r.sousTotal).toBe(45);
    expect(r.fraisPort).toBe(4.9);
    expect(r.total).toBe(49.9);
  });

  it('calcule duo huile Soir 10% Hemp + vape Soir 5% Neutre = 191€ port offert', () => {
    const flacons = [
      {
        format: 'huile' as const,
        starterId: 'soir' as const,
        concentration: 10 as const,
        baseHuile: 'hemp' as const,
      },
      {
        format: 'vape' as const,
        starterId: 'soir' as const,
        concentration: 5 as const,
        aromeVape: 'neutre' as const,
      },
    ];
    const r = calculerTotalCommande(flacons);
    // 109 + 3 (hemp) + 79 = 191
    expect(r.sousTotal).toBe(191);
    expect(r.fraisPort).toBe(0);
    expect(r.total).toBe(191);
  });
});
