"use client";
import { useState } from "react";

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);
    if (res.ok) {
      setOk(true);
      form.reset();
    } else {
      const j = await res.json().catch(() => ({}));
      setErr(j?.error ?? "Something went wrong");
      setOk(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-3">
      <input name="name" placeholder="Your name" className="w-full border rounded p-2" />
      <input name="email" type="email" required placeholder="Email" className="w-full border rounded p-2" />
      <input name="phone" placeholder="Phone" className="w-full border rounded p-2" />
      <textarea name="message" placeholder="What do you need?" className="w-full border rounded p-2" />
      <button disabled={loading} className="rounded px-4 py-2 border">
        {loading ? "Submitting…" : "Send"}
      </button>
      {ok && <p className="text-sm">Thanks! I’ll get back to you.</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}
    </form>
  );
}
