'use client';

import { useState } from 'react';
import LeadForm from './LeadForm'; // ✅ default import

export default function AdvisorStickyCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t">
        <div className="max-w-3xl mx-auto p-3 flex items-center justify-between">
          <span className="text-sm sm:text-base">Consult IRDAI registered advisor</span>
          <button onClick={() => setOpen(true)} className="px-4 py-2 rounded bg-black text-white">
            Open form
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 max-w-md w-full">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Request a Callback</h2>
              <button onClick={() => setOpen(false)} aria-label="Close">✕</button>
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
