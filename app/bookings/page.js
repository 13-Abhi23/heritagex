"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const EMPTY_BOOKINGS_JSON = "[]";

function subscribeToBookings(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getBookingsSnapshot() {
  return (
    localStorage.getItem("heritagex_bookings") ||
    localStorage.getItem("bookings") ||
    EMPTY_BOOKINGS_JSON
  );
}

function getServerBookingsSnapshot() {
  return EMPTY_BOOKINGS_JSON;
}

function parseBookings(rawJson) {
  try {
    const parsed = JSON.parse(rawJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function BookingsPage() {
  const bookingsJson = useSyncExternalStore(
    subscribeToBookings,
    getBookingsSnapshot,
    getServerBookingsSnapshot
  );

  const bookings = parseBookings(bookingsJson);

  return (
    <div className="bg-white text-slate-900">
      {/* Header Section */}
      <section className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-12 sm:flex-row sm:items-end sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Visit Itinerary
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My Bookings
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600">
              View your saved heritage site reservations stored locally in your
              browser.
            </p>
          </div>

          <Link
            href="/sites"
            className="inline-flex self-start rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:self-auto"
          >
            Explore Heritage Sites
          </Link>
        </div>
      </section>

      {/* Bookings List */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No bookings yet
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Your saved monument visits will appear here once booked.
            </p>
            <Link
              href="/sites"
              className="mt-6 inline-flex rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              Browse Heritage Sites
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking, index) => {
              const monumentName =
                booking.monumentName ||
                booking.monument ||
                booking.siteName ||
                booking.name ||
                "Heritage Site";
              const visitDate = booking.date || booking.visitDate || "Not specified";
              const timeSlot = booking.timeSlot || booking.slot || booking.time || "Not specified";
              const visitorCount =
                booking.visitorCount ?? booking.visitors ?? booking.guests ?? 1;

              return (
                <article
                  key={booking.id || `${monumentName}-${index}`}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      Saved Booking
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      #{index + 1}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-slate-900">
                    {monumentName}
                  </h2>

                  <dl className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-500">Date</dt>
                      <dd className="font-semibold text-slate-900">
                        {visitDate}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-500">Time Slot</dt>
                      <dd className="font-semibold text-blue-700">
                        {timeSlot}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-500">Visitors</dt>
                      <dd className="font-semibold text-slate-900">
                        {visitorCount}
                      </dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

