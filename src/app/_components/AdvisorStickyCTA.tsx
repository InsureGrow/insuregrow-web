"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy-load the form so it doesn't render until opened
const LeadForm = dynamic(() => import("./LeadForm"), { ssr: false });

export default function AdvisorStickyCTA() {
  const [open, setOpen] = useState(false);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock background scroll when modal is open
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <>
      {/* Sticky CTA bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto max-w-5xl px-3 pb-3">
          <div className="flex items-center justify-center rounded-t-2xl border bg-white/90 p-2 shadow-lg backdrop-blur">
            <button
              onClick={() => setOpen(true)}
              className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md
                         bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600
                         bg-[length:200%_100%] animate-shine hover:opacity-95"
              aria-haspopup="dialog"
              aria-expanded={open}
            >
              Consult IRDAI registered advisor
            </button>
          </div>
        </div>
      </div>

      {/* Modal mounts only when open */}
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Consult advisor form">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          {/* Panel */}
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-2xl rounded-t-2xl border bg-white p-4 shadow-2xl">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-base font-semibold">Talk to an advisor</h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
                aria-label="Close form"
              >
                Close
              </button>
            </div>

            {/* Close modal after successful submit */}
            <LeadForm onSuccess={() => setOpen(false)} />

            <p className="mt-2 text-[11px] text-slate-500">
              By submitting, you agree to be contacted about insurance advisory. No spam.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
