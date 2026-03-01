"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Layout, Globe } from "lucide-react";
import Link from "next/link";

import { useProfile } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

export function Hero() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-neon-cyan" />
      </div>
    );
  }

  const fullName = profile?.full_name?.split(" ") || ["SENG", "Noeun"];
  const firstName = fullName[0];
  const lastName = fullName.slice(1).join(" ");

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="absolute top-1/2 right-0 -z-10 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/2 rounded-full bg-neon-purple/10 blur-[100px]" />

      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-neon-cyan"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan"></span>
          </span>
          Available for new opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-6xl font-black leading-tight tracking-tighter md:text-8xl lg:text-9xl uppercase"
        >
          {firstName} <span className="text-neon-cyan">{lastName}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl"
        >
          {profile?.title || "Engineering exceptional digital experiences with modern tech."}
          <br />
          Based in <span className="text-white">Phnom Penh</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/#projects"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-black transition-transform hover:scale-105"
          >
            Launch Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition-colors hover:bg-white/10"
          >
            Let's Talk
          </Link>
        </motion.div>

        {/* Tech Marquee / Floating Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex flex-wrap justify-center gap-8 text-white/30"
        >
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <span className="text-sm font-medium">React / Next.js</span>
          </div>
          <div className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            <span className="text-sm font-medium">Tailwind CSS</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span className="text-sm font-medium">Node.js / Go</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
