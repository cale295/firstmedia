import { useState, useCallback } from "react";
import { promosService } from "@/services/promos.service";
import { Database } from "@/types/database.types";

type Promo = Database["public"]["Tables"]["promos"]["Row"];
type PromoInsert = Database["public"]["Tables"]["promos"]["Insert"];
type PromoUpdate = Database["public"]["Tables"]["promos"]["Update"];

export function usePromos() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPromos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await promosService.getAll();
      setPromos(data);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPromo = async (promo: PromoInsert) => {
    setLoading(true);
    try {
      const newPromo = await promosService.create(promo);
      setPromos((prev) => [newPromo, ...prev]);
      return newPromo;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePromo = async (id: string, promo: PromoUpdate) => {
    setLoading(true);
    try {
      const updatedPromo = await promosService.update(id, promo);
      setPromos((prev) => prev.map((p) => (p.id === id ? updatedPromo : p)));
      return updatedPromo;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePromo = async (id: string) => {
    setLoading(true);
    try {
      await promosService.delete(id);
      setPromos((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    promos,
    loading,
    error,
    fetchPromos,
    createPromo,
    updatePromo,
    deletePromo,
  };
}
