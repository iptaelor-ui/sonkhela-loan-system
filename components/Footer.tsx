import Link from "next/link";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 3600;

async function getBusiness() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("business")
      .select("name,tagline,phone,email,address")
      .eq("id", 1)
      .single();
    return data;
  } catch {
    return null;
  }
}

export default async function Footer() {
  const biz = await getBusiness();
  const name = biz?.name || "Sonkhela Soft Loans";
  const tagline = biz?.tagline || "Simple Loans. Real People.";
  const phone = biz?.phone || "";
  const email = biz?.email || "";
  const address = biz?.address || "Lusaka, Zambia";

  return (
    <footer className="bg-[#0B1F4D] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-extrabold">
            Sonkhela<span className="text-[#F97316]">.</span>
          </h3>
          <p className="mt-3 leading-7 text-gray-300">{tagline}</p>
          <p className="mt-5 text-sm leading-6 text-gray-400">
            A PACRA-registered microfinance business providing fast,
            collateral-backed loans across Lusaka, Zambia.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-5 text-lg font-bold text-[#F97316]">Quick Links</h4>
          <ul className="space-y-3 text-gray-300">
            <li><Link href="/" className="transition hover:text-[#F97316]">Home</Link></li>
            <li><Link href="/about" className="transition hover:text-[#F97316]">About Us</Link></li>
            <li><Link href="/services" className="transition hover:text-[#F97316]">Our Services</Link></li>
            <li><Link href="/contact" className="transition hover:text-[#F97316]">Contact</Link></li>
            <li><Link href="/track" className="transition hover:text-[#F97316]">Track Application</Link></li>
            <li><Link href="/apply?loan=collateral" className="font-semibold text-white transition hover:text-[#F97316]">Apply Now →</Link></li>
          </ul>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="mb-5 flex items-center gap-2 text-lg font-bold text-[#F97316]">
            <Clock size={18} /> Business Hours
          </h4>
          <ul className="space-y-4 text-gray-300">
            <li>
              <p className="text-sm text-gray-400">Monday – Friday</p>
              <p className="font-semibold text-white">08:00 – 17:00</p>
            </li>
            <li>
              <p className="text-sm text-gray-400">Saturday</p>
              <p className="font-semibold text-white">08:00 – 13:00</p>
            </li>
            <li>
              <p className="text-sm text-gray-400">Sunday & Public Holidays</p>
              <p className="font-semibold text-white">Closed</p>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="mb-5 text-lg font-bold text-[#F97316]">Contact Info</h4>
          <ul className="space-y-4 text-gray-300">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-1 shrink-0 text-[#F97316]" />
              <span>{address}</span>
            </li>
            {email && (
              <li className="flex gap-3">
                <Mail size={18} className="mt-1 shrink-0 text-[#F97316]" />
                <a href={`mailto:${email}`} className="break-all transition hover:text-[#F97316]">
                  {email}
                </a>
              </li>
            )}
            {phone && (
              <li className="flex gap-3">
                <Phone size={18} className="mt-1 shrink-0 text-[#F97316]" />
                <a href={`tel:${phone}`} className="transition hover:text-[#F97316]">
                  {phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-gray-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <p>
            Serving UNZA · Mulungushi · UNILUS · NIPA · Lusaka
          </p>
        </div>
      </div>
    </footer>
  );
}
