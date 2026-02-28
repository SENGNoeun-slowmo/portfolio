"use client";

import { useForm } from "react-hook-form";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";

interface ProductFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export function ProductForm({ initialData, onSuccess }: ProductFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData || {
      title: "",
      slug: "",
      short_description: "",
      description: "",
      role: "",
      duration: "",
      year: new Date().getFullYear(),
      technologies: "",
      featured: false,
      order: 0,
    }
  });

  const [images, setImages] = useState<File[]>([]);
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const isEditing = !!initialData?.id;
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'technologies') {
        const techs = data[key].split(',').map((s: string) => s.trim());
        formData.append(key, JSON.stringify(techs));
      } else {
        formData.append(key, data[key]);
      }
    });

    images.forEach(image => {
      formData.append('images', image);
    });

    if (isEditing) {
      await updateMutation.mutateAsync({ id: initialData.id, formData });
    } else {
      await createMutation.mutateAsync(formData);
    }

    reset();
    setImages([]);
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-white/50 uppercase tracking-widest">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
            placeholder="E.g. NeuroSphere AI"
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-white/50 uppercase tracking-widest">Slug</label>
          <input
            {...register("slug", { required: "Slug is required" })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
            placeholder="e.g. neurosphere-ai"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-white/50 uppercase tracking-widest">Technologies (comma separated)</label>
        <input
          {...register("technologies")}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
          placeholder="Next.js, Tailwind, TypeScript"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-white/50 uppercase tracking-widest">Images</label>
        <div className="flex flex-wrap gap-4">
          <label className="w-24 h-24 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 hover:border-neon-cyan transition-colors cursor-pointer bg-white/5">
            <Plus className="h-6 w-6 text-white/50" />
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) setImages([...images, ...Array.from(e.target.files)]);
              }}
            />
          </label>
          {images.map((img, i) => (
            <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden group">
              <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 rounded-xl bg-neon-cyan text-black font-bold uppercase tracking-widest hover:bg-neon-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg shadow-neon-cyan/20"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (isEditing ? "Update Project" : "Create Project")}
      </button>
    </form>
  );
}
