import type {
  Flacon,
  FlaconHuile,
  FlaconVape,
} from '@/types/config';
import {
  PRIX_HUILE_30ML_MCT,
  PRIX_VAPE_30ML_NEUTRE,
  FRAIS_PORT_STANDARD,
  SEUIL_FRAIS_PORT_OFFERTS,
} from '@/data/pricing-table';
import { BASES_HUILE } from '@/data/bases-huile';
import { AROMES_VAPE } from '@/data/aromes-vape';

function calculerPrixHuile(f: FlaconHuile): number {
  const basePrice = PRIX_HUILE_30ML_MCT[f.starterId]?.[f.concentration];
  if (basePrice === undefined) {
    throw new Error(
      `Prix indisponible : combinaison non disponible pour huile ${f.starterId} ${f.concentration}%`
    );
  }
  const baseDef = BASES_HUILE.find((b) => b.id === f.baseHuile);
  const surcout = baseDef?.surcout ?? 0;
  return basePrice + surcout;
}

function calculerPrixVape(f: FlaconVape): number {
  const basePrice = PRIX_VAPE_30ML_NEUTRE[f.starterId]?.[f.concentration];
  if (basePrice === undefined) {
    throw new Error(
      `Prix indisponible : combinaison non disponible pour vape ${f.starterId} ${f.concentration}%`
    );
  }
  const aromeDef = AROMES_VAPE.find((a) => a.id === f.aromeVape);
  const surcout = aromeDef?.surcout ?? 0;
  return basePrice + surcout;
}

export function calculerPrixFlacon(f: Flacon): number {
  if (f.format === 'huile') return calculerPrixHuile(f);
  return calculerPrixVape(f);
}

export function getFraisPort(sousTotal: number): number {
  if (sousTotal >= SEUIL_FRAIS_PORT_OFFERTS) return 0;
  return FRAIS_PORT_STANDARD;
}

export function calculerTotalCommande(flacons: Flacon[]): {
  sousTotal: number;
  fraisPort: number;
  total: number;
} {
  const sousTotal = flacons.reduce((acc, f) => acc + calculerPrixFlacon(f), 0);
  const fraisPort = getFraisPort(sousTotal);
  const total = sousTotal + fraisPort;
  return { sousTotal, fraisPort, total };
}
