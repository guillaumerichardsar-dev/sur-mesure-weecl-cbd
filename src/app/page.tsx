import Link from 'next/link';

export default function LandingPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 space-y-8">
      <h1 className="font-serif text-5xl leading-tight">
        Composez votre formule <em className="italic">signature</em>.
      </h1>
      <p className="text-lg text-smoke-600 leading-relaxed">
        Sur-Mesure WEECL, c&apos;est votre huile CBD sublinguale ou votre vape
        (ou les deux) formulée à la demande selon votre besoin, votre
        intensité et votre goût.
      </p>
      <p className="text-lg text-smoke-600 leading-relaxed">
        Six starters signature — Soir, Calme, Confort musculaire, Matin,
        Équilibre, Brut. Deux formats — huile sublinguale 30ml, vape 30ml.
        Multi-flacon possible pour la complémentarité immédiat + durée.
      </p>
      <Link
        href="/configurateur"
        className="inline-block bg-forest-500 hover:bg-forest-900 text-white px-8 py-4 rounded-md font-medium transition-colors"
      >
        Configurer ma formule →
      </Link>
    </section>
  );
}
