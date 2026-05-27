import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

const supabase = createClient();
type Promo = Database["public"]["Tables"]["promos"]["Row"];
type PromoInsert = Database["public"]["Tables"]["promos"]["Insert"];
type PromoUpdate = Database["public"]["Tables"]["promos"]["Update"];

export const promosService = {
  async getAll() {
    const { data, error } = await supabase
      .from("promos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  
  async getActive() {
    const { data, error } = await supabase
      .from("promos")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(promo: PromoInsert) {
    const { data, error } = await supabase.from("promos").insert(promo).select().single();
    if (error) throw error;
    return data;
  },

  async update(id: string, promo: PromoUpdate) {
    const { data, error } = await supabase
      .from("promos")
      .update(promo)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from("promos").delete().eq("id", id);
    if (error) throw error;
    return true;
  }
};
