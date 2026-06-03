import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

const supabase = createClient();
type Package = Database["public"]["Tables"]["packages"]["Row"];
type PackageInsert = Database["public"]["Tables"]["packages"]["Insert"];
type PackageUpdate = Database["public"]["Tables"]["packages"]["Update"];

export const packagesService = {
  async getAll() {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("is_popular", { ascending: false })
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data;
  },
  
  async getActive() {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("active", true)
      .order("is_popular", { ascending: false })
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data;
  },

  async getActiveCount() {
    const { count, error } = await supabase
      .from("packages")
      .select("*", { count: "exact", head: true })
      .eq("active", true);
    if (error) throw error;
    return count ?? 0;
  },

  async create(pkg: PackageInsert) {
    let replacedPopular = false;
    if (pkg.is_popular) {
      const { data: existingPopular } = await supabase
        .from("packages")
        .select("id")
        .eq("is_popular", true);
      if (existingPopular && existingPopular.length > 0) {
        replacedPopular = true;
        await supabase
          .from("packages")
          .update({ is_popular: false })
          .eq("is_popular", true);
      }
    }
    const { data, error } = await supabase.from("packages").insert(pkg).select().single();
    if (error) throw error;
    return { data, replacedPopular };
  },

  async update(id: string, pkg: PackageUpdate) {
    let replacedPopular = false;
    if (pkg.is_popular) {
      const { data: existingPopular } = await supabase
        .from("packages")
        .select("id")
        .eq("is_popular", true)
        .neq("id", id);
      if (existingPopular && existingPopular.length > 0) {
        replacedPopular = true;
        await supabase
          .from("packages")
          .update({ is_popular: false })
          .eq("is_popular", true)
          .neq("id", id);
      }
    }
    const { data, error } = await supabase
      .from("packages")
      .update(pkg)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return { data, replacedPopular };
  },

  async delete(id: string) {
    const { error } = await supabase.from("packages").delete().eq("id", id);
    if (error) throw error;
    return true;
  }
};
