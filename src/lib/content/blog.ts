import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BlogPostRow } from "@/lib/supabase/types";
import { posts as staticPosts } from "@/content/blog";
import type { BlogPost } from "@/content/blog";

/** Columns needed for list/cards — deliberately excludes the heavy `content` body. */
const POST_LIST_COLUMNS =
  "slug,title_ar,excerpt,cover_image,category,reading_time,published_at,created_at";
/** Full columns for a single post page (adds the article body). */
const POST_FULL_COLUMNS = `${POST_LIST_COLUMNS},content`;

/** Abort a slow query so the page falls back to static instead of hanging. */
const QUERY_TIMEOUT_MS = 1500;

type PostPublicRow = Pick<
  BlogPostRow,
  | "slug"
  | "title_ar"
  | "excerpt"
  | "cover_image"
  | "category"
  | "reading_time"
  | "published_at"
  | "created_at"
> & { content?: string | null };

function rowToPost(row: PostPublicRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title_ar,
    excerpt: row.excerpt ?? "",
    cover: row.cover_image ?? "/blog/placeholder.jpg",
    category: (row.category ?? "أنظمة") as BlogPost["category"],
    readingTime: row.reading_time ?? 4,
    date: (row.published_at ?? row.created_at).slice(0, 10),
    content: row.content ?? "",
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select(POST_LIST_COLUMNS)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(60)
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));

    if (error) throw error;
    if (!data || data.length === 0) return staticPosts;
    return data.map(rowToPost);
  } catch {
    return staticPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("blog_posts")
      .select(POST_FULL_COLUMNS)
      .eq("slug", slug)
      .eq("status", "published")
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS))
      .maybeSingle();
    if (data) return rowToPost(data);
  } catch {
    /* fall through */
  }
  return staticPosts.find((p) => p.slug === slug) ?? null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("status", "published")
      .limit(500)
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
    if (data && data.length) return data.map((d) => d.slug);
  } catch {
    /* fall through */
  }
  return staticPosts.map((p) => p.slug);
}
