"use client";

import { motion } from "framer-motion";
import { Send, Github, Linkedin, Twitter, Mail, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  { name: "GitHub", icon: <Github className="h-5 w-5" />, href: "https://github.com/SengNoeun", color: "hover:text-white" },
  { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/seng-noeun-54009a3b2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", color: "hover:text-blue-400" },
  { name: "X", icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/sengnana26", color: "hover:text-sky-400" },
];

import { useProfile } from "@/hooks/useProducts";
import { useSendMessage } from "@/hooks/useMessages";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function Contact() {
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { mutate: send, isPending: isSending, isSuccess } = useSendMessage();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    send(data, {
      onSuccess: () => {
        toast.success("Message transmitted successfully.");
        reset();
      },
      onError: (error: any) => {
        toast.error("Transmission failed: " + (error.response?.data?.error || error.message));
      }
    });
  };

  if (isProfileLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-10 w-10 animate-spin text-neon-cyan" />
      </div>
    );
  }

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl text-white">
              Let's build <span className="text-neon-cyan">together</span>.
            </h2>
            <p className="mt-6 text-lg text-white/60">
              Have a revolutionary idea or just want to chat about tech? 
              My inbox is always open (and I respond fast).
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-neon-cyan">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-white/40 uppercase tracking-widest font-bold">Email</div>
                  <div className="text-white font-medium">{profile?.email || "sengnooeun3@gmail.com"}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-neon-purple">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-white/40 uppercase tracking-widest font-bold">Location</div>
                  <div className="text-white font-medium">Phnom Penh, Cambodia</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-pink-500">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-white/40 uppercase tracking-widest font-bold">Availability</div>
                  <div className="text-white font-medium">Remote & Worldwide</div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 transition-all hover:bg-white/10 hover:scale-110",
                    link.color
                  )}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-center p-6"
              >
                <CheckCircle2 className="h-16 w-16 text-neon-cyan mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
                <p className="text-white/60 mb-6">I've received your transmission and will get back to you shortly.</p>
                <button 
                  onClick={() => reset()}
                  className="px-6 py-2 bg-white text-black font-bold rounded-xl hover:bg-neon-cyan transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/70 uppercase tracking-tight">Name</label>
                  <input
                    {...register("name", { required: "Identity required" })}
                    type="text"
                    placeholder="Enter your name"
                    className={cn(
                      "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-neon-cyan focus:outline-none transition-colors",
                      errors.name && "border-rose-500/50"
                    )}
                  />
                  {errors.name && <span className="text-[10px] text-rose-500 uppercase tracking-tighter">{errors.name.message as string}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/70 uppercase tracking-tight">Email</label>
                  <input
                    {...register("email", { 
                      required: "Frequency (email) required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid frequency format" }
                    })}
                    type="email"
                    placeholder="Enter your email"
                    className={cn(
                      "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-neon-cyan focus:outline-none transition-colors",
                      errors.email && "border-rose-500/50"
                    )}
                  />
                  {errors.email && <span className="text-[10px] text-rose-500 uppercase tracking-tighter">{errors.email.message as string}</span>}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/70 uppercase tracking-tight">Message</label>
                <textarea
                  {...register("message", { required: "Transmission content empty" })}
                  rows={5}
                  placeholder="What's on your mind?"
                  className={cn(
                    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-neon-cyan focus:outline-none transition-colors resize-none",
                    errors.message && "border-rose-500/50"
                  )}
                />
                {errors.message && <span className="text-[10px] text-rose-500 uppercase tracking-tighter">{errors.message.message as string}</span>}
              </div>

              <button
                disabled={isSending}
                type="submit"
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-8 py-4 font-bold text-black transition-transform active:scale-95 disabled:opacity-50"
              >
                {isSending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
