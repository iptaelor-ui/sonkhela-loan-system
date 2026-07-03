import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/40 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo-new.png"
            alt="Sonkhela Capital"
            width={200}
            height={70}
            className="h-20 w-auto"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link
            href="/"
            className="font-medium text-[#0B1F4D] transition hover:text-[#F97316]"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="font-medium text-[#0B1F4D] transition hover:text-[#F97316]"
          >
            About
          </Link>

          <Link
            href="/services"
            className="font-medium text-[#0B1F4D] transition hover:text-[#F97316]"
          >
            Services
          </Link>

          <Link
            href="/contact"
            className="font-medium text-[#0B1F4D] transition hover:text-[#F97316]"
          >
            Contact
          </Link>
        </nav>

        <Link href="/#loan-products">
          <Button className="rounded-xl bg-[#F97316] px-6 py-3 text-white hover:bg-[#EA580C]">
            Apply Now
          </Button>
        </Link>

      </div>
    </header>
  );
}