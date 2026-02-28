"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useProfile } from "@/hooks/useProducts";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = React.useState<any>(null);
  const [isVerifying, setIsVerifying] = React.useState(true);
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const router = useRouter();

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      
      if (!currentSession) {
        router.push("/login");
      }
      setIsVerifying(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) {
        router.push("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (isVerifying || isProfileLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-neon-cyan mx-auto" />
          <p className="text-white/50 text-xs uppercase tracking-[0.3em] animate-pulse">Synchronizing Neural Link...</p>
        </div>
      </div>
    );
  }

  if (!session || profile?.role !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="text-center p-8 glass border border-rose-500/20 rounded-3xl">
          <h1 className="text-6xl font-black text-rose-500 mb-2">403</h1>
          <p className="text-white font-bold uppercase tracking-tighter mb-4">Access Denied: Restricted Sector</p>
          <p className="text-white/40 text-sm mb-8 max-w-xs mx-auto">Your identity footprint does not match the administrative clearance required for this terminal.</p>
          <button 
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-white text-black font-bold rounded-xl hover:bg-neon-cyan transition-colors"
          >
            RETURN TO SURFACE
          </button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50 dark:bg-slate-950/50">
        <AdminSidebar />
        <SidebarInset className="flex w-full flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
