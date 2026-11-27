import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Erstian Technologies — Digital growth, engineered",
    template: "%s · Erstian Technologies",
  },
  description:
    "Erstian Technologies builds websites, performance campaigns, WhatsApp automation, CRM and cloud infrastructure for growing businesses. Get a free business audit with a reply within 48 hours.",
  keywords: [
    "digital agency",
    "website development",
    "performance marketing",
    "WhatsApp automation",
    "SEO",
    "CRM development",
    "Erstian Technologies",
  ],
  openGraph: {
    title: "Erstian Technologies — Digital growth, engineered",
    description:
      "Websites, performance marketing, automation and business software. Request a free business audit and get a reply within 48 hours.",
    type: "website",
    siteName: "Erstian Technologies",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", ibmPlexSans.variable)}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
