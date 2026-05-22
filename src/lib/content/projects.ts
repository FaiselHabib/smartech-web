import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProjectRow, ProjectCategoryDB } from "@/lib/supabase/types";
import { projects as staticProjects } from "@/content/projects";
import type { Project } from "@/content/projects";

/**
 * Maps the DB row to the shape the public components already expect (`Project`).
 * The legacy enum used in static data uses plural slugs (websites/apps/dashboards)
 * while the DB uses singular (website/app/dashboard).  We normalise here.
 */
function dbCategoryToUI(c: ProjectCategoryDB): Project["categories"][number] {
  switch (c) {
    case "website":
      return "websites";
    case "app":
      return "apps";
    case "dashboard":
      return "dashboards";
    case "branding":
      return "systems";
    default:
      return c;
  }
}

function rowToProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    title: row.title_ar,
    tagline: row.short_description ?? row.title_en ?? "",
    cover: row.cover_image ?? "/portfolio/placeholder.jpg",
    categories: [dbCategoryToUI(row.category)],
    problem: row.problem ?? "",
    solution: row.solution ?? "",
    impact: row.impact ?? "",
    tech: row.technologies ?? [],
    year: row.project_date
      ? new Date(row.project_date).getFullYear().toString()
      : new Date(row.created_at).getFullYear().toString(),
  };
}

/**
 * Returns published projects from Supabase.  Falls back to the bundled static
 * data when Supabase isn't reachable / not configured / empty — so the public
 * site keeps working pre-launch and during outages.
 */
export async function getPublicProjects(): Promise<Project[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return staticProjects;
    return data.map(rowToProject);
  } catch {
    return staticProjects;
  }
}

export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    if (!data || data.length === 0) {
      return staticProjects.slice(0, limit);
    }
    return data.map(rowToProject);
  } catch {
    return staticProjects.slice(0, limit);
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (data) return rowToProject(data);
  } catch {
    /* fall through */
  }
  return staticProjects.find((p) => p.slug === slug) ?? null;
}
