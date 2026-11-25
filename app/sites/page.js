"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  monuments as heritageSites,
  crowdBadgeStyles,
  crowdDotStyles,
} from "@/data/monuments";

export default function HeritageSitesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredSites = heritageSites.filter(
    (site) =>
      site.name.toLowerCase().includes(normalizedQuery) ||
      site.location.toLowerCase().includes(normalizedQuery)
  );

  return (
    <div className="bg-white text-slate-900">
      {/* Page Header & Search Section */}
      <section className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Smart Monument Directory
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Explore Heritage Sites
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Browse India&apos;s renowned monuments, check current crowd
              levels, and search by monument name or city to plan a smarter
              visit.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl">
            <label htmlFor="site-search" className="sr-only">
              Search monuments by name or location
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
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
              <input
                id="site-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by monument name or location (e.g., Taj Mahal, Agra, Delhi)..."
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Monument Cards Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredSites.length}
            </span>{" "}
            of {heritageSites.length} heritage sites
          </p>
        </div>

        {filteredSites.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {filteredSites.map((site) => (
              <article
                key={site.id}
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
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                      <svg
                        className="h-3.5 w-3.5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {site.location}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${crowdBadgeStyles[site.crowdStatus]}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${crowdDotStyles[site.crowdStatus]}`}
                      />
                      Crowd: {site.crowdStatus}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-bold text-slate-900">
                    {site.name}
                  </h2>

                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                    {site.description}
                  </p>

                  <div className="mt-5 pt-2">
                    <Link
                      href={`/sites/${site.id}`}
                      className="block w-full rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-base font-semibold text-slate-900">
              No monuments found for &ldquo;{searchQuery}&rdquo;.
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Try searching for Taj Mahal, Red Fort, Qutub Minar, India Gate,
              Agra, or Delhi.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-4 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

