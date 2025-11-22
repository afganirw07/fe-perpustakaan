"use client";

import React, { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import { Button } from "@/components/ui/button/Navbutton";
import { readUserPeminjaman, updatePeminjamanStatus } from "@/lib/peminjaman";
import { toast } from "sonner";
import { ArrowLeft, Undo2  } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Badge from "../ui/badge/Badge";
// import { Modal } from "../ui/modal";

interface BorrowRequest {
    id: string;
    user_id: string;
    full_name: string;
    address: string;
    tanggal_peminjaman: string;
    tanggal_pengembalian: string | null;
    status: "pending" | "disetuju" | "ditolak" | "dikembalikan";
    books: {
        title: string;
        description: string;
        author: string;
        image: string | null;
    };
}

export default function DetailPeminjamanAktif({ peminjamanId }: { peminjamanId: string }) {
    const [peminjaman, setPeminjaman] = useState<BorrowRequest | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
                console.log("======================TESSSS============================",detailData);
            } else {
                toast.error("Data peminjaman tidak ditemukan.");
            }
            setIsLoading(false);
        };

        loadDetail();
    }, [peminjamanId, router]);

    const handleReturnBook = async () => {
        if (!peminjaman) return;

        const res = await updatePeminjamanStatus(peminjaman.id, "dikembalikan");

        if (res.success) {
            toast.success("Buku berhasil dikembalikan.");
            router.refresh();
        } else {
            toast.error("Gagal mengembalikan buku.");
        }
    };

    // LOADING
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

                {/* Tombol Kembalikan Buku (user only) */}
                {peminjaman.status === "disetuju" && (
                    <div className="flex justify-end pt-4 border-t">
                        <Button
                            onClick={handleReturnBook}
                            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                        >
                            <Undo2  className="h-4 w-4" /> Kembalikan Buku
                        </Button>
                    </div>
                )}
            </div>
        </ComponentCard>
    );
}
