import { useState, useCallback } from "react";
import { areasService } from "@/services/areas.service";
import { Database } from "@/types/database.types";

type Area = Database["public"]["Tables"]["areas"]["Row"];
type AreaInsert = Database["public"]["Tables"]["areas"]["Insert"];
type AreaUpdate = Database["public"]["Tables"]["areas"]["Update"];

export function useAreas() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAreas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await areasService.getAll();
      setAreas(data);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createArea = async (area: AreaInsert) => {
    setLoading(true);
    try {
      const newArea = await areasService.create(area);
      setAreas((prev) => [newArea, ...prev]);
      return newArea;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateArea = async (id: string, area: AreaUpdate) => {
    setLoading(true);
    try {
      const updatedArea = await areasService.update(id, area);
      setAreas((prev) => prev.map((a) => (a.id === id ? updatedArea : a)));
      return updatedArea;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteArea = async (id: string) => {
    setLoading(true);
    try {
      await areasService.delete(id);
      setAreas((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    areas,
    loading,
    error,
    fetchAreas,
    createArea,
    updateArea,
    deleteArea,
  };
}
