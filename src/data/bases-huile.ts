import type { BaseHuileDef } from '@/types/config';

export const BASES_HUILE: readonly BaseHuileDef[] = [
  {
    id: 'mct',
    nom: 'MCT neutre',
    descriptif:
      'Goût propre, finale rapide, recommandé pour les nouveaux utilisateurs.',
    surcout: 0,
  },
  {
    id: 'hemp',
    nom: 'Chanvre vierge',
    descriptif:
      'Saveur herbacée caractéristique, narratif terroir, pour les amateurs.',
    surcout: 3,
  },
  {
    id: 'olive',
    nom: 'Olive vierge extra',
    descriptif: 'Saveur méditerranéenne, narratif gastronomique.',
    surcout: 3,
  },
];
