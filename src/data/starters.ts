import type { Starter } from '@/types/config';

export const STARTERS: readonly Starter[] = [
  {
    id: 'soir',
    emoji: '🌙',
    nom: 'Soir',
    besoin: 'Mieux passer mes soirées',
    descriptionSensorielle:
      'Profil herbacé et floral pour le soir. Notes terreuses dominantes, finale apaisante.',
    cannabinoides: 'CBD + CBN broad spectrum',
    terpenes: 'Myrcène · Linalool · Bisabolol',
    disponibleHuile: true,
    disponibleVape: true,
    concentrationsHuile: [5, 10, 15],
  },
  {
    id: 'calme',
    emoji: '🌿',
    nom: 'Calme',
    besoin: 'Trouver mon équilibre au quotidien',
    descriptionSensorielle:
      'Profil floral doux. Notes camomille et lavande discrètes.',
    cannabinoides: 'CBD broad spectrum',
    terpenes: 'Linalool · Bisabolol · Myrcène',
    disponibleHuile: true,
    disponibleVape: true,
    concentrationsHuile: [5, 10, 15, 20],
  },
  {
    id: 'confort-musc',
    emoji: '💪',
    nom: 'Confort musculaire',
    besoin: 'Récupérer après l’effort',
    descriptionSensorielle:
      'Profil boisé et résineux. Notes épicées et terreuses, finale longue.',
    cannabinoides: 'CBD + CBC broad spectrum',
    terpenes: 'β-Caryophyllène · Humulène · Myrcène',
    disponibleHuile: true,
    disponibleVape: false,
    concentrationsHuile: [10, 15, 20],
  },
  {
    id: 'matin',
    emoji: '☀️',
    nom: 'Matin',
    besoin: 'Bien commencer la journée',
    descriptionSensorielle:
      'Profil citrus et résineux. Notes fraîches d’agrumes et de pin.',
    cannabinoides: 'CBD + CBG broad spectrum',
    terpenes: 'Limonène · α-Pinène · Terpinolène',
    disponibleHuile: true,
    disponibleVape: true,
    concentrationsHuile: [5, 10, 15],
  },
  {
    id: 'equilibre',
    emoji: '⚖️',
    nom: 'Équilibre',
    besoin: 'Un profil polyvalent',
    descriptionSensorielle:
      'Profil complexe équilibré, sans note dominante. Polyvalent.',
    cannabinoides: 'CBD broad spectrum',
    terpenes: 'Mix équilibré 5 terpènes',
    disponibleHuile: true,
    disponibleVape: true,
    concentrationsHuile: [5, 10, 15, 20],
  },
  {
    id: 'brut',
    emoji: '🌾',
    nom: 'Brut',
    besoin: 'Découvrir le CBD simplement',
    descriptionSensorielle:
      'Goût propre de la base, finale courte. Pour amateurs de simplicité.',
    cannabinoides: 'CBD broad spectrum',
    terpenes: 'Aucun terpène ajouté',
    disponibleHuile: true,
    disponibleVape: true,
    concentrationsHuile: [5, 10, 15, 20],
  },
];

export function getStarter(id: string): Starter | undefined {
  return STARTERS.find((s) => s.id === id);
}
