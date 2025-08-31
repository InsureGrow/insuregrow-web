import BlogCard, { BlogMeta } from "../_components/BlogCard";

export const metadata = {
  title: "Blog | InsureGrow",
  description: "Articles on term insurance, FnA, quotes, underwriting and more.",
};

const posts: BlogMeta[] = [
  {
    slug: "term-insurance-101",
    title: "Term Insurance 101: What to buy (and what to skip)",
    description:
      "A quick, no-BS guide to sum assured, claim ratios, riders, and how to compare term plans without getting lost.",
    date: "2025-08-31",
    tags: ["term", "basics"],
  },
  {
    slug: "fna-quick-guide",
    title: "Financial Needs Analysis (FnA): A 10-minute playbook",
    description:
      "Simple framework to align cover, emergency fund, and investment buckets to your actual life goals.",
    date: "2025-08-31",
    tags: ["FnA", "planning"],
  },
];

export default function BlogIndex() {
  return (
    <main className="relative">
      {/* soft background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-white to-white"
      />
      {/* subtle decorative blob */}
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-indigo-200/40 blur-3xl"
      />

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">InsureGrow Blog</h1>
          <p className="mt-2 text-slate-600">
            Bite-sized posts on life insurance, FnA, quotes, application, and more.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
