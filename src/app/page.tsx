import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">InsureGrow</h1>
        <Link href="/blog" className="text-sm font-medium text-indigo-600 hover:underline">
          Blog
        </Link>
      </header>

      {/* Highlight the blog */}
      <section className="rounded-2xl border bg-gradient-to-br from-indigo-50 to-white p-6">
        <h2 className="text-2xl font-semibold">Latest from the blog</h2>
        <p className="mt-1 text-slate-600">
          Guides on term insurance, FnA, underwriting, and more.
        </p>
        <div className="mt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-white"
          >
            Explore posts →
          </Link>
        </div>
      </section>
    </main>
  );
}
