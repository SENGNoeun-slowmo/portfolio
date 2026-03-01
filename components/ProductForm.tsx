"use client";

import { useForm } from "react-hook-form";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";

interface ProductFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all text-sm";
const labelCls = "text-xs font-bold text-white/50 uppercase tracking-widest";
const fieldCls = "space-y-2";

export function ProductForm({ initialData, onSuccess }: ProductFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData
      ? {
          ...initialData,
          technologies: Array.isArray(initialData.technologies)
            ? initialData.technologies.join(", ")
            : initialData.technologies || "",
          metrics: initialData.metrics
            ? JSON.stringify(initialData.metrics)
            : '[{"label":"Metric","value":"Value"}]',
        }
      : {
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
          github_url: "",
          live_url: "",
          metrics: '[{"label":"Metric","value":"Value"}]',
        },
  });

  const [images, setImages] = useState<File[]>([]);
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const isEditing = !!initialData?.id;
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "technologies") {
        const techs = data[key]
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
        formData.append(key, JSON.stringify(techs));
      } else if (key === "metrics") {
        // Pass metrics as JSON string — backend stores as JSONB
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });

    images.forEach((image) => {
      formData.append("images", image);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-md"
    >
      {/* ── Row 1: Title + Slug ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={fieldCls}>
          <label className={labelCls}>Title *</label>
          <input
            {...register("title", { required: "Title is required" })}
            className={inputCls}
            placeholder="My Project"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message as string}</p>
          )}
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Slug *</label>
          <input
            {...register("slug", { required: "Slug is required" })}
            className={inputCls}
            placeholder="my-project"
          />
          {errors.slug && (
            <p className="text-red-500 text-xs">{errors.slug.message as string}</p>
          )}
        </div>
      </div>

      {/* ── Short Description ── */}
      <div className={fieldCls}>
        <label className={labelCls}>Short Description</label>
        <input
          {...register("short_description")}
          className={inputCls}
          placeholder="One-liner shown on project cards"
        />
      </div>

      {/* ── Full Description (Case Study) ── */}
      <div className={fieldCls}>
        <label className={labelCls}>Case Study — Full Description</label>
        <textarea
          {...register("description")}
          rows={5}
          className={`${inputCls} resize-none`}
          placeholder="Detailed narrative for the case study page (the challenge, approach, outcome)..."
        />
      </div>

      {/* ── Row 2: Role + Duration + Year ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={fieldCls}>
          <label className={labelCls}>Role</label>
          <input
            {...register("role")}
            className={inputCls}
            placeholder="Full-Stack Developer"
          />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Duration</label>
          <input
            {...register("duration")}
            className={inputCls}
            placeholder="2 weeks"
          />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>Year</label>
          <input
            {...register("year")}
            type="number"
            className={inputCls}
            placeholder="2025"
          />
        </div>
      </div>

      {/* ── Technologies ── */}
      <div className={fieldCls}>
        <label className={labelCls}>Technologies (comma-separated)</label>
        <input
          {...register("technologies")}
          className={inputCls}
          placeholder="Next.js, Tailwind, TypeScript"
        />
      </div>

      {/* ── Metrics JSON ── */}
      <div className={fieldCls}>
        <label className={labelCls}>Metrics (JSON array)</label>
        <textarea
          {...register("metrics")}
          rows={3}
          className={`${inputCls} font-mono text-xs resize-none`}
          placeholder='[{"label":"Speed","value":"+40%"},{"label":"Uptime","value":"99.9%"}]'
        />
        <p className="text-white/30 text-xs">
          Array of {"{ label, value }"} objects — shown as stats on the case study page.
        </p>
      </div>

      {/* ── Row 3: URLs ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={fieldCls}>
          <label className={labelCls}>Live URL</label>
          <input
            {...register("live_url")}
            className={inputCls}
            placeholder="https://myapp.vercel.app"
          />
        </div>
        <div className={fieldCls}>
          <label className={labelCls}>GitHub URL</label>
          <input
            {...register("github_url")}
            className={inputCls}
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>

      {/* ── Row 4: Featured + Order ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={fieldCls}>
          <label className={labelCls}>Display Order</label>
          <input
            {...register("order")}
            type="number"
            className={inputCls}
            placeholder="0"
          />
        </div>
        <div className="flex items-center gap-3 pt-7">
          <input
            {...register("featured")}
            type="checkbox"
            id="featured"
            className="h-4 w-4 rounded border-white/20 bg-white/5 accent-neon-cyan"
          />
          <label htmlFor="featured" className={labelCls}>
            Featured on Homepage
          </label>
        </div>
      </div>

      {/* ── Image Upload ── */}
      <div className={fieldCls}>
        <label className={labelCls}>Images</label>
        <div className="flex flex-wrap gap-4">
          <label className="w-24 h-24 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 hover:border-neon-cyan transition-colors cursor-pointer bg-white/5">
            <Plus className="h-6 w-6 text-white/50" />
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files)
                  setImages([...images, ...Array.from(e.target.files)]);
              }}
            />
          </label>
          {images.map((img, i) => (
            <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden group">
              <img
                src={URL.createObjectURL(img)}
                className="w-full h-full object-cover"
                alt=""
              />
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

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 rounded-xl bg-neon-cyan text-black font-bold uppercase tracking-widest hover:bg-neon-cyan/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg shadow-neon-cyan/20"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isEditing ? (
          "Update Project"
        ) : (
          "Create Project"
        )}
      </button>
    </form>
  );
}
