"use client";

import { useUsers } from "@/hooks/useUsers";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, ShieldCheck, UserCog } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const { usersQuery, updateRoleMutation } = useUsers();
  const { data: users, isLoading } = usersQuery;

  const handleRoleChange = async (userId: string, newRole: "admin" | "user") => {
    try {
      await updateRoleMutation.mutateAsync({ id: userId, role: newRole });
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error("Failed to update user role");
      console.error("Failed to update role", error);
    }
  };

  const columns = [
    {
      header: "User",
      accessorKey: "full_name",
      cell: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs uppercase">
            {item.full_name?.charAt(0) || "U"}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{item.full_name}</span>
            <span className="text-xs text-muted-foreground">{item.id.slice(0, 8)}...</span>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: (item: any) => (
        <Badge variant={item.role === "admin" ? "default" : "secondary"} className="gap-1">
          {item.role === "admin" ? <ShieldCheck className="h-3 w-3" /> : <UserCog className="h-3 w-3" />}
          {item.role.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: "Joined At",
      accessorKey: "created_at",
      cell: (item: any) => new Date(item.created_at).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (item: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">Manage</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => handleRoleChange(item.id, item.role === "admin" ? "user" : "admin")}
              className="gap-2"
            >
              {item.role === "admin" ? (
                <>
                  <ShieldAlert className="h-4 w-4 text-rose-500" />
                  <span>Demote to User</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Promote to Admin</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 w-48 bg-muted rounded" />
      <div className="h-[400px] w-full bg-muted rounded" />
    </div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">
          Manage user roles and permissions.
        </p>
      </div>

      <DataTable 
        data={users || []} 
        columns={columns} 
        searchKey="full_name" 
      />
    </div>
  );
}
