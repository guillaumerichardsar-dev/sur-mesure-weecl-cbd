import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-bone-50/95 backdrop-blur-sm border-b border-bone-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-tight">
          Sur-Mesure <span className="italic text-forest-500">WEECL</span>
        </Link>
        <nav>
          <Link
            href="/configurateur"
            className="text-sm underline underline-offset-4 hover:text-forest-500"
          >
            Configurer ma formule
          </Link>
        </nav>
      </div>
    </header>
  );
}
