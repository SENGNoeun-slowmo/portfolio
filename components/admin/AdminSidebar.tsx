"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  ChevronRight,
  LogOut,
  Mail,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useProfile } from "@/hooks/useProducts";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Messages",
    url: "/admin/messages",
    icon: Mail,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: profile } = useProfile();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("auth-token");
    toast.success("Disconnected from neural link.");
    router.push("/");
    router.refresh();
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-20 border-b flex items-center px-4">
        <Link href="/" className="flex items-center gap-3 font-bold group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-neon-cyan/50 transition-colors shadow-lg">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Admin" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-white/5 flex items-center justify-center text-neon-cyan font-black italic">
                S
              </div>
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
          </div>
          <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
            <span className="text-sm text-white uppercase tracking-tighter leading-tight font-black">
              {profile?.full_name || "Admin"}
            </span>
            <span className="text-[10px] text-neon-cyan/60 uppercase tracking-widest font-bold">
              System Root
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 py-4">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                tooltip={item.title}
                className="hover:bg-accent/50 transition-colors"
              >
                <Link href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
