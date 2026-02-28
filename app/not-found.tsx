"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-[10rem] font-black leading-none text-white/10 md:text-[20rem]">
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <h2 className="text-3xl font-bold md:text-5xl">Lost in the <span className="text-neon-cyan">code</span>?</h2>
          <p className="mt-4 text-white/50 md:text-xl">
            This module doesn't exist yet. Let's redirect you back to the main thread.
          </p>
          
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-black transition-transform hover:scale-105"
            >
              <Home className="h-4 w-4" /> Back Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
