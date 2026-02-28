"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { SmoothScroll } from "@/components/smooth-scroll";

export function PageLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <Navbar />
      <main>{children}</main>
    </SmoothScroll>
  );
}
