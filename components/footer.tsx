import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold tracking-tighter text-neon-cyan">
              SENG<span className="text-white">.DEV</span>
            </Link>
            <p className="mt-2 text-sm text-white/40">
              © {new Date().getFullYear()} Seng Chanda. All rights reserved.
            </p>
          </div>

          <div className="flex gap-8 text-sm font-medium text-white/50">
            <Link href="/about" className="hover:text-neon-cyan transition-colors">About</Link>
            <Link href="/projects" className="hover:text-neon-cyan transition-colors">Projects</Link>
            <Link href="/#contact" className="hover:text-neon-cyan transition-colors">Contact</Link>
            <Link href="/sitemap.xml" className="hidden md:block hover:text-neon-cyan transition-colors">Sitemap</Link>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/30">
            <span>Made with</span>
            <Heart className="h-3 w-3 fill-pink-500 text-pink-500" />
            <span>in Phnom Penh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
