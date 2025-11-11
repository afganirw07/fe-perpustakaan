"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card/card";
import { BookOpen, MapPin, Users } from "lucide-react";

const visions = [
    {
        icon: BookOpen,
        title: "Akses Tanpa Batas",
        description:
            "Menyediakan jutaan koleksi buku dari seluruh dunia, kapan saja dan di mana saja.",
    },
    {
        icon: Users,
        title: "Pusat Komunitas Literasi",
        description:
            "Menjadi ruang virtual untuk diskusi, kolaborasi, dan peningkatan budaya membaca nasional.",
    },
    {
        icon: MapPin,
        title: "Pelayanan Terpadu",
        description:
            "Integrasi layanan digital dan fisik untuk memudahkan peminjaman dan rujukan riset bagi seluruh anggota.",
    },
];

const AboutSection = () => {
    return (
        <section
            id="about-library"
            className="max-w-7xl mx-auto w-full py-20 md:py-28 px-6"
        >
            {/* Heading Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Mengenal Lebih Dekat Perpustakaan Nasional
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
                    Perpustakaan Nasional hadir untuk memperkuat budaya membaca dan
                    literasi digital di seluruh Indonesia.
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Video */}
                <div className="lg:order-2">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-primary/30">
                        <iframe
                            src="https://www.youtube.com/embed/BDDz1TnumNw?autoplay=0&rel=0&modestbranding=1"
                            title="Perpustakaan Nasional Republik Indonesia"
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>

                {/* Right: Visi dan Misi */}
                <div className="lg:order-1 space-y-6">
                    {visions.map((vision, index) => {
                        const Icon = vision.icon;
                        return (
                            <Card
                                key={index}
                                className="flex flex-col border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                                    <div className="p-1 rounded-lg bg-primary/10 text-primary">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {vision.title}
                                    </h3>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {vision.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
