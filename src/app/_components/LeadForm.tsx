'use client';

import { useEffect, useState } from 'react';

export type LeadFormProps = {
  onSuccess?: () => void;
};

type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  source?: string;
};

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string>("");

  useEffect(() => {
    // capture the page URL for context (optional)
    if (typeof window !== 'undefined') {
      setSource(window.location.href);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: LeadPayload = {
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      source,
    };

    // Basic email validation (UI also enforces via input[type=email])
    const emailOk = /^\S+@\S+\.\S+$/.test(payload.email);

    if (!payload.name || !payload.email || !payload.phone || !emailOk) {
      setLoading(false);
      setError('Please fill all required fields with valid details.');
      return;
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to submit lead');
      }

      form.reset();
      onSuccess?.();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm">Full Name</label>
        <input
          id="name"
          name="name"
          placeholder="Your name"
          className="border p-2 w-full rounded"
          required
          autoComplete="name"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="border p-2 w-full rounded"
          required
          autoComplete="email"
          inputMode="email"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="phone" className="text-sm">Phone</label>
        <input
          id="phone"
          name="phone"
          placeholder="10-digit mobile"
          className="border p-2 w-full rounded"
          required
          autoComplete="tel"
          inputMode="tel"
          pattern="[0-9+\-\s()]{7,}"
          title="Enter a valid phone number"
        />
      </div>

      {/* optional, captured in state and sent in payload */}
      <input type="hidden" name="source" value={source} readOnly />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded bg-black text-white w-full"
      >
        {loading ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
}
