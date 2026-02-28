import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, updateUserRole } from "@/lib/api";

export function useUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: "admin" | "user" }) =>
      updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    usersQuery,
    updateRoleMutation,
  };
}
