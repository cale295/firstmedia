import { useState, useCallback } from "react";
import { packagesService } from "@/services/packages.service";
import { Database } from "@/types/database.types";

type Package = Database["public"]["Tables"]["packages"]["Row"];
type PackageInsert = Database["public"]["Tables"]["packages"]["Insert"];
type PackageUpdate = Database["public"]["Tables"]["packages"]["Update"];

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await packagesService.getAll();
      setPackages(data);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPackage = async (pkg: PackageInsert) => {
    setLoading(true);
    try {
      const { data: newPkg, replacedPopular } = await packagesService.create(pkg);
      setPackages((prev) => {
        const cleaned = replacedPopular
          ? prev.map((p) => ({ ...p, is_popular: false }))
          : prev;
        return [newPkg, ...cleaned];
      });
      return { data: newPkg, replacedPopular };
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePackage = async (id: string, pkg: PackageUpdate) => {
    setLoading(true);
    try {
      const { data: updatedPkg, replacedPopular } = await packagesService.update(id, pkg);
      setPackages((prev) =>
        prev.map((p) => {
          let updatedItem = p.id === id ? updatedPkg : p;
          if (replacedPopular && p.id !== id) {
            updatedItem = { ...updatedItem, is_popular: false };
          }
          return updatedItem;
        })
      );
      return { data: updatedPkg, replacedPopular };
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (id: string) => {
    setLoading(true);
    try {
      await packagesService.delete(id);
      setPackages((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    packages,
    loading,
    error,
    fetchPackages,
    createPackage,
    updatePackage,
    deletePackage,
  };
}
