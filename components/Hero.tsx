"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-white pt-24">
      <div className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-16 px-6 py-16 md:grid-cols-2">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#F97316]">
            FAST • SECURE • TRUSTED
          </p>

          <h1 className="text-5xl font-extrabold leading-tight text-[#0B1F4D] md:text-7xl">
            Financial Freedom
            <br />
            <span className="text-[#F97316]">Starts Here.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Get collateral-backed loans with quick approval, transparent terms,
            and professional service you can trust.
          </p>

          <div className="mt-10 flex gap-4">
            <Link href="/#loan-products">
              <button className="rounded-xl bg-[#0B1F4D] px-8 py-4 font-semibold text-white transition hover:bg-[#142f69]">
                Apply Now
              </button>
            </Link>

            <button className="rounded-xl border-2 border-[#F97316] px-8 py-4 font-semibold text-[#F97316] transition hover:bg-[#F97316] hover:text-white">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative h-[550px] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/hero.jpg"
              alt="Business Professional"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}