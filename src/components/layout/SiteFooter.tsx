export function SiteFooter() {
  return (
    <footer className="border-t border-bone-200 bg-bone-100 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-smoke-600 space-y-2">
        <p>
          Sur-Mesure WEECL est un prototype interne. Aucun produit n&apos;est
          commercialisé via ce site.
        </p>
        <p>
          Site officiel WEECL :{' '}
          <a
            href="https://weecl-cbd.com"
            className="underline underline-offset-4"
          >
            weecl-cbd.com
          </a>
          .
        </p>
        <p className="text-xs pt-4">
          Produits cosmétiques buccaux et e-liquides sans nicotine réservés aux
          adultes. Ne se substituent pas à une consultation médicale.
        </p>
      </div>
    </footer>
  );
}
