import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

const supabase = createClient();
type Area = Database["public"]["Tables"]["areas"]["Row"];
type AreaInsert = Database["public"]["Tables"]["areas"]["Insert"];
type AreaUpdate = Database["public"]["Tables"]["areas"]["Update"];

export const areasService = {
  async getAll() {
    const { data, error } = await supabase
      .from("areas")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  
  async getActive() {
    const { data, error } = await supabase
      .from("areas")
      .select("*")
      .eq("active", true)
      .order("city", { ascending: true });
    if (error) throw error;
    return data;
  },

  async getActiveCount() {
    const { count, error } = await supabase
      .from("areas")
      .select("*", { count: "exact", head: true })
      .eq("active", true);
    if (error) throw error;
    return count ?? 0;
  },

  async create(area: AreaInsert) {
    const { data, error } = await supabase.from("areas").insert(area).select().single();
    if (error) throw error;
    return data;
  },

  async update(id: string, area: AreaUpdate) {
    const { data, error } = await supabase
      .from("areas")
      .update(area)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from("areas").delete().eq("id", id);
    if (error) throw error;
    return true;
  }
};
