"use client";
import { useState, useEffect } from "react";
import { readUserPeminjaman } from "@/lib/peminjaman";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Book {
    id: string;
    book_id: number;
    title: string;
    author: string;
    image: string;
    status: string;
    tanggal_pinjam?: string;
    tanggal_kembali?: string;
}


export default function PeminjamanAktif() {
    const router = useRouter();

    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Ambil cookie manual
    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
        return null;
    };

    useEffect(() => {
        const loadPeminjaman = async () => {
            try {
                setIsLoading(true);

                const userId = getCookie("user_id");
                if (!userId) {
                    setError("User tidak ditemukan. Cookie user_id hilang.");
                    return;
                }

                const response = await readUserPeminjaman(userId);

                if (response.success && Array.isArray(response.data)) {
                    const mapped = response.data.map((item) => ({
                        id: item.id,
                        book_id: item.book_id,
                        title: item.books?.title,
                        author: item.books?.author,
                        image: item.books?.image,   
                        status: item.status,
                        tanggal_pinjam: item.tanggal_peminjaman,
                        tanggal_kembali: item.tanggal_pengembalian,
                    }));

                    setBooks(mapped);
                }

            } catch (err) {
                console.error("Gagal memuat data peminjaman:", err);
                setError("Gagal memuat data peminjaman.");
                setBooks([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadPeminjaman();
    }, []);

    // Loading
    if (isLoading)
        return (
            <div className="flex h-screen items-center justify-center">
                Memuat data peminjaman...
            </div>
        );

    // Error
    if (error)
        return (
            <div className="flex h-screen items-center justify-center text-red-600">
                {error}
            </div>
        );

    // Kosong
    if (books.length === 0)
        return (
            <div className="flex h-screen items-center justify-center text-gray-500">
                Tidak ada peminjaman aktif.
            </div>
        );

    return (
        <div className="pb-10">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {books.map((book) => (
                    <div
                        key={book.id}
                        onClick={() => router.push(`/user/detail-peminjaman/${book.id}`)}
                        className="group cursor-pointer text-center"
                    >
                        <div className="relative h-64 w-full overflow-hidden rounded-lg">
                            {book.image ? (
                                <Image
                                    width={200}
                                    height={300}
                                    src={book.image}
                                    alt={`Sampul buku: ${book.title}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    Tidak ada gambar
                                </div>
                            )}
                        </div>


                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800 truncate">
                                {book.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {book.author}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
