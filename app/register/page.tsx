"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, Lock, Loader2, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          }
        }
      });

      if (error) throw error;

      toast.success("Identity created. Please check your transmission for verification.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Identity already exists.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--background)] px-4 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl animate-pulse" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-login p-8 rounded-3xl border border-white/10 relative z-10">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-white mb-2 uppercase italic">
              Register <span className="text-neon-purple">Identity</span>
            </h1>
            <p className="text-white/50 text-sm">Establish secure connection to the network</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-white transition-colors">
                  <User className="h-4 w-4" />
                </div>
                <input
                  {...register("fullName", { required: "Name is required" })}
                  type="text"
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all",
                    errors.fullName && "border-rose-500/50"
                  )}
                  placeholder="Commander SENG"
                />
              </div>
              {errors.fullName && <p className="text-[10px] text-rose-500 ml-1 uppercase">{errors.fullName.message as string}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Identity (Email)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-neon-cyan transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all",
                    errors.email && "border-rose-500/50"
                  )}
                  placeholder="commander@nebula.net"
                />
              </div>
              {errors.email && <p className="text-[10px] text-rose-500 ml-1 uppercase">{errors.email.message as string}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-neon-purple transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })}
                  type="password"
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/20 transition-all",
                    errors.password && "border-rose-500/50"
                  )}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-[10px] text-rose-500 ml-1 uppercase">{errors.password.message as string}</p>}
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-neon-purple transition-all flex items-center justify-center gap-2 group mt-6"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  CREATE IDENTITY
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4 text-center">
            <div className="text-xs text-white/30 uppercase tracking-tighter">
              Already identified? <Link href="/login" className="text-neon-purple hover:underline hover:text-white transition-all">Secure Login</Link>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .glass-login {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}
