"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button/Navbutton";

const CTASection = () => {
    return (
        <section className="w-full py-10 text-center">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
                    Mulai Perjalanan Literasimu Hari Ini
                </h2>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 text-center">
                    Akses ribuan buku, e-jurnal, dan karya ilmiah hanya dengan satu klik.
                    Temukan dunia pengetahuan di ujung jarimu gratis dan tanpa batas.
                </p>

                <div className="flex justify-center">
                    <Link href="/daftar">
                        <Button
                            size="lg"
                            className="rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors group"
                        >
                            Daftar Sekarang
                            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
