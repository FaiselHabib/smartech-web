"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFAB } from "./WhatsAppFAB";

/**
 * Renders the public site header / footer / WhatsApp FAB.  Hidden under any
 * /admin route so the dashboard owns its own chrome.
 */
export function SiteHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Navbar />;
}

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
