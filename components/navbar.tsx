"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/#projects" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

import { supabase } from "@/lib/supabase";
import { useProfile } from "@/hooks/useProducts";
import { User, LogIn, LogOut } from "lucide-react";

export function Navbar() {
  const { data: profile } = useProfile();
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("auth-token");
    router.push("/");
    router.refresh();
  };

  const firstName = profile?.full_name?.split(" ")[0] || user?.user_metadata?.full_name?.split(" ")[0] || "SENG";

  return (
    <header className="fixed top-0 z-50 w-full px-4 py-6">
      <nav className="mx-auto max-w-7xl">
        <div className="glass flex items-center justify-between rounded-full px-6 py-3">
          <Link href="/" className="text-xl font-bold tracking-tighter text-neon-cyan uppercase">
            {firstName}<span className="text-white">.DEV</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-neon-cyan",
                  pathname === link.href ? "text-neon-cyan" : "text-white/70"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4">
                {profile?.role === 'admin' && (
                  <Link href="/admin" className="text-xs uppercase tracking-widest text-white/50 hover:text-neon-cyan transition-colors">
                    Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center gap-2 text-sm font-medium text-neon-cyan hover:text-white transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
            
            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/70 hover:text-white"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass mt-4 flex flex-col items-center gap-4 rounded-3xl p-8 md:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-neon-cyan",
                    pathname === link.href ? "text-neon-cyan" : "text-white/70"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  {profile?.role === 'admin' && (
                    <Link href="/admin" onClick={() => setIsOpen(false)} className="text-lg font-medium text-neon-cyan">
                      Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="flex items-center gap-2 text-lg font-medium text-white/70 hover:text-white"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-lg font-medium text-neon-cyan"
                >
                  Login
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
