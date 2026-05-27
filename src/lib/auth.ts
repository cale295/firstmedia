import { createClient } from "@/lib/supabase/server";

export async function getAdminUser() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data: admin } = await supabase
      .from("admins")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!admin) return null;

    return { user, admin };
  } catch (error) {
    console.error("Auth helper error:", error);
    return null;
  }
}
