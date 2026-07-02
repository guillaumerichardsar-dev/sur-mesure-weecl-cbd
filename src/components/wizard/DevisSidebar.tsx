'use client';

import type { Flacon } from '@/types/config';
import { calculerTotalCommande, calculerPrixFlacon } from '@/lib/pricing';
import { getStarter } from '@/data/starters';

interface DevisSidebarProps {
  flacons: Partial<Flacon>[];
}

function isCompleteFlacon(f: Partial<Flacon>): f is Flacon {
  if (!f.format || !f.starterId || f.concentration === undefined) return false;
  if (f.format === 'huile') return 'baseHuile' in f && !!f.baseHuile;
  return 'aromeVape' in f && !!f.aromeVape;
}

export function DevisSidebar({ flacons }: DevisSidebarProps) {
  const completes = flacons.filter(isCompleteFlacon);
  const canCompute = completes.length > 0;
  const totals = canCompute
    ? calculerTotalCommande(completes)
    : { sousTotal: 0, fraisPort: 0, total: 0 };

  return (
    <aside className="lg:sticky lg:top-28">
      <div className="bg-carbon text-bone-50 rounded-lg p-6 space-y-4">
        <p className="text-xs uppercase tracking-widest text-bone-200/60">
          Devis estimatif
        </p>
        {!canCompute && (
          <p className="text-sm text-bone-200/60">
            Complétez au moins un flacon pour voir votre estimation.
          </p>
        )}
        {canCompute && (
          <>
            <p className="font-serif text-4xl">
              {totals.total} <span className="text-base">€</span>
            </p>
            <div className="space-y-2 text-sm border-t border-bone-50/10 pt-4">
              {completes.map((f, i) => {
                const starter = getStarter(f.starterId);
                return (
                  <div key={i} className="flex justify-between">
                    <span className="text-bone-200/70">
                      {starter?.nom} · {f.format} {f.concentration}%
                    </span>
                    <span>{calculerPrixFlacon(f)} €</span>
                  </div>
                );
              })}
              <div className="flex justify-between text-xs text-bone-200/60 pt-2 border-t border-bone-50/10">
                <span>Frais de port</span>
                <span>
                  {totals.fraisPort === 0
                    ? 'OFFERTS'
                    : `${totals.fraisPort} €`}
                </span>
              </div>
            </div>
          </>
        )}
        <p className="text-xs text-bone-200/40 pt-2 leading-relaxed">
          Prix indicatif non contractuel. Prototype uniquement.
        </p>
      </div>
    </aside>
  );
}
