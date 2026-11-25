"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  monuments,
  crowdBadgeStyles,
  crowdDotStyles,
} from "@/data/monuments";

const SLOTS_PER_MONUMENT = 4;
const CAPACITY_PER_SLOT = 50;
const CAPACITY_PER_MONUMENT = SLOTS_PER_MONUMENT * CAPACITY_PER_SLOT; // 200
const EMPTY_BOOKINGS_JSON = "[]";

// Sample visitor counts shown only when no bookings exist in localStorage
const SAMPLE_BOOKED_VISITORS = {
  "taj-mahal": 156,
  "red-fort": 104,
  "qutub-minar": 48,
  "india-gate": 92,
};

const crowdBarColors = {
  Low: "bg-emerald-500",
  Medium: "bg-amber-500",
  High: "bg-rose-500",
};

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

function getCrowdLevel(bookedVisitors, capacity) {
  const ratio = capacity > 0 ? bookedVisitors / capacity : 0;
  if (ratio >= 0.7) return "High";
  if (ratio >= 0.35) return "Medium";
  return "Low";
}

export default function DashboardPage() {
  const bookingsJson = useSyncExternalStore(
    subscribeToBookings,
    getBookingsSnapshot,
    getServerBookingsSnapshot
  );

  const bookings = parseBookings(bookingsJson);
  const hasBookings = bookings.length > 0;

  // Calculate actual totals from saved bookings
  const totalHeritageSites = monuments.length;
  const totalBookings = bookings.length;
  const totalVisitorsBooked = bookings.reduce((sum, booking) => {
    const count = Number(
      booking.visitorCount ?? booking.visitors ?? booking.guests ?? 0
    );
    return sum + (Number.isNaN(count) ? 0 : count);
  }, 0);

  const totalCapacity = totalHeritageSites * CAPACITY_PER_MONUMENT;
  const availableVisitorCapacity = Math.max(
    0,
    totalCapacity - totalVisitorsBooked
  );

  // Per-monument breakdown: use saved bookings when present, otherwise sample data
  const monumentStats = monuments.map((site) => {
    const actualBooked = bookings.reduce((sum, booking) => {
      const bookingSiteName =
        booking.monumentName ||
        booking.monument ||
        booking.siteName ||
        booking.name;
      const matchesSite =
        booking.monumentId === site.id || bookingSiteName === site.name;

      if (!matchesSite) return sum;

      const count = Number(
        booking.visitorCount ?? booking.visitors ?? booking.guests ?? 0
      );
      return sum + (Number.isNaN(count) ? 0 : count);
    }, 0);

    const displayedVisitors = hasBookings
      ? actualBooked
      : (SAMPLE_BOOKED_VISITORS[site.id] ?? 0);

    const remainingCapacity = Math.max(
      0,
      CAPACITY_PER_MONUMENT - displayedVisitors
    );

    const crowdLevel = hasBookings
      ? getCrowdLevel(actualBooked, CAPACITY_PER_MONUMENT)
      : site.crowdStatus;

    const percentage = Math.min(
      100,
      Math.round((displayedVisitors / CAPACITY_PER_MONUMENT) * 100)
    );

    return {
      id: site.id,
      name: site.name,
      location: site.location,
      bookedVisitors: displayedVisitors,
      remainingCapacity,
      crowdLevel,
      percentage,
    };
  });

  const summaryCards = [
    {
      label: "Total Heritage Sites",
      value: totalHeritageSites,
      note: "Monuments available for booking",
      badgeClass: "border-blue-100 bg-blue-50 text-blue-700",
    },
    {
      label: "Total Bookings",
      value: totalBookings,
      note: hasBookings
        ? "Saved reservations in browser"
        : "No saved reservations yet",
      badgeClass: "border-emerald-100 bg-emerald-50 text-emerald-700",
    },
    {
      label: "Total Visitors Booked",
      value: totalVisitorsBooked,
      note: "Visitors across all saved bookings",
      badgeClass: "border-blue-100 bg-blue-50 text-blue-700",
    },
    {
      label: "Available Visitor Capacity",
      value: availableVisitorCapacity,
      note: `Out of ${totalCapacity} total slot capacity`,
      badgeClass: "border-emerald-100 bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="bg-white text-slate-900">
      {/* Header Section */}
      <section className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-12 sm:flex-row sm:items-end sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Crowd Management Overview
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Crowd Dashboard
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600">
              View monument booking counts, remaining slot capacity, and crowd
              levels calculated from your saved HeritageX reservations.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 self-start sm:self-auto">
            <Link
              href="/bookings"
              className="inline-flex rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              My Bookings
            </Link>
            <Link
              href="/sites"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Explore Sites
            </Link>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Empty Bookings Notice */}
        {!hasBookings && (
          <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-sm font-bold text-amber-900">
                No bookings found in local storage
              </h2>
              <p className="mt-1 text-sm text-amber-800">
                You haven&apos;t made any bookings yet. Showing sample crowd
                data below until your first reservation is saved.
              </p>
            </div>
            <Link
              href="/sites"
              className="inline-flex shrink-0 self-start rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 sm:self-auto"
            >
              Book a Visit
            </Link>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span
                className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-semibold ${item.badgeClass}`}
              >
                {item.label}
              </span>
              <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {item.value.toLocaleString("en-US")}
              </p>
              <p className="mt-2 text-sm text-slate-600">{item.note}</p>
            </div>
          ))}
        </div>

        {/* Monument Crowd Status & CSS Bar Chart */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Monument Crowd Details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Monument Crowd Status
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Booked visitors and remaining capacity per monument
                </p>
              </div>
              <span
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                  hasBookings
                    ? "bg-blue-50 text-blue-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {hasBookings ? "From Bookings" : "Sample Data"}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {monumentStats.map((site) => (
                <div
                  key={site.id}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {site.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-600">
                      Booked visitors:{" "}
                      <span className="font-semibold text-slate-900">
                        {site.bookedVisitors}
                      </span>{" "}
                      &bull; Remaining capacity:{" "}
                      <span className="font-semibold text-slate-900">
                        {site.remainingCapacity}
                      </span>{" "}
                      / {CAPACITY_PER_MONUMENT}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 text-xs font-semibold sm:self-auto ${crowdBadgeStyles[site.crowdLevel]}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${crowdDotStyles[site.crowdLevel]}`}
                    />
                    Crowd: {site.crowdLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CSS-Based Visual Bar Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Visitor Capacity Chart
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Booked visitor load out of {CAPACITY_PER_MONUMENT} capacity per
                  site
                </p>
              </div>
              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                {totalHeritageSites} Sites
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {monumentStats.map((site) => (
                <div key={site.id}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-900">
                      {site.name}{" "}
                      <span className="font-normal text-slate-500">
                        ({site.location})
                      </span>
                    </span>
                    <span className="font-semibold text-slate-700">
                      {site.bookedVisitors} / {CAPACITY_PER_MONUMENT} (
                      {site.percentage}%)
                    </span>
                  </div>

                  <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${crowdBarColors[site.crowdLevel]} transition-all duration-300`}
                      style={{ width: `${site.percentage}%` }}
                      role="progressbar"
                      aria-label={`${site.name} visitor capacity usage`}
                      aria-valuenow={site.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Crowd Levels:</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Low (&lt;35%)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Medium (35%–69%)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                High (70%+)
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
