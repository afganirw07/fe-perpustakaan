"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import Badge from "../ui/badge/Badge";
import Books from "./Books";
import FetchBooks from "@/lib/books";
import Image from "next/image";

interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    year: number;
    isbn: string;
    category: string;
    description: string;
    image: string;
    stock: number;
    total_pages: number;
    language: string;
    location_code: string;
    condition: string;
    is_available: boolean;
    stars: number;
}

interface DetailProps {
    id: string;
}

export default function DetailBooks({ id }: DetailProps) {
    const [book, setBook] = useState<Book | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadBook = async () => {
            try {
                const allBooks: Book[] = await FetchBooks();
                const found = allBooks.find((b) => String(b.id) === String(id));
                setBook(found || null);
            } finally {
                setIsLoading(false);
            }
        };

        loadBook();
    }, [id]);

    if (isLoading) {
        return <div className="p-10 text-center">Memuat detail buku...</div>;
    }

    if (!book) {
        return (
            <div className="p-10 text-center text-red-500">
                Buku tidak ditemukan.
            </div>
        );
    }

    const bookDetails = [
        { label: "Penulis", value: book.author },
        { label: "Penerbit", value: book.publisher },
        { label: "Tahun Terbit", value: book.year },
        { label: "ISBN", value: book.isbn },
        { label: "Kategori", value: book.category },
        { label: "Jumlah Halaman", value: `${book.total_pages} halaman` },
        { label: "Bahasa", value: book.language },
        { label: "Lokasi Buku", value: book.location_code },
        { label: "Kondisi", value: book.condition },
        { label: "Stok", value: book.stock },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex-shrink-0">
                    <div className="aspect-[2/3] w-full mb-4 rounded-lg overflow-hidden shadow-md">
                        <Image
                            width={400}
                            height={600}
                            src={book.image}
                            alt={book.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                <div className="md:w-2/3">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        {book.title}
                    </h1>

                    <p className="text-sm text-gray-600 mb-4">{book.author}</p>

                    <p className="text-gray-700 leading-relaxed mb-4">
                        {book.description}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                        <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-300"
                        >
                            {book.category}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-300"
                        >
                            {book.publisher}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-300"
                        >
                            {book.author}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-300"
                        >
                            {book.language}
                        </Badge>
                    </div>

                    <Table className="border-t border-gray-200">
                        <TableBody>
                            {bookDetails.map((detail, index) => (
                                <TableRow
                                    key={index}
                                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                >
                                    <TableCell className="font-semibold text-gray-700 w-1/3 py-2 px-4">
                                        {detail.label}
                                    </TableCell>
                                    <TableCell className="text-gray-900 w-2/3 py-2 px-4">
                                        {detail.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="mt-3">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Ulasan
                </h2>

                <div className="bg-amber-400 rounded-lg p-4">
                    <p className="text-gray-700">Belum ada ulasan untuk buku ini.</p>
                </div>

                <div className="mt-6">
                    <h1 className="text-xl font-semibold text-gray-900 mb-3">
                        Rekomendasi Buku Lain
                    </h1>
                    <Books />
                </div>
            </div>
        </div>
    );
}
