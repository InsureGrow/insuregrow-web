'use client';

import { useState } from 'react';

export type LeadFormProps = { onSuccess?: () => void };

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // TODO: your submit logic
      await new Promise(r => setTimeout(r, 200));
      onSuccess?.(); // fire callback
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" placeholder="Your name" className="border p-2 w-full" required />
      <input name="phone" placeholder="Phone" className="border p-2 w-full" required />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-black text-white">
        {loading ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
}
