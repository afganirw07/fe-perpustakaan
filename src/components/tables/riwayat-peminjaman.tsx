"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { Button } from "../ui/button/Navbutton";
import { Info } from "lucide-react";
import { readUserPeminjaman } from "@/lib/peminjaman";

interface Book {
    id: string;
    title: string;
    author: string;
    image: string;
    status: string;
    tanggal_pinjam?: string;
    tanggal_kembali?: string;
}

export default function RiwayatPeminjaman() {
    const router = useRouter();
    const [history, setHistory] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
        return null;
    };

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const userId = getCookie("user_id");
                if (!userId) {
                    setError("User tidak ditemukan.");
                    return;
                }

                const response = await readUserPeminjaman(userId);
                if (response.success && Array.isArray(response.data)) {
                    const returnedBooks = response.data
                        .filter((item) => item.status === "dikembalikan")
                        .map((item) => ({
                            id: item.id,
                            title: item.books?.title || "Judul tidak tersedia",
                            author: item.books?.author || "Author tidak diketahui",
                            image: item.books?.image || "/placeholder.jpg",
                            status: item.status,
                            tanggal_pinjam: item.tanggal_peminjaman,
                            tanggal_kembali: item.tanggal_pengembalian,
                        }));
                    setHistory(returnedBooks);
                }
            } catch (err) {
                console.error("Gagal memuat riwayat peminjaman:", err);
                setError("Gagal memuat riwayat peminjaman.");
            } finally {
                setIsLoading(false);
            }
        };

        loadHistory();
    }, []);

    if (isLoading) return <div className="text-center p-10">Memuat riwayat...</div>;
    if (error) return <div className="text-center p-10 text-red-600">{error}</div>;
    if (history.length === 0) return <div className="text-center p-10 text-gray-500">Tidak ada riwayat peminjaman.</div>;

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Judul Buku
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Tgl. Pinjam
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Tgl. Kembali
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Aksi
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {history.map((book) => (
                                <TableRow key={book.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    src={book.image}
                                                    alt={book.title}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {book.title}
                                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                    {book.author}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {book.tanggal_pinjam ? new Date(book.tanggal_pinjam).toLocaleDateString("id-ID") : "-"}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {book.tanggal_kembali ? new Date(book.tanggal_kembali).toLocaleDateString("id-ID") : "-"}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Badge
                                            size="sm"
                                            color="success"
                                        >
                                            Dikembalikan
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-2">
                                        <Button variant="outline" size="icon" className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push(`/user/detail-peminjaman/${book.id}`)}><Info className="h-4 w-4" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
