"use client";

import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { DataTable } from "@/components/admin/DataTable";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, ExternalLink } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const { data: products, isLoading } = useProducts();
  const deleteMutation = useDeleteProduct();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteMutation.mutateAsync(deleteId);
        toast.success("Project deleted successfully");
        setDeleteId(null);
      } catch (error) {
        toast.error("Failed to delete project");
        console.error("Delete error", error);
      }
    }
  };

  const columns = [
    {
      header: "Project Title",
      accessorKey: "title",
      cell: (item: any) => (
        <div className="flex flex-col">
          <span className="font-semibold">{item.title}</span>
          <span className="text-xs text-muted-foreground">{item.slug}</span>
        </div>
      ),
    },
    {
      header: "Technologies",
      accessorKey: "technologies",
      cell: (item: any) => (
        <div className="flex flex-wrap gap-1">
          {item.technologies?.slice(0, 3).map((tech: string) => (
            <Badge key={tech} variant="outline" className="text-[10px]">
              {tech}
            </Badge>
          ))}
          {item.technologies?.length > 3 && (
            <span className="text-[10px] text-muted-foreground">+{item.technologies.length - 3} more</span>
          )}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "featured",
      cell: (item: any) => (
        <Badge variant={item.featured ? "default" : "secondary"}>
          {item.featured ? "Featured" : "Standard"}
        </Badge>
      ),
    },
    {
      header: "Date",
      accessorKey: "created_at",
      cell: (item: any) => new Date(item.created_at).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <ProductFormModal 
            initialData={item}
            trigger={
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                <Edit2 className="h-4 w-4" />
              </Button>
            }
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive"
            onClick={() => setDeleteId(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <a href={`/projects/${item.slug}`} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
         </div>
         <div className="h-[400px] w-full animate-pulse rounded-md bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your portfolio projects and works.
          </p>
        </div>
        <ProductFormModal />
      </div>

      <DataTable 
        data={products || []} 
        columns={columns} 
        searchKey="title" 
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your project
              from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Deleting..." : "Delete Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
