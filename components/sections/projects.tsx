"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { useProducts } from "@/hooks/useProducts";
import { Loader2, ArrowRight as ArrowIcon } from "lucide-react";

export function Projects() {
  const { data: projects, isLoading } = useProducts();
  const featuredProjects = projects?.filter((p: any) => p.featured).slice(0, 3) || [];

  return (
    <section id="projects" className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Selected <span className="text-neon-purple">Works</span>
            </h2>
            <p className="mt-4 text-lg text-white/50">
              A curated collection of projects where design meets engineering excellence. 
              Each project is a deep dive into complex problems.
            </p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-neon-cyan font-bold">
            View All Projects
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-neon-cyan" />
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project: any, idx: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all hover:border-neon-cyan/50 hover:bg-white/[0.07]"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.images?.[0] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop"}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="flex flex-col p-6 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tag: string) => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-white/40 border border-white/10 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold group-hover:text-neon-cyan transition-colors">{project.title}</h3>
                  <p className="mt-3 text-sm text-white/60 line-clamp-2">
                    {project.short_description}
                  </p>
                  
                  <div className="mt-6 flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-xs font-medium text-neon-purple italic">{project.duration || project.role}</span>
                    <Link href={`/projects/${project.slug}`} className="flex items-center gap-1 text-sm font-bold">
                      View Case <ArrowIcon className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
