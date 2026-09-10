import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600;

export const metadata = {
  title: "Financial Literacy Blog | Sonkhela Soft Loans",
  description: "Practical money tips for Zambians, published every Friday by Sonkhela Soft Loans.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, category, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F97316] sm:text-sm sm:tracking-[0.3em]">Financial Literacy</p>
        <h1 className="mt-3 text-3xl font-extrabold text-[#0B1F4D] sm:text-4xl">Money Tips That Work</h1>
        <p className="mt-3 text-gray-600">Practical advice for managing your money, published every Friday.</p>

        <div className="mt-10 space-y-5">
          {(posts || []).map((post) => (
            <Link key={post.slug} href={"/blog/" + post.slug} className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-[#F97316] hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#F97316]">{post.category}</p>
              <h2 className="mt-2 text-xl font-bold text-[#0B1F4D]">{post.title}</h2>
              {post.excerpt && (<p className="mt-2 text-gray-600">{post.excerpt}</p>)}
              <p className="mt-4 text-sm text-gray-400">{formatDate(post.published_at)}</p>
            </Link>
          ))}

          {(!posts || posts.length === 0) && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
              Our first post is coming this Friday. Check back soon!
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
