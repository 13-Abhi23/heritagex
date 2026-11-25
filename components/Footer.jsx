import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Sites", href: "/sites" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Bookings", href: "/bookings" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-700 to-emerald-600 text-xs font-extrabold text-white">
                HX
              </span>
              <span>
                Heritage<span className="text-blue-700">X</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              A smart heritage tourism platform designed to help travelers
              explore India&apos;s iconic monuments with structured insights and
              sustainable visit planning.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Quick Links
            </h2>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-blue-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>&copy; 2026 HeritageX. All rights reserved.</p>
          <p className="font-medium text-emerald-700">
            Smart &amp; Sustainable Heritage Tourism
          </p>
        </div>
      </div>
    </footer>
  );
}

