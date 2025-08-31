import Link from "next/link";

export type BlogMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO like "2025-08-31"
  tags?: string[];
};

export default function BlogCard({ post }: { post: BlogMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
        <span className="shrink-0 text-xs text-slate-500">
          {new Date(post.date).toLocaleDateString()}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600 line-clamp-3">{post.description}</p>
      {post.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border px-2 py-0.5 text-[11px] text-slate-600"
            >
              #{t}
            </span>
          ))}
        </div>
      ) : null}
      <div className="mt-4 text-sm font-medium text-indigo-600 group-hover:underline">
        Read →
      </div>
    </Link>
  );
}
