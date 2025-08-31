'use client';

import { useState } from 'react';

export type LeadFormProps = {
  onSuccess?: () => void;
};

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: replace with your real submit logic (fetch/Supabase)
      await new Promise<void>((resolve) => setTimeout(resolve, 200));
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
      <input name="name" placeholder="Your name" className="border p-2 w-full" required />
      <input name="phone" placeholder="Phone" className="border p-2 w-full" required />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-black text-white">
        {loading ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
}
