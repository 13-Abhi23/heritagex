"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMonumentById } from "@/data/monuments";

const TIME_SLOTS = [
  "9:00 AM - 11:00 AM",
  "11:00 AM - 1:00 PM",
  "1:00 PM - 3:00 PM",
  "3:00 PM - 5:00 PM",
];
const SLOT_CAPACITY = 50;

const BASE_PRICES = {
  "taj-mahal": 250,
  "red-fort": 35,
  "qutub-minar": 35,
  "india-gate": 0,
};

function loadSlotCapacities(id) {
  if (typeof window === "undefined") return {};
  const stored = JSON.parse(localStorage.getItem("heritagex_slots") || "{}");
  const siteSlots = stored[id] || {};
  const caps = {};
  TIME_SLOTS.forEach((s) => {
    caps[s] = siteSlots[s] !== undefined ? siteSlots[s] : SLOT_CAPACITY;
  });
  return caps;
}

export default function BookingClient({ id }) {
  const site = getMonumentById(id);

  const today = new Date().toISOString().split("T")[0];

  const [visitDate, setVisitDate] = useState("");
  const [visitors, setVisitors] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [errors, setErrors] = useState({});
  const [slotCapacities, setSlotCapacities] = useState(() =>
    loadSlotCapacities(id)
  );
  const [booking, setBooking] = useState(null);

  // Monument not found
  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center bg-white rounded-2xl border border-slate-200 shadow-sm p-10 max-w-md w-full">
          <div className="text-5xl mb-4">🏛️</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Monument Not Found</h1>
          <p className="text-slate-500 mb-6">
            We couldn&apos;t find details for this monument.
          </p>
          <Link
            href="/sites"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors"
          >
            ← Back to Explore Sites
          </Link>
        </div>
      </div>
    );
  }

  const basePrice = BASE_PRICES[id] ?? 0;
  const totalPrice = basePrice * visitors;

  function validate() {
    const newErrors = {};

    if (!visitDate) {
      newErrors.visitDate = "Please select a visit date.";
    } else if (visitDate < today) {
      newErrors.visitDate = "Visit date cannot be in the past.";
    }

    if (!selectedSlot) {
      newErrors.selectedSlot = "Please select a time slot.";
    } else {
      const remaining = slotCapacities[selectedSlot] ?? SLOT_CAPACITY;
      if (visitors > remaining) {
        newErrors.selectedSlot = `Only ${remaining} spot${remaining === 1 ? "" : "s"} left in this slot.`;
      }
    }

    if (visitors < 1 || visitors > 10) {
      newErrors.visitors = "Number of visitors must be between 1 and 10.";
    }

    return newErrors;
  }

  function handleConfirm(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const bookingId = `HX-${Date.now()}`;

    // Save booking to localStorage
    const existing = JSON.parse(
      localStorage.getItem("heritagex_bookings") || "[]"
    );
    const newBooking = {
      id: bookingId,
      monumentName: site.name,
      monumentId: id,
      date: visitDate,
      timeSlot: selectedSlot,
      visitorCount: visitors,
      totalPrice,
    };
    localStorage.setItem(
      "heritagex_bookings",
      JSON.stringify([...existing, newBooking])
    );

    // Update slot capacities in localStorage
    const slots = JSON.parse(
      localStorage.getItem("heritagex_slots") || "{}"
    );
    if (!slots[id]) slots[id] = {};
    slots[id][selectedSlot] =
      (slots[id][selectedSlot] !== undefined
        ? slots[id][selectedSlot]
        : SLOT_CAPACITY) - visitors;
    localStorage.setItem("heritagex_slots", JSON.stringify(slots));

    // Update local state for immediate UI feedback
    setSlotCapacities((prev) => ({
      ...prev,
      [selectedSlot]: (prev[selectedSlot] ?? SLOT_CAPACITY) - visitors,
    }));

    setBooking(newBooking);
  }

  // ── Confirmation Screen ───────────────────────────────────────────────
  if (booking) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="border-b border-slate-200 bg-slate-50/70">
          <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Booking Confirmed
            </span>
            <h1 className="text-3xl font-bold text-slate-900">
              You&apos;re all set!
            </h1>
            <p className="text-slate-500 mt-1">
              Your visit to {site.name} has been booked successfully.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            {/* Success icon */}
            <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-6">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-slate-900 text-center mb-6">
              Booking Confirmation
            </h2>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Booking ID</span>
                <span className="font-mono font-bold text-blue-700">
                  {booking.id}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Monument</span>
                <span className="font-semibold text-slate-900">
                  {booking.monumentName}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Visit Date</span>
                <span className="font-semibold text-slate-900">
                  {booking.date}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Time Slot</span>
                <span className="font-semibold text-slate-900">
                  {booking.timeSlot}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Visitors</span>
                <span className="font-semibold text-slate-900">
                  {booking.visitorCount}{" "}
                  {booking.visitorCount === 1 ? "person" : "people"}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-500 font-medium">Total Price</span>
                <span className="font-bold text-lg text-emerald-700">
                  {booking.totalPrice === 0
                    ? "Free Entry"
                    : `\u20B9${booking.totalPrice}`}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/bookings"
                className="flex-1 text-center bg-blue-700 hover:bg-blue-800 text-white rounded-xl px-5 py-3 text-sm font-semibold transition-colors"
              >
                View My Bookings
              </Link>
              <Link
                href="/sites"
                className="flex-1 text-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl px-5 py-3 text-sm font-semibold transition-colors"
              >
                Explore More Sites
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Booking Form ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="border-b border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href={`/sites/${id}`}
            className="inline-flex items-center gap-1 text-sm text-blue-700 hover:text-blue-800 font-medium mb-4 transition-colors"
          >
            ← Back to {site.name}
          </Link>
          <span className="block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
            Book a Visit
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Book Your Visit
          </h1>
          <p className="text-slate-500 mt-1 text-base">
            Complete the form below to reserve your spot at {site.name}.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ── Left: Booking Form ── */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleConfirm}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
            >
              <h2 className="text-lg font-bold text-slate-900">
                Booking Details
              </h2>

              {/* Visit Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Visit Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={visitDate}
                  onChange={(e) => {
                    setVisitDate(e.target.value);
                    setErrors((prev) => ({ ...prev, visitDate: undefined }));
                  }}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.visitDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.visitDate}</p>
                )}
              </div>

              {/* Number of Visitors */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Number of Visitors
                </label>
                <select
                  value={visitors}
                  onChange={(e) => {
                    setVisitors(Number(e.target.value));
                    setErrors((prev) => ({ ...prev, visitors: undefined }));
                  }}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "person" : "people"}
                    </option>
                  ))}
                </select>
                {errors.visitors && (
                  <p className="text-red-500 text-xs mt-1">{errors.visitors}</p>
                )}
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Select a Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const remaining = slotCapacities[slot] ?? SLOT_CAPACITY;
                    const isFull = remaining === 0;
                    const isLow = remaining > 0 && remaining <= 10;
                    const isSelected = selectedSlot === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isFull}
                        onClick={() => {
                          if (!isFull) {
                            setSelectedSlot(slot);
                            setErrors((prev) => ({
                              ...prev,
                              selectedSlot: undefined,
                            }));
                          }
                        }}
                        className={`text-left rounded-xl border p-4 transition-all ${
                          isFull
                            ? "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed"
                            : isSelected
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                            : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                              isSelected
                                ? "border-blue-600 bg-blue-600"
                                : "border-slate-300"
                            }`}
                          />
                          <span className="text-sm font-semibold text-slate-900">
                            {slot}
                          </span>
                        </div>
                        <div className="ml-6">
                          {isFull ? (
                            <span className="text-xs font-medium text-red-500">
                              Fully Booked
                            </span>
                          ) : (
                            <span
                              className={`text-xs font-medium ${
                                isLow ? "text-amber-600" : "text-emerald-600"
                              }`}
                            >
                              {remaining} spot{remaining === 1 ? "" : "s"}{" "}
                              remaining
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.selectedSlot && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.selectedSlot}
                  </p>
                )}
              </div>

              {/* Price Summary */}
              {basePrice > 0 ? (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">
                      Ticket price × {visitors} visitor{visitors > 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold text-slate-900">
                      &#8377;{basePrice} × {visitors}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t border-slate-200 pt-2 mt-2">
                    <span className="text-slate-900">Total</span>
                    <span className="text-blue-700">&#8377;{totalPrice}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <p className="text-sm font-semibold text-emerald-700">
                    Free Entry — No ticket charges for this monument.
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-xl px-6 py-3 text-sm font-bold transition-colors"
              >
                Confirm Booking
              </button>
            </form>
          </div>

          {/* ── Right: Monument Info Card ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
              <div className="relative h-48 w-full">
                <Image
                  src={site.image}
                  alt={site.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {site.name}
                  </h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {site.fullLocation}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                  <p className="font-semibold text-slate-700">Ticket Prices</p>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Indian</span>
                    <span className="font-medium text-slate-900">
                      {site.ticketPrices.indian}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Foreign</span>
                    <span className="font-medium text-slate-900">
                      {site.ticketPrices.foreign}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 text-sm">
                  <p className="font-semibold text-slate-700 mb-1">
                    Opening Hours
                  </p>
                  <p className="text-slate-500">{site.openingHours}</p>
                </div>

                <div className="border-t border-slate-100 pt-4 text-sm">
                  <p className="text-slate-400 text-xs">
                    * Prices shown are base entry fees. Refer to the official
                    site for complete pricing details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

