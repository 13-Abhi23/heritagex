import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  monuments,
  getMonumentById,
  crowdBadgeStyles,
  crowdDotStyles,
} from "@/data/monuments";

export function generateStaticParams() {
  return monuments.map((site) => ({ id: site.id }));
}

function MonumentNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 shadow-sm">
        <span className="inline-block rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
          Not Found
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
          Heritage Site Not Found
        </h1>
        <p className="mt-3 text-base text-slate-600">
          We could not find a monument matching that ID. Please browse our
          available heritage sites.
        </p>
        <Link
          href="/sites"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
        >
          Back to Explore Sites
        </Link>
      </div>
    </section>
  );
}

async function SiteDetailContent({ params }) {
  const { id } = await params;
  const site = getMonumentById(id);

  if (!site) {
    return <MonumentNotFound />;
  }

  return (
    <div className="bg-white text-slate-900">
      {/* Top Bar & Title */}
      <section className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/sites"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-700"
          >
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
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Sites
          </Link>

          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                  <svg
                    className="h-4 w-4 shrink-0"
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
                  {site.fullLocation}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${crowdBadgeStyles[site.crowdStatus]}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${crowdDotStyles[site.crowdStatus]}`}
                  />
                  Crowd: {site.crowdStatus}
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {site.name}
              </h1>
            </div>

            <Link
              href={`/book/${site.id}`}
              className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Main Details Content */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Large Monument Image */}
        <div className="relative aspect-[16/9] max-h-[460px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
          <Image
            src={site.image}
            alt={`${site.name} in ${site.fullLocation}`}
            fill
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
          />
        </div>

        {/* Description & Visitor Info Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Historical Description & Available Slots */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Historical Overview
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {site.historicalDescription}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Available Visiting Time Slots
                </h2>
                <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {site.timeSlots.length} Slots
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Choose a preferred slot when booking your visit.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {site.timeSlots.map((slot) => (
                  <div
                    key={slot}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-semibold text-slate-800"
                  >
                    <span>{slot}</span>
                    <span className="text-xs font-medium text-emerald-700">
                      Available
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Opening Hours, Ticket Prices & Action */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Visitor Information
              </h2>

              <div className="mt-5 space-y-5 border-t border-slate-100 pt-5 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Opening Hours
                  </p>
                  <p className="mt-1 font-medium text-slate-900">
                    {site.openingHours}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Ticket Prices
                  </p>
                  <dl className="mt-2 space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-slate-600">Indian Visitors</dt>
                      <dd className="text-right font-semibold text-slate-900">
                        {site.ticketPrices.indian}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-3 border-t border-slate-200/70 pt-2">
                      <dt className="text-slate-600">Foreign Visitors</dt>
                      <dd className="text-right font-semibold text-blue-700">
                        {site.ticketPrices.foreign}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Crowd Status
                  </p>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${crowdBadgeStyles[site.crowdStatus]}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${crowdDotStyles[site.crowdStatus]}`}
                      />
                      {site.crowdStatus} Crowd Expected
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5">
                <Link
                  href={`/book/${site.id}`}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
                >
                  Book Now
                </Link>
                <Link
                  href="/sites"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  Back to Sites
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default function SiteDetailPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-16 text-sm text-slate-500 sm:px-6 lg:px-8">
          Loading heritage site details...
        </div>
      }
    >
      <SiteDetailContent params={params} />
    </Suspense>
  );
}

