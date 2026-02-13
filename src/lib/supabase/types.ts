export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          is_popular: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          is_popular?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          is_popular?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subcategories: {
        Row: {
          id: string;
          category_id: string;
          title: string;
          slug: string;
          description: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          title: string;
          slug: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      websites: {
        Row: {
          id: string;
          subcategory_id: string;
          name: string;
          slug: string;
          url: string;
          domain: string;
          short_description: string | null;
          long_description: string | null;
          logo_url: string | null;
          accent_color: string | null;
          is_featured: boolean;
          is_active: boolean;
          tags: string[];
          badges: string[];
          is_new: boolean;
          global_trending_rank: number | null;
          sort_order: number;
          metadata: Json;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subcategory_id: string;
          name: string;
          slug: string;
          url: string;
          domain: string;
          short_description?: string | null;
          long_description?: string | null;
          logo_url?: string | null;
          accent_color?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          tags?: string[];
          badges?: string[];
          is_new?: boolean;
          global_trending_rank?: number | null;
          sort_order?: number;
          metadata?: Json;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subcategory_id?: string;
          name?: string;
          slug?: string;
          url?: string;
          domain?: string;
          short_description?: string | null;
          long_description?: string | null;
          logo_url?: string | null;
          accent_color?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          tags?: string[];
          badges?: string[];
          is_new?: boolean;
          global_trending_rank?: number | null;
          sort_order?: number;
          metadata?: Json;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "websites_subcategory_id_fkey";
            columns: ["subcategory_id"];
            referencedRelation: "subcategories";
            referencedColumns: ["id"];
          },
        ];
      };
      website_trending: {
        Row: {
          id: string;
          website_id: string;
          scope: "global" | "category" | "subcategory";
          category_id: string | null;
          subcategory_id: string | null;
          rank_position: number;
          rank_score: number;
          measured_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          website_id: string;
          scope: "global" | "category" | "subcategory";
          category_id?: string | null;
          subcategory_id?: string | null;
          rank_position: number;
          rank_score?: number;
          measured_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          website_id?: string;
          scope?: "global" | "category" | "subcategory";
          category_id?: string | null;
          subcategory_id?: string | null;
          rank_position?: number;
          rank_score?: number;
          measured_at?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "website_trending_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "website_trending_subcategory_id_fkey";
            columns: ["subcategory_id"];
            referencedRelation: "subcategories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "website_trending_website_id_fkey";
            columns: ["website_id"];
            referencedRelation: "websites";
            referencedColumns: ["id"];
          },
        ];
      };
      user_favourites: {
        Row: {
          user_id: string;
          website_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          website_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          website_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_favourites_website_id_fkey";
            columns: ["website_id"];
            referencedRelation: "websites";
            referencedColumns: ["id"];
          },
        ];
      };
      user_events: {
        Row: {
          id: number;
          user_id: string | null;
          website_id: string | null;
          event_type: "search" | "view" | "click" | "favourite_add" | "favourite_remove";
          query: string | null;
          context: Json;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id?: string | null;
          website_id?: string | null;
          event_type: "search" | "view" | "click" | "favourite_add" | "favourite_remove";
          query?: string | null;
          context?: Json;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string | null;
          website_id?: string | null;
          event_type?: "search" | "view" | "click" | "favourite_add" | "favourite_remove";
          query?: string | null;
          context?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_events_website_id_fkey";
            columns: ["website_id"];
            referencedRelation: "websites";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      website_directory: {
        Row: {
          id: string;
          name: string;
          slug: string;
          url: string;
          domain: string;
          short_description: string | null;
          logo_url: string | null;
          accent_color: string | null;
          is_featured: boolean;
          tags: string[];
          badges: string[];
          is_new: boolean;
          global_trending_rank: number | null;
          is_active: boolean;
          sort_order: number;
          category_id: string;
          category_title: string;
          category_slug: string;
          subcategory_id: string;
          subcategory_title: string;
          subcategory_slug: string;
        };
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
