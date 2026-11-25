// Server Component — resolves `params` Promise and delegates to the Client form
import { Suspense } from "react";
import BookingClient from "./BookingClient";

export async function generateStaticParams() {
  return [
    { id: "taj-mahal" },
    { id: "red-fort" },
    { id: "qutub-minar" },
    { id: "india-gate" },
  ];
}

export default async function BookingPage({ params }) {
  const { id } = await params;
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading booking page…</p>
      </div>
    }>
      <BookingClient id={id} />
    </Suspense>
  );
}
