"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/ProductForm";
import { Plus } from "lucide-react";
import { useState } from "react";

interface ProductFormModalProps {
  initialData?: any;
  trigger?: React.ReactNode;
}

export function ProductFormModal({ initialData, trigger }: ProductFormModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Project" : "Add New Project"}</DialogTitle>
          <DialogDescription>
            Fill in the details below to {initialData ? "update" : "create"} your project.
          </DialogDescription>
        </DialogHeader>
        <ProductForm 
           initialData={initialData} 
           onSuccess={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
