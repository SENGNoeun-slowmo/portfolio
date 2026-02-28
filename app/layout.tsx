import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { PageLayoutWrapper } from "@/components/page-layout-wrapper";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Seng | Full-Stack Developer & Designer",
  description: "Senior Full-Stack Developer and UI/UX Designer based in Phnom Penh, specialized in building premium digital experiences.",
  keywords: ["Next.js", "React", "Portfolio", "Seng", "Full-Stack Developer", "Cambodia"],
};

import { QueryProvider } from "@/components/query-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-neon-cyan/30 selection:text-neon-cyan",
          inter.variable,
          outfit.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <PageLayoutWrapper>{children}</PageLayoutWrapper>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
