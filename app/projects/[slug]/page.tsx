"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Code, Layout, Globe, Star } from "lucide-react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Footer } from "@/components/footer";

const projectsData = {
  "neurosphere-ai": {
    title: "NeuroSphere AI",
    description: "A generative AI platform for neuroscientists to simulate brain activity patterns with real-time visualization.",
    fullDescription: "NeuroSphere AI was born from the need to visualize high-dimensional neural data in real-time. We built a system that translates complex EEG patterns into 3D structural simulations using Three.js and a custom Python real-time processing engine.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    tags: ["Next.js", "Three.js", "Python", "Radix UI", "WebWorkers"],
    role: "Lead Full-Stack Developer",
    metrics: [
      { label: "Rendering Speed", value: "+40%" },
      { label: "Data Latency", value: "< 20ms" },
      { label: "User Growth", value: "2.5k+" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=800",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800",
    ]
  },
  "ecostream-dashboard": {
    title: "EcoStream Dashboard",
    description: "Global environmental monitoring dashboard with high-frequency data ingestion and predictive analytics.",
    fullDescription: "EcoStream solves the problem of distributed environmental data silos. By centralizing high-frequency sensor data into a unified dashboard, we provide local governments with actionable insights into air quality and water levels.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    tags: ["Go", "React", "InfluxDB", "D3.js", "Docker"],
    role: "Backend Architect",
    metrics: [
      { label: "Ingestion Rate", value: "1M/sec" },
      { label: "API Uptime", value: "99.99%" },
      { label: "Alert Accuracy", value: "94%" },
    ],
    gallery: []
  },
  "vortex-nft": {
    title: "Vortex NFT Marketplace",
    description: "Premium glassmorphic NFT marketplace for high-end digital art and decentralized auctions.",
    fullDescription: "Vortex is a curated marketplace designed for digital artists who value aesthetics and security. We implemented a custom EIP-712 signing flow and a responsive glassmorphic UI that feels as premium as the art it hosts.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1600&auto=format&fit=crop",
    tags: ["Solidity", "Next.js", "Ethers.js", "Tailwind CSS"],
    role: "Smart Contract & Frontend Dev",
    metrics: [
      { label: "Volume Traded", value: "$2.1M" },
      { label: "Gas Saved", value: "15%" },
      { label: "Transactions", value: "10k+" },
    ],
    gallery: []
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData[slug as keyof typeof projectsData];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Navigation */}
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        {/* Hero */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 flex items-center gap-2 text-neon-cyan font-bold uppercase tracking-widest text-xs">
              <Star className="h-3 w-3" /> Featured Case Study
            </div>
            <h1 className="font-serif text-5xl font-black md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-8 text-xl text-white/70 leading-relaxed">
              {project.description}
            </p>
            
            <div className="mt-10 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="glass px-4 py-2 rounded-full text-sm font-medium border-white/10">
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
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          {project.metrics.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl text-center"
            >
              <div className="text-4xl font-black text-neon-cyan">{stat.value}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-white/40">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Details */}
        <div className="mt-24 grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold">The Challenge</h2>
            <p className="mt-6 text-lg text-white/60 leading-relaxed">
              {project.fullDescription}
            </p>
            
            <h2 className="mt-16 text-3xl font-bold">My Role</h2>
            <p className="mt-6 text-lg text-white/60 leading-relaxed">
              As the {project.role}, I was responsible for the end-to-end technical architecture and implementation 
              of key features, ensuring the product met rigorous performance and security standards.
            </p>
          </div>

          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl">
              <h3 className="font-bold">Project Details</h3>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-white/40">Client</span>
                  <span className="font-medium text-white">Confidential</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-white/40">Category</span>
                  <span className="font-medium text-white">SaaS / Web App</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Timeline</span>
                  <span className="font-medium text-white">4 Months</span>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition-transform hover:scale-105">
                  Live Preview <ExternalLink className="h-4 w-4" />
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Github className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
