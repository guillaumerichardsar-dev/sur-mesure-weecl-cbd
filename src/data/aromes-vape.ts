import type { AromeVapeDef } from '@/types/config';

export const AROMES_VAPE: readonly AromeVapeDef[] = [
  {
    id: 'neutre',
    nom: 'Neutre',
    descriptif:
      'Aucun arôme ajouté. Profil sensoriel du starter à l’état pur.',
    surcout: 0,
  },
  {
    id: 'citrus',
    nom: 'Agrumes frais',
    descriptif: 'Notes de citron, orange et bergamote.',
    surcout: 5,
  },
  {
    id: 'menthe',
    nom: 'Menthe fraîche',
    descriptif: 'Sensation de fraîcheur mentholée en gorge.',
    surcout: 5,
  },
  {
    id: 'herbace',
    nom: 'Herbacé authentique',
    descriptif: 'Notes cannabis-like, terrestres et complexes.',
    surcout: 5,
  },
];
