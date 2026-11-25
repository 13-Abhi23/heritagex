"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const featuredDestinations = [
  {
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    tag: "UNESCO World Heritage",
    bestTime: "Sunrise Visit",
    image: "/images/taj-mahal.jpg",
    description:
      "An ivory-white marble mausoleum on the banks of the Yamuna River, celebrated globally for its symmetry and Mughal artistry.",
  },
  {
    name: "Red Fort",
    location: "Old Delhi, Delhi",
    tag: "UNESCO World Heritage",
    bestTime: "Morning Tour",
    image: "/images/red-fort.jpg",
    description:
      "A 17th-century red sandstone fortress complex showcasing imperial Mughal architecture, grand gateways, and historic pavilions.",
  },
  {
    name: "Qutub Minar",
    location: "Mehrauli, New Delhi",
    tag: "UNESCO World Heritage",
    bestTime: "Late Afternoon",
    image: "/images/qutub-minar.jpg",
    description:
      "A towering 73-meter fluted sandstone and marble minaret set amidst ancient courtyards and intricate stone carvings.",
  },
  {
    name: "India Gate",
    location: "Kartavya Path, New Delhi",
    tag: "National Monument",
    bestTime: "Evening Walk",
    image: "/images/india-gate.jpg",
    description:
      "A 42-meter sandstone war memorial arch surrounded by manicured lawns and illuminated promenades in the heart of New Delhi.",
  },
];

const smartFeatures = [
  {
    title: "Smart Crowd Insights",
    description:
      "Plan visits around calmer hours using curated timing recommendations for a peaceful monument experience.",
    accent: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    title: "Rich Cultural Context",
    description:
      "Learn architectural stories, historical timelines, and visitor highlights before you step onto the site.",
    accent: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    title: "Sustainable Tourism",
    description:
      "Promote responsible heritage travel that respects local communities and protects India's timeless landmarks.",
    accent: "bg-blue-50 text-blue-700 border-blue-100",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const filteredDestinations = featuredDestinations.filter(
    (site) =>
      site.name.toLowerCase().includes(trimmedQuery) ||
      site.location.toLowerCase().includes(trimmedQuery) ||
      site.tag.toLowerCase().includes(trimmedQuery)
  );

  function handleSearchSubmit(event) {
    event.preventDefault();
    const section = document.getElementById("featured-sites");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900">
        <Image
          src="/images/taj-mahal.jpg"
          alt="Taj Mahal at sunrise in Agra, India"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/70 to-slate-900/50"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3.5 py-1 text-xs font-semibold tracking-wide text-emerald-200 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Smart Heritage Tourism Platform
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover India&apos;s Heritage
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-200 sm:text-lg">
              Experience India&apos;s timeless monuments through smart heritage
              tourism — combining historical insights, best-time guidance, and
              sustainable trip planning in one modern platform.
            </p>

            {/* Primary CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#featured-sites"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition-colors hover:bg-blue-700"
              >
                Explore Heritage Sites
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                About HeritageX
              </Link>
            </div>

            {/* Monument Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              role="search"
              aria-label="Search heritage monuments"
              className="mt-8 flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl sm:flex-row sm:items-center"
            >
              <div className="flex flex-1 items-center gap-3 px-3 py-1.5">
                <svg
                  className="h-5 w-5 shrink-0 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <label htmlFor="monument-search" className="sr-only">
                  Search monuments
                </label>
                <input
                  id="monument-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search monuments (e.g., Taj Mahal, Red Fort, Delhi)..."
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Heritage Destinations */}
      <section
        id="featured-sites"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Featured Destinations
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Iconic Monuments to Explore
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Start your journey with four celebrated landmarks known for their
              architectural brilliance and enduring cultural legacy.
            </p>
          </div>

          {trimmedQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="self-start rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-700 sm:self-auto"
            >
              Clear Filter ({filteredDestinations.length} shown)
            </button>
          )}
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {filteredDestinations.map((site) => (
              <article
                key={site.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={site.image}
                    alt={`${site.name} in ${site.location}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {site.tag}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-slate-900">
                    {site.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-blue-700">
                    {site.location}
                  </p>

                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {site.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">
                    <span>Recommended</span>
                    <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700">
                      {site.bestTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-base font-semibold text-slate-900">
              No featured monuments matched &ldquo;{searchQuery}&rdquo;.
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Try searching for Taj Mahal, Red Fort, Qutub Minar, or India Gate.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-4 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              Show All Monuments
            </button>
          </div>
        )}
      </section>

      {/* About HeritageX Section */}
      <section
        id="about"
        className="border-t border-slate-200 bg-slate-50/70 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              About HeritageX
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Smarter, More Meaningful Heritage Travel
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              HeritageX is built to modernize how travelers explore India&apos;s
              historic landmarks. By uniting monument guides, visit timing
              awareness, and organized planning tools, we make cultural discovery
              accessible, mindful, and enjoyable for everyone.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {smartFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span
                  className={`inline-block rounded-lg border px-3 py-1 text-xs font-semibold ${feature.accent}`}
                >
                  Smart Tourism
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
