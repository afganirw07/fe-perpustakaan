"use client";

import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card/card";

import { Button } from "@/components/ui/button/Navbutton";

const categories = [
    {
        title: "Fiksi",
        description: "Nikmati kisah menarik dari berbagai genre seperti misteri, romansa, dan petualangan.",
        image: "/images/Books/fiksi.png",
    },
    {
        title: "Nonfiksi",
        description: "Pelajari kisah nyata, biografi inspiratif, dan buku-buku pengembangan diri.",
        image: "/images/Books/nonfiksi.png",
    },
    {
        title: "Teknologi",
        description: "Ikuti perkembangan dunia digital, AI, dan ilmu komputer terbaru.",
        image: "/images/Books/teknologi.png",
    },
    {
        title: "Pendidikan",
        description: "Buku-buku akademik dan referensi untuk pelajar, mahasiswa, dan guru.",
        image: "/images/Books/pendidikan.png",
    },
    {
        title: "Sastra Indonesia",
        description: "Karya sastra lokal penuh makna dari penulis legendaris hingga modern.",
        image: "/images/Books/sastra.png",
    },
    {
        title: "Anak & Remaja",
        description: "Cerita edukatif dan imajinatif untuk generasi muda yang gemar membaca.",
        image: "/images/Books/anak.png",
    },
];

const BooksPopular = () => {
    return (
        <section
            id="popular-books"
            className="max-w-7xl mx-auto w-full py-16 px-6 sm:px-8"
        >
            <div className="text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Kategori Buku Populer
                </h2>
                <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Temukan berbagai jenis buku dari koleksi favorit pembaca di seluruh Indonesia.
                </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat) => (
                    <Card
                        key={cat.title}
                        className="group overflow-hidden border rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={cat.image}
                                alt={cat.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        <CardHeader className="space-y-2">
                            <CardTitle className="text-xl font-semibold text-foreground">
                                {cat.title}
                            </CardTitle>
                            <CardDescription>{cat.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="mt-2">
                                Lihat Buku
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default BooksPopular;
