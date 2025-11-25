"use client";

import React, { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import { Button } from "@/components/ui/button/Navbutton";
import { readUserPeminjaman, updatePeminjamanStatus } from "@/lib/peminjaman";
import { toast } from "sonner";
import { ArrowLeft, Undo2, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Badge from "../ui/badge/Badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog/dialog"
import { createReview } from "@/lib/ulasan";
import FetchBooks, { updateBook } from "@/lib/books";

interface BorrowRequest {
    id: string;
    user_id: string;
    book_id: number;
    full_name: string;
    address: string;
    tanggal_peminjaman: string;
    tanggal_pengembalian: string | null;
    status: "pending" | "disetuju" | "ditolak" | "dikembalikan";
    alasan?: string;
    books: {
        title: string;
        description: string;
        author: string;
        image: string | null;
        stock: number;
    };
}

export default function DetailPeminjamanAktif({ peminjamanId }: { peminjamanId: string }) {
    const [peminjaman, setPeminjaman] = useState<BorrowRequest | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const router = useRouter();

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
        return null;
    };

    useEffect(() => {
        const loadDetail = async () => {
            setIsLoading(true);
            const userId = getCookie("user_id");
            if (!userId) {
                toast.error("User tidak ditemukan. Silakan login kembali.");
                setIsLoading(false);
                return;
            }
            const response = await readUserPeminjaman(userId);
            if (response.success && Array.isArray(response.data)) {
                const detailData = response.data.find((p: BorrowRequest) => p.id === peminjamanId);
                setPeminjaman(detailData || null);
                // console.log("======================TESSSS============================", detailData);
            } else {
                toast.error("Data peminjaman tidak ditemukan.");
            }
            setIsLoading(false);
        };

        loadDetail();
    }, [peminjamanId, router]);

    const handleSubmitReviewAndReturn = async () => {
        if (rating === 0 || comment.trim() === "") {
            toast.error("Rating dan ulasan tidak boleh kosong.");
            return;
        }
        if (!peminjaman) return;

        try {
            await createReview({
                borrow_id: peminjaman.id,   
                user_id: peminjaman.user_id,
                book_id: peminjaman.book_id,
                rating: rating,
                review_text: comment,       
            });

            // Correctly update book stock
            const allBooks = await FetchBooks();
            const bookToUpdate = allBooks.find(b => b.id === peminjaman.book_id);
            
            if (bookToUpdate) {
                const updatedStock = bookToUpdate.stock + 1;
                await updateBook(peminjaman.book_id, { ...bookToUpdate, stock: updatedStock });
            } else {
                toast.error("Gagal menemukan data buku untuk memperbarui stok.");
            }

            const returnRes = await updatePeminjamanStatus(peminjaman.id, "dikembalikan");
            if (returnRes.success) {
                toast.success("Ulasan berhasil dikirim dan buku telah dikembalikan.");
                setTimeout(() => {
                    router.back();
                }, 2000);
                setIsModalOpen(false);
                router.refresh();
            } else {
                toast.error("Gagal mengembalikan buku setelah mengirim ulasan.");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat mengirim ulasan.");
            console.error(error);
        }
    };

    if (isLoading) {
        return <ComponentCard>Memuat detail peminjaman...</ComponentCard>;
    }

    if (!peminjaman) {
        return <ComponentCard>Data peminjaman tidak ditemukan.</ComponentCard>;
    }

    return (
        <ComponentCard>
            <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold">Detail Peminjaman</h2>

                <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Kembali
                </Button>
            </div>

            <div className="p-6 space-y-8">
                {/* Detail Buku */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <Image
                        width={150}
                        height={225}
                        src={peminjaman.books?.image || "/default-book.png"}
                        alt={peminjaman.books?.title || "Buku"}
                        className="w-36 h-auto object-cover rounded-md shadow-lg border"
                    /> 

                    <div className="flex-1">
                        <p className="text-2xl font-bold text-gray-900">{peminjaman.books.title}</p>
                        <p className="text-md text-gray-600 italic mt-1">Oleh: {peminjaman.books.author}</p>

                        <p className="text-md text-gray-700 mt-2 text-justify">
                            {peminjaman.books.description}
                        </p>

                        <div className="mt-4">
                            <Label>Status</Label>
                            <Badge
                                color={
                                    peminjaman.status === "disetuju"
                                        ? "success"
                                        : peminjaman.status === "pending"
                                            ? "warning"
                                            : peminjaman.status === "dikembalikan"
                                                ? "info"
                                                : "error"
                                }
                            >
                                {peminjaman.status}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Informasi Peminjam */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Data Peminjam</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label>Nama Lengkap</Label>
                            <input
                                defaultValue={peminjaman.full_name}
                                readOnly
                                className="flex h-10 w-full rounded-md border bg-gray-100 px-3 py-2 text-sm cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <Label>Alamat</Label>
                            <input
                                defaultValue={peminjaman.address}
                                readOnly
                                className="flex h-10 w-full rounded-md border bg-gray-100 px-3 py-2 text-sm cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <Label>Tanggal Peminjaman</Label>
                            <input
                                defaultValue={new Date(peminjaman.tanggal_peminjaman).toLocaleDateString()}
                                readOnly
                                className="flex h-10 w-full rounded-md border bg-gray-100 px-3 py-2 text-sm cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <Label>Batas Pengembalian</Label>
                            <input
                                defaultValue={
                                    peminjaman.tanggal_pengembalian
                                        ? new Date(peminjaman.tanggal_pengembalian).toLocaleDateString()
                                        : "-"
                                }
                                readOnly
                                className="flex h-10 w-full rounded-md border bg-gray-100 px-3 py-2 text-sm cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                {/* Alasan Penolakan */}
                {peminjaman.status === "ditolak" && peminjaman.alasan && (
                    <div className="space-y-2">
                        <Label className="font-semibold text-red-600">Alasan Penolakan</Label>
                        <textarea
                            value={peminjaman.alasan}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-200 dark:border-red-700 cursor-not-allowed"
                            rows={3}
                        />
                    </div>
                )}
                {/* Tombol Kembalikan Buku (user only) */}
                {peminjaman.status === "disetuju" && (
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <div className="flex justify-end pt-4 border-t">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                                    <Undo2 className="h-4 w-4" /> Kembalikan Buku
                                </Button>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Berikan Ulasan Anda</DialogTitle>
                                <DialogDescription>
                                    Bagaimana pendapat Anda tentang buku ini? Ulasan Anda sangat berarti.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-5 py-2">
                                <div>
                                    <Label className="font-medium">Rating</Label>
                                    <div className="flex items-center gap-2 mt-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-7 w-7 cursor-pointer transition-colors ${rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                                onClick={() => setRating(star)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="comment" className="font-medium">Ulasan</Label>
                                    <textarea
                                        id="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Tulis ulasan Anda di sini..."
                                        className="w-full mt-2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition"
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
                                <Button onClick={handleSubmitReviewAndReturn} disabled={rating === 0 || comment.trim() === ""} className="bg-blue-600 hover:bg-blue-700 text-white">
                                    Kirim & Kembalikan
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </ComponentCard>
    );
}
