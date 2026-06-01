import { useState, useEffect, useCallback } from "react";
import { packagesService } from "@/services/packages.service";
import { areasService } from "@/services/areas.service";

export interface DashboardStats {
  activePackagesCount: number | null;
  activeAreasCount: number | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useDashboardStats(): DashboardStats {
  const [stats, setStats] = useState<{
    activePackagesCount: number | null;
    activeAreasCount: number | null;
  }>({
    activePackagesCount: null,
    activeAreasCount: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [packageCount, areaCount] = await Promise.all([
        packagesService.getActiveCount(),
        areasService.getActiveCount(),
      ]);
      setStats({
        activePackagesCount: packageCount,
        activeAreasCount: areaCount,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error("Failed to fetch dashboard stats"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    ...stats,
    loading,
    error,
    refresh: fetchStats,
  };
}
