import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/lib/api";

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    refetchInterval: 60000, // Refresh every minute
  });
}
