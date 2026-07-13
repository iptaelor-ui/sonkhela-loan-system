"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/track", label: "Track Application" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/40 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-new.png"
            alt="Sonkhela Capital"
            width={200}
            height={70}
            className="h-16 w-auto sm:h-20"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.slice(0, 4).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-medium transition hover:text-[#F97316] ${
                pathname === l.href ? "text-[#F97316]" : "text-[#0B1F4D]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/apply?loan=collateral" className="hidden sm:block">
            <Button className="rounded-xl bg-[#F97316] px-6 py-3 text-white hover:bg-[#EA580C]">
              Apply Now
            </Button>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-[#0B1F4D] transition active:scale-95 md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 py-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                pathname === l.href
                  ? "bg-[#FFF4EC] text-[#F97316]"
                  : "text-[#0B1F4D] active:bg-gray-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/apply?loan=collateral"
            onClick={() => setOpen(false)}
            className="mt-2 mb-2"
          >
            <Button className="w-full rounded-xl bg-[#F97316] py-6 text-base font-semibold text-white hover:bg-[#EA580C]">
              Apply Now
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
