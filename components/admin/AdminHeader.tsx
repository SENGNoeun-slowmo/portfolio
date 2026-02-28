"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/useProducts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AdminHeader() {
  const { data: profile } = useProfile();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="hidden sm:inline-flex border-white/10 uppercase tracking-widest text-[10px]">
          Admin Role
        </Badge>
        <ThemeToggle />
        <Separator orientation="vertical" className="h-6 mx-1" />
        <Avatar className="h-8 w-8 border border-white/10 ring-1 ring-white/5 transition-transform hover:scale-110">
          <AvatarImage src={profile?.avatar_url} />
          <AvatarFallback className="bg-neon-cyan/10 text-neon-cyan text-[10px] font-bold">
            {profile?.full_name?.substring(0, 2).toUpperCase() || "AD"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
