"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Star,
  Clock,
  Calendar,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Footer } from "@/components/footer";
import { useProduct } from "@/hooks/useProducts";

// ─────────────────────────────────────────────
// Skeleton / Loading state
// ─────────────────────────────────────────────
function ProjectSkeleton() {
  return (
    <div className="min-h-screen pt-32 animate-pulse">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-5 w-32 rounded-full bg-white/10 mb-12" />
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <div className="h-3 w-24 rounded-full bg-white/10" />
            <div className="h-16 w-3/4 rounded-xl bg-white/10" />
            <div className="h-4 w-full rounded-full bg-white/10" />
            <div className="h-4 w-5/6 rounded-full bg-white/10" />
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-20 rounded-full bg-white/10" />
              ))}
            </div>
          </div>
          <div className="aspect-video rounded-3xl bg-white/10" />
        </div>
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass p-8 rounded-3xl h-28" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Not Found state
// ─────────────────────────────────────────────
function ProjectNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <AlertCircle className="h-16 w-16 text-white/20" />
      <h1 className="text-4xl font-bold">Project Not Found</h1>
      <p className="text-white/50 max-w-md">
        The case study you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 mt-4 text-neon-cyan font-bold hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: project, isLoading, isError } = useProduct(slug);

  if (isLoading) return <ProjectSkeleton />;
  if (isError || !project) return <ProjectNotFound />;

  const metrics: { label: string; value: string }[] =
    Array.isArray(project.metrics) ? project.metrics : [];

  const coverImage =
    project.images?.[0] ||
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop";

  return (
    <div className="min-h-screen pt-32 pb-0">
      <div className="mx-auto max-w-7xl px-4">

        {/* ── Back Navigation ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </motion.div>

        {/* ── Hero ── */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 flex items-center gap-2 text-neon-cyan font-bold uppercase tracking-widest text-xs">
              <Star className="h-3 w-3" />
              Featured Case Study
            </div>
            <h1 className="font-serif text-5xl font-black md:text-7xl leading-tight">
              {project.title}
            </h1>
            <p className="mt-8 text-xl text-white/70 leading-relaxed">
              {project.short_description}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {project.technologies?.map((tag: string) => (
                <span
                  key={tag}
                  className="glass px-4 py-2 rounded-full text-sm font-medium border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-video overflow-hidden rounded-3xl border border-white/10"
          >
            {/* Neon glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 via-transparent to-neon-cyan/10 z-10 pointer-events-none" />
            <img
              src={coverImage}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* ── Metrics / Stats ── */}
        {metrics.length > 0 && (
          <div className="mt-24 grid gap-6 md:grid-cols-3">
            {metrics.map(
              (stat: { label: string; value: string }, idx: number) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 }}
                  className="glass p-8 rounded-3xl text-center border border-white/5 hover:border-neon-cyan/30 transition-colors"
                >
                  <div className="text-4xl font-black text-neon-cyan tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-white/40">
                    {stat.label}
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}

        {/* ── Details ── */}
        <div className="mt-24 grid gap-16 lg:grid-cols-3">

          {/* Left: narrative */}
          <div className="lg:col-span-2 space-y-16">
            {/* The Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-neon-purple font-bold uppercase tracking-widest text-xs mb-4">
                <span className="h-px w-6 bg-neon-purple" />
                The Challenge
              </div>
              <h2 className="text-3xl font-bold mb-6">What Was the Problem?</h2>
              <p className="text-lg text-white/60 leading-relaxed">
                {project.description || project.short_description}
              </p>
            </motion.div>

            {/* My Role */}
            {project.role && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 text-neon-cyan font-bold uppercase tracking-widest text-xs mb-4">
                  <span className="h-px w-6 bg-neon-cyan" />
                  My Role
                </div>
                <h2 className="text-3xl font-bold mb-6">{project.role}</h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  As the {project.role}, I was responsible for the end-to-end
                  technical architecture and implementation of key features,
                  ensuring the product met rigorous performance and security
                  standards.
                </p>
              </motion.div>
            )}
          </div>

          {/* Right: details card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass p-8 rounded-3xl border border-white/5 sticky top-32">
              <h3 className="font-bold text-lg mb-6">Project Details</h3>
              <div className="space-y-4">
                {/* Duration */}
                {project.duration && (
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="flex items-center gap-2 text-white/40 text-sm">
                      <Clock className="h-3.5 w-3.5" /> Timeline
                    </span>
                    <span className="font-medium text-white capitalize">
                      {project.duration}
                    </span>
                  </div>
                )}

                {/* Year */}
                {project.year && (
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="flex items-center gap-2 text-white/40 text-sm">
                      <Calendar className="h-3.5 w-3.5" /> Year
                    </span>
                    <span className="font-medium text-white">{project.year}</span>
                  </div>
                )}

                {/* Category */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-white/40 text-sm">Category</span>
                  <span className="font-medium text-white">Web App</span>
                </div>

                {/* Client */}
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm">Client</span>
                  <span className="font-medium text-white">Personal</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/10"
                  >
                    Live Preview <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm font-medium transition-all hover:bg-white/10 hover:border-white/20"
                  >
                    <Github className="h-4 w-4" /> View Source
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Image Gallery ── */}
        {project.images && project.images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <div className="inline-flex items-center gap-2 text-neon-purple font-bold uppercase tracking-widest text-xs mb-8">
              <span className="h-px w-6 bg-neon-purple" />
              Gallery
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {project.images.slice(1).map((img: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="aspect-video overflow-hidden rounded-2xl border border-white/10"
                >
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${idx + 2}`}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 mb-8 text-center"
        >
          <p className="text-white/30 uppercase tracking-widest text-xs mb-6">
            Interested in working together?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan px-8 py-4 text-sm font-bold hover:bg-neon-cyan/20 transition-all hover:shadow-lg hover:shadow-neon-cyan/20"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
