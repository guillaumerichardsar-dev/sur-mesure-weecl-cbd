import Link from 'next/link';

export default function MerciPage() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-20 text-center space-y-6">
      <div className="text-6xl">✓</div>
      <h1 className="font-serif text-4xl">Merci pour votre demande.</h1>
      <p className="text-lg text-smoke-600">
        Ceci est un prototype : aucun paiement n&apos;a été prélevé, aucune
        commande n&apos;a été passée en production.
      </p>
      <p className="text-smoke-600">
        Nous utilisons vos retours de ce parcours pour affiner
        Sur-Mesure WEECL avant son lancement officiel.
      </p>
      <div className="pt-6">
        <Link
          href="/"
          className="inline-block bg-forest-500 hover:bg-forest-900 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
