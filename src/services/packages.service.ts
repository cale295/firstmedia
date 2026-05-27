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
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  
  async getActive() {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("active", true)
      .order("price", { ascending: true });
    if (error) throw error;
    return data;
  },

  async create(pkg: PackageInsert) {
    const { data, error } = await supabase.from("packages").insert(pkg).select().single();
    if (error) throw error;
    return data;
  },

  async update(id: string, pkg: PackageUpdate) {
    const { data, error } = await supabase
      .from("packages")
      .update(pkg)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from("packages").delete().eq("id", id);
    if (error) throw error;
    return true;
  }
};
