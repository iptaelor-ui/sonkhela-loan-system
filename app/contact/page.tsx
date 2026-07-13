import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 3600; // refresh business details every hour

export const metadata = {
  title: "Contact Us — Sonkhela Soft Loans",
  description:
    "Get in touch with Sonkhela Soft Loans in Lusaka, Zambia — by phone, WhatsApp, or email.",
};

async function getBusiness() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("business")
      .select("name,phone,email,address")
      .eq("id", 1)
      .single();
    return data;
  } catch {
    return null;
  }
}

export default async function ContactPage() {
  const biz = await getBusiness();
  const phone = biz?.phone || "";
  const email = biz?.email || "";
  const address = biz?.address || "Lusaka, Zambia";
  const waNumber = phone.replace(/[^0-9]/g, "").replace(/^0/, "260");

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0B1F4D] pb-24 pt-40 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#F97316]">
            CONTACT US
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-tight">
            We&apos;re Here To Help
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            A question about a loan, your application, or repayment shouldn&apos;t
            wait. For the fastest answer, call us directly — or use any channel below.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="rounded-3xl bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-[#FFF4EC] p-4">
                  <Phone size={28} className="text-[#F97316]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F4D]">Call Us</h3>
                <p className="mt-2 font-semibold text-gray-700">{phone}</p>
                <p className="mt-1 text-sm text-gray-500">
                  Fastest response — tap to call
                </p>
              </a>
            )}

            {phone && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-green-50 p-4">
                  <MessageCircle size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F4D]">WhatsApp</h3>
                <p className="mt-2 font-semibold text-gray-700">{phone}</p>
                <p className="mt-1 text-sm text-gray-500">Chat with us anytime</p>
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="rounded-3xl bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-blue-50 p-4">
                  <Mail size={28} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F4D]">Email</h3>
                <p className="mt-2 break-all font-semibold text-gray-700">
                  {email}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Replies within 24 hours
                </p>
              </a>
            )}

            <div className="rounded-3xl bg-white p-8 shadow-md">
              <div className="mb-5 inline-flex rounded-2xl bg-purple-50 p-4">
                <MapPin size={28} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F4D]">Location</h3>
              <p className="mt-2 font-semibold text-gray-700">{address}</p>
              <p className="mt-1 text-sm text-gray-500">
                Serving UNZA, Mulungushi, UNILUS & NIPA
              </p>
            </div>
          </div>

          {/* Track + apply shortcuts */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
              <Clock size={36} className="mx-auto text-[#F97316]" />
              <h3 className="mt-4 text-2xl font-bold text-[#0B1F4D]">
                Already Applied?
              </h3>
              <p className="mt-3 text-gray-600">
                Check the status of your application anytime using your
                application number.
              </p>
              <Link href="/track">
                <button className="mt-6 rounded-xl border-2 border-[#0B1F4D] px-8 py-3 font-semibold text-[#0B1F4D] transition hover:bg-[#0B1F4D] hover:text-white">
                  Track Application
                </button>
              </Link>
            </div>
            <div className="rounded-3xl bg-[#0B1F4D] p-10 text-center text-white shadow-lg">
              <h3 className="mt-2 text-2xl font-bold">Ready To Apply?</h3>
              <p className="mt-3 text-gray-300">
                Apply online in under 5 minutes with your NRC and a valuable
                item as collateral.
              </p>
              <Link href="/apply?loan=collateral">
                <button className="mt-6 rounded-xl bg-[#F97316] px-8 py-3 font-semibold text-white transition hover:bg-[#EA580C]">
                  Apply Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
