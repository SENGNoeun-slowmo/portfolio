"use client";

import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const sort = searchParams.get("sort") || undefined;

  const { data: projects, isLoading, isError, error } = useProducts({ category, sort });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-neon-cyan" />
        <p className="text-lg font-medium text-white/50">Loading amazing works...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg font-medium text-white/50">Error: {(error as any)?.message || "Failed to fetch projects"}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-neon-cyan transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="font-serif text-4xl font-bold md:text-5xl lg:text-7xl mb-4">
            Archive of <span className="text-neon-cyan">Explorations</span>
          </h1>
          <p className="text-lg text-white/40 max-w-2xl">
            A deep-dive into every project, including experiments, case studies, and ongoing research.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project: any, idx: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all hover:border-neon-cyan/50 hover:bg-white/[0.07]"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.images?.[0] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-neon-cyan transition-colors">{project.title}</h3>
                <p className="mt-2 text-sm text-white/50 line-clamp-2">{project.short_description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-widest text-white/30">
                  {project.technologies?.map((tech: string) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
