'use client';

import { useEffect, useRef, useState, ComponentType } from 'react';
import dynamic from 'next/dynamic';

type LeadFormProps = { onSuccess?: () => void };

// Force correct props + client-only rendering for the form
const LeadForm = dynamic(() => import('./LeadForm'), { ssr: false }) as unknown as ComponentType<LeadFormProps>;

export default function AdvisorStickyCTA() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  function onOverlayMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setOpen(false);
  }

  return (
    <>
      {/* Sticky footer CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/80 backdrop-blur border-t">
        <div className="mx-auto max-w-3xl p-3 flex items-center justify-between">
          <span className="text-sm sm:text-base">Consult IRDAI registered advisor</span>
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-2xl shadow text-white bg-black"
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            Request callback
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={onOverlayMouseDown}
        >
          <div ref={dialogRef} className="bg-white rounded-2xl shadow-lg w-full max-w-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Request a Callback</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-1 rounded hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-3">
              {/* Close modal after successful submit */}
              <LeadForm onSuccess={() => setOpen(false)} />
              <p className="mt-2 text-[11px] text-slate-500">
                By submitting, you agree to be contacted about insurance advisory. No spam.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
