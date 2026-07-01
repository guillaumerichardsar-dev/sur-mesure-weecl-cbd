import type {
  StarterId,
  ConcentrationHuile,
  ConcentrationVape,
} from '@/types/config';

// Prix TTC de base huile 30ml spray, base MCT (sans supplément arôme/base)
// Cohérent avec spec v2 §9.1
export const PRIX_HUILE_30ML_MCT: Record<
  StarterId,
  Partial<Record<ConcentrationHuile, number>>
> = {
  brut: { 5: 45, 10: 89, 15: 109, 20: 139 },
  calme: { 5: 45, 10: 89, 15: 109, 20: 139 },
  equilibre: { 5: 45, 10: 89, 15: 109, 20: 139 },
  matin: { 5: 45, 10: 89, 15: 109 },
  soir: { 5: 55, 10: 109, 15: 139 },
  'confort-musc': { 10: 99, 15: 129, 20: 159 },
};

// Prix TTC vape 30ml PG100 arôme Neutre (sans supplément)
// Cohérent avec spec v2 §9.2
export const PRIX_VAPE_30ML_NEUTRE: Record<
  StarterId,
  Partial<Record<ConcentrationVape, number>>
> = {
  brut: { 2.5: 39, 5: 65, 7.5: 79, 10: 99 },
  calme: { 2.5: 39, 5: 65, 7.5: 79, 10: 99 },
  equilibre: { 2.5: 39, 5: 65, 7.5: 79, 10: 99 },
  matin: { 2.5: 39, 5: 65, 7.5: 79, 10: 99 },
  soir: { 2.5: 45, 5: 79, 7.5: 99 },
  'confort-musc': {}, // vape non disponible V0
};

// Mapping automatique concentration huile → vape équivalent (cf. spec v2 §5.3)
export const MAPPING_HUILE_VERS_VAPE: Record<
  ConcentrationHuile,
  ConcentrationVape
> = {
  5: 2.5,
  10: 5,
  15: 7.5,
  20: 10,
};

export const FRAIS_PORT_STANDARD = 4.9;
export const SEUIL_FRAIS_PORT_OFFERTS = 89;
