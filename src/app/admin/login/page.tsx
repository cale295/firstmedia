"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Router, Loader2, Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !data.user) {
        setError(authError?.message || "Invalid credentials.");
        return;
      }

      // Check if user is inside the admin table (Role Check)
      const { data: admin, error: adminError } = await supabase
        .from("admins")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle();

      console.log("USER ID:", data.user.id);
      console.log("ADMIN:", admin);
      console.log("ADMIN ERROR:", adminError);

      if (adminError || !admin || !admin.role) {
        setError("Unauthorized: You do not have valid admin privileges.");
        await supabase.auth.signOut();
        return;
      }

      router.push("/admin/dashboard");
      router.refresh(); // Triggers middleware redirect refresh
    } catch (err: any) {
      console.error("Unexpected error during login:", err);
      setError(err?.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-brand-50 p-3.5 rounded-2xl mb-4 text-brand-800 border border-brand-100">
            <Router className="w-8 h-8" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-brand-900 tracking-tight">Admin Portal</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">Secure access to ISP content management</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 text-center font-medium shadow-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-xl relative block w-full pl-12 pr-4 py-4 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent-500 transition sm:text-sm bg-white shadow-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-xl relative block w-full pl-12 pr-4 py-4 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent-500 transition sm:text-sm bg-white shadow-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-accent-500 hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Authenticate"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
