"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card/card";
import { StarIcon, BookOpenIcon } from "lucide-react";
import {Button} from "@/components/ui/button/Navbutton";

const featuredBooks = [
    {
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        rating: 4.8,
        category: "Sastra Indonesia",
        cover: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghT_xfLA64YA1alVxXmWMkWbiJD3pA-fbs3mgQeRMJbDn3Z9hYsqPoLtjYiMMa7-Z79PzeNN_W2iKYCfEGh5sAUh7XIwQ2A1COjeSLn8Ys3J_IWKWJso59YMJlDXKJeaATswk9GbwgGwE/s1600/laskar+pelangi.jpg",
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        rating: 4.9,
        category: "Pengembangan Diri",
        cover: "https://i0.wp.com/postyrandom.com/wp-content/uploads/2022/01/kover-cover-buku-atomic-habits-james-clear.jpg",
    },
    {
        title: "Filosofi Teras",
        author: "Henry Manampiring",
        rating: 4.7,
        category: "Psikologi",
        cover: "https://miro.medium.com/v2/resize:fit:1400/1*5JcNouEogJHTG0vzhAuV9g@2x.jpeg",
    }
];

const FeaturedBooks = () => {
    return (
        <section id="featured-books" className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Buku Unggulan Minggu Ini
                </h2>
                <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Koleksi buku paling diminati dan direkomendasikan oleh pembaca kami.
                </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {featuredBooks.map((book) => (
                    <Card
                        key={book.title}
                        className="group overflow-hidden border rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="relative h-64 w-full overflow-hidden">
                            <Image
                                src={book.cover}
                                alt={book.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <CardHeader className="space-y-1.5">
                            <CardTitle className="text-lg font-semibold">{book.title}</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                {book.author}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <StarIcon className="h-4 w-4" />
                                <span className="text-sm font-medium text-foreground">
                                    {book.rating}
                                </span>
                            </div>
                            <Button size="default">
                                <BookOpenIcon className="h-4 w-4 mr-2" />
                                Pinjam
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default FeaturedBooks;
