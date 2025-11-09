import React from "react";
import Badge from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Navbutton";
import { ArrowUpRight, Info, Search } from "lucide-react";
import { AvatarDemo } from "./avatar";
import Image from "next/image";

const HeroSection = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden border-b border-accent">
            <div className="max-w-7xl w-full flex flex-col lg:flex-row mx-auto items-center justify-between gap-y-14 gap-x-10 px-6 py-12 lg:py-0">

                <div className="max-w-xl">
                    <div className="flex items-center gap-3">
                        <AvatarDemo />
                        <Badge color="info" variant="light">
                            Lembaga di Bawah Koordinasi Presiden Republik Indonesia
                        </Badge>
                    </div>

                    <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold leading-[1.2]! tracking-tight">
                        Jelajahi Ilmu, Berkreasi, dan Berkarya di Pusat Literasi Digital Nasional
                    </h1>

                    <p className="mt-6 max-w-[60ch] xs:text-lg text-gray-600">
                        Akses ribuan koleksi buku, e-book, dan ruang literasi modern.
                        Pinjam, baca, dan temukan komunitas pembaca dari seluruh Indonesia.
                    </p>

                    <div className="mt-10 flex flex-col gap-6">

                        {/* Search Bar yang Diperbaiki dan Disederhanakan */}
                        <div className="flex items-center w-full max-w-lg border border-gray-300 rounded-xl bg-white  transition duration-150 ease-in-out focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50">
                            <input
                                type="text"
                                placeholder="Cari Koleksi Buku, Jurnal, atau Fasilitas..."
                                className="w-full h-14 px-5 py-3 outline-none text-gray-700 placeholder-gray-400 text-base bg-transparent rounded-l-xl"
                            />
                            <Button
                                size="lg"
                                className="h-14 w-14 rounded-r-xl rounded-l-none flex-shrink-0 bg-primary hover:bg-primary/90"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        </div>


                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto rounded-full text-base"
                            >
                                Cari & Pesan Buku <ArrowUpRight className="h-5 w-5 ml-2" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto rounded-full text-base shadow-sm border-gray-300 hover:bg-gray-50 text-gray-700"
                            >
                                <Info className="h-5 w-5 mr-2" /> Panduan Pinjam Online
                            </Button>
                        </div>

                    </div>
                </div>

                {/* Kolom Kanan: Gambar */}
                <div className="relative lg:max-w-lg xl:max-w-xl w-full bg-accent rounded-xl aspect-square shadow-xl">
                    <Image
                        src="/images/landing/hero.png"
                        fill
                        alt="Perpustakaan Nasional"
                        className="object-cover rounded-xl"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;