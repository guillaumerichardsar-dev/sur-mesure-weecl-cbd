'use client';

import type { Flacon } from '@/types/config';
import { getStarter } from '@/data/starters';
import { MAPPING_HUILE_VERS_VAPE } from '@/data/pricing-table';

interface BridgeAjoutFlaconProps {
  flacon1: Flacon;
  onAutoSame: () => void;
  onCustom: () => void;
  onSkip: () => void;
}

export function BridgeAjoutFlacon({
  flacon1,
  onAutoSame,
  onCustom,
  onSkip,
}: BridgeAjoutFlaconProps) {
  const starter = getStarter(flacon1.starterId);
  const formatOppose = flacon1.format === 'huile' ? 'vape' : 'huile';
  const formatOpposeLabel =
    formatOppose === 'huile' ? 'huile 30ml' : 'vape 30ml';

  // Concentration suggérée pour flacon 2
  let concentrationSuggeree: number;
  if (flacon1.format === 'huile') {
    const c = flacon1.concentration;
    concentrationSuggeree = MAPPING_HUILE_VERS_VAPE[c];
  } else {
    const entry = (
      Object.entries(MAPPING_HUILE_VERS_VAPE) as [string, number][]
    ).find(([, v]) => v === flacon1.concentration);
    concentrationSuggeree = entry ? Number(entry[0]) : 10;
  }

  const flacon1Label = (() => {
    const base =
      flacon1.format === 'huile'
        ? `Huile 30ml · ${flacon1.baseHuile}`
        : `Vape 30ml · ${flacon1.aromeVape}`;
    return `${starter?.nom ?? ''} · ${flacon1.concentration}% · ${base}`;
  })();

  return (
    <div>
      <div className="mb-8 p-5 bg-forest-50 border border-forest-500/30 rounded-lg">
        <p className="text-xs uppercase tracking-widest text-forest-500 mb-2">
          Votre flacon 1 est prêt
        </p>
        <p className="font-serif text-lg">{flacon1Label}</p>
      </div>

      <h2 className="font-serif text-3xl mb-2">
        Ajouter un flacon complémentaire ?
      </h2>
      <p className="text-smoke-600 mb-8">
        L&apos;immédiateté du vape et la durée de l&apos;huile peuvent se
        compléter sur un même besoin, ou vous pouvez couvrir un second
        besoin.
      </p>

      <div className="space-y-3">
        <button
          type="button"
          onClick={onAutoSame}
          className="w-full text-left p-6 rounded-lg border-2 border-bone-200 hover:border-forest-500/50 bg-white transition-all"
        >
          <p className="font-serif text-xl mb-2">
            Oui — ajouter {formatOpposeLabel} avec profil auto-adapté
          </p>
          <p className="text-sm text-smoke-600">
            Même starter ({starter?.nom}), concentration adaptée à{' '}
            {concentrationSuggeree}%, {formatOppose === 'huile' ? 'base MCT' : 'arôme Neutre'} par défaut
            (modifiable au récap).
          </p>
        </button>

        <button
          type="button"
          onClick={onCustom}
          className="w-full text-left p-6 rounded-lg border-2 border-bone-200 hover:border-forest-500/50 bg-white transition-all"
        >
          <p className="font-serif text-xl mb-2">
            Oui — avec un profil différent
          </p>
          <p className="text-sm text-smoke-600">
            Recomposez un second flacon depuis le début (autre besoin,
            autre intensité, autre format si vous le souhaitez).
          </p>
        </button>

        <button
          type="button"
          onClick={onSkip}
          className="w-full text-left p-6 rounded-lg border-2 border-bone-200 hover:border-forest-500/50 bg-white transition-all"
        >
          <p className="font-serif text-xl mb-2">
            Non — passer à la commande
          </p>
          <p className="text-sm text-smoke-600">
            Un seul flacon me suffit pour cette commande.
          </p>
        </button>
      </div>
    </div>
  );
}
