"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { useProfile, useSkills } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

export function About() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: skills, isLoading: skillsLoading } = useSkills();

  const isLoading = profileLoading || skillsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-12 w-12 animate-spin text-neon-cyan" />
      </div>
    );
  }

  const bioParagraphs = profile?.bio?.split("\n").filter((p: string) => p.trim()) || [
    "I'm a senior creative developer based in Phnom Penh with over 8 years of experience building high-performance digital products.",
    "I believe that code is an art form, and every pixel should tell a story."
  ];

  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Avatar Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group order-2 lg:order-1"
          >
            <div className="relative z-10 mx-auto max-w-[450px] aspect-square rounded-3xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-xl group-hover:border-neon-cyan/30 transition-colors duration-500 shadow-2xl">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.full_name || "Profile"} 
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/5">
                  <span className="text-8xl font-black text-white/5 uppercase">No Signal</span>
                </div>
              )}
              
              {/* Glass Overlays */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 h-24 w-24 border-t-2 border-l-2 border-neon-cyan opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-neon-purple opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/5 blur-[80px] group-hover:bg-neon-cyan/10 transition-all duration-500" />
          </motion.div>

          {/* Story Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Who is <span className="text-neon-cyan">{profile?.full_name?.split(" ")[0] || "Seng"}</span>?
            </h2>
            <div className="mt-8 space-y-6">
              {bioParagraphs.map((p: string, i: number) => (
                <p key={i} className="text-lg text-white/70 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <div className="text-4xl font-bold text-neon-cyan">+</div>
                <div className="text-sm text-white/50 uppercase tracking-widest mt-1">Years Exp.</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-neon-purple">2+</div>
                <div className="text-sm text-white/50 uppercase tracking-widest mt-1">Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">+</div>
                <div className="text-sm text-white/50 uppercase tracking-widest mt-1">Awards</div>
              </div>
            </div>
          </motion.div>

          {/* Skills Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass flex flex-col gap-10 rounded-3xl p-8 lg:p-12"
          >
            <h3 className="text-2xl font-bold">Tech Arsenal</h3>
            
            <div className="space-y-8">
              {skills?.map((skill: any) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-white/50 text-sm">{skill.level * 10}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level * 10}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={cn(
                        "h-full rounded-full", 
                        skill.category === "Backend" ? "bg-neon-purple" : 
                        skill.category === "Frontend" ? "bg-neon-cyan" : "bg-pink-500"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
