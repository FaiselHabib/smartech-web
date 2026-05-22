// =============================================================================
//  Supabase Database types — kept hand-written so we don't depend on
//  `supabase gen types` for the first deployment.  Mirrors the schema in
//  supabase/migrations/0001_init.sql exactly.
//
//  IMPORTANT: We use `type` (not `interface`) for the row shapes so they have
//  an implicit string index signature — otherwise they don't satisfy
//  supabase-js's `Record<string, unknown>` GenericTable constraint and the
//  Schema collapses to `never`, breaking every typed query.
// =============================================================================

export type ProjectCategoryDB =
  | "systems"
  | "media"
  | "website"
  | "app"
  | "dashboard"
  | "drone"
  | "branding";

export type ContentStatus = "draft" | "published";

export type RequestType =
  | "general"
  | "quote"
  | "software"
  | "media"
  | "both"
  | "consultation";

export type RequestStatus = "new" | "in_progress" | "replied" | "closed";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectRow = {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string | null;
  category: ProjectCategoryDB;
  client_name: string | null;
  short_description: string | null;
  full_description: string | null;
  problem: string | null;
  solution: string | null;
  impact: string | null;
  services: string[];
  technologies: string[];
  cover_image: string | null;
  gallery: string[];
  status: ContentStatus;
  featured: boolean;
  project_date: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPostRow = {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string | null;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  category: string | null;
  tags: string[];
  author: string | null;
  reading_time: number | null;
  status: ContentStatus;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type ContactRequestRow = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  company: string | null;
  project_type: RequestType;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  source_page: string | null;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Profile>;
        Relationships: [];
      };
      projects: {
        Row: ProjectRow;
        Insert: {
          id?: string;
          slug: string;
          title_ar: string;
          title_en?: string | null;
          category?: ProjectCategoryDB;
          client_name?: string | null;
          short_description?: string | null;
          full_description?: string | null;
          problem?: string | null;
          solution?: string | null;
          impact?: string | null;
          services?: string[];
          technologies?: string[];
          cover_image?: string | null;
          gallery?: string[];
          status?: ContentStatus;
          featured?: boolean;
          project_date?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<ProjectRow>;
        Relationships: [];
      };
      blog_posts: {
        Row: BlogPostRow;
        Insert: {
          id?: string;
          slug: string;
          title_ar: string;
          title_en?: string | null;
          excerpt?: string | null;
          content?: string | null;
          cover_image?: string | null;
          category?: string | null;
          tags?: string[];
          author?: string | null;
          reading_time?: number | null;
          status?: ContentStatus;
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<BlogPostRow>;
        Relationships: [];
      };
      contact_requests: {
        Row: ContactRequestRow;
        Insert: {
          id?: string;
          full_name: string;
          phone: string;
          email?: string | null;
          company?: string | null;
          project_type?: RequestType;
          budget?: string | null;
          timeline?: string | null;
          message?: string | null;
          source_page?: string | null;
          status?: RequestStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<ContactRequestRow>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: { uid: string };
        Returns: boolean;
      };
    };
    Enums: {
      project_category: ProjectCategoryDB;
      content_status: ContentStatus;
      request_type: RequestType;
      request_status: RequestStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
