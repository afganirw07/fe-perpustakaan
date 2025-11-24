"use client";

import React, { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import { Button } from "@/components/ui/button/Navbutton";
import { readAllPeminjaman, updatePeminjamanStatus } from "@/lib/peminjaman";
import { toast } from "sonner";
import { Check, X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog/dialog";
import Badge from "../ui/badge/Badge";

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
    };
}

export default function DetailPeminjaman({ peminjamanId }: { peminjamanId: string }) {
    const [peminjaman, setPeminjaman] = useState<BorrowRequest | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    const router = useRouter();

    useEffect(() => {
        const fetchDetailPeminjaman = async () => {
            setIsLoading(true);
            const res = await readAllPeminjaman();
            if (res.success && Array.isArray(res.data)) {
                const detailData = res.data.find((p) => p.id === peminjamanId);
                console.log(detailData);
                if (detailData) {
                    setPeminjaman(detailData);
                } else {
                    toast.error("Data peminjaman tidak ditemukan.");
                    router.push("/admin/data-peminjaman");
                }
            } else {
                toast.error("Gagal memuat data peminjaman.");
            }
            setIsLoading(false);
        };

        if (peminjamanId) {
            fetchDetailPeminjaman();
        }
    }, [peminjamanId, router]);

    const handleStatusUpdate = async (status: "disetuju" | "ditolak", alasan?: string) => {
        if (!peminjaman) return;

        if (status === "ditolak" && !alasan) {
            setIsRejectDialogOpen(true);
            return;
        }

        const res = await updatePeminjamanStatus(peminjaman.id, status, alasan);
        if (res.success) {
            toast.success(`Peminjaman berhasil di-${status === "disetuju" ? "setujui" : "tolak"}`);
            router.refresh();
            setIsRejectDialogOpen(false);
            setRejectionReason("");
        } else {
            toast.error(res.message || "Gagal memperbarui status.");
        }
    };

    const handleRejectSubmit = async () => {
        if (!peminjaman) return;

        if (rejectionReason.trim() === "") {
            toast.error("Alasan penolakan tidak boleh kosong.");
            return;
        }

        await handleStatusUpdate("ditolak", rejectionReason);
    };

    if (isLoading) {
        return <ComponentCard title="Detail Peminjaman">Memuat data...</ComponentCard>;
    }

    if (!peminjaman) {
        return <ComponentCard title="Detail Peminjaman">Data tidak ditemukan.</ComponentCard>;
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
                        <p className="text-2xl font-bold text-gray-900">{peminjaman?.books?.title ?? "Judul tidak tersedia"}
                        </p>
                        <p className="text-md text-gray-600 italic mt-1">Oleh: {peminjaman?.books?.author ?? "Pengarang tidak tersedia"}</p>
                        <p className="text-md text-gray-600 mt-1 text-justify">{peminjaman?.books?.description ?? "Description tidak tersedia"}</p>
                        <div className="mt-4">
                            <Label>Status</Label>
                            <Badge
                                color={
                                    peminjaman.status === "disetuju" ? "success" :
                                        peminjaman.status === "pending" ? "warning" :
                                            peminjaman.status === "dikembalikan" ? "info" : "error"
                                }
                            >
                                {peminjaman.status}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Form Readonly */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Data Peminjam</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label>Nama Lengkap</Label>
                            <input defaultValue={peminjaman.full_name} readOnly className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm cursor-not-allowed" />
                        </div>
                        <div>
                            <Label>Alamat</Label>
                            <input defaultValue={peminjaman.address} readOnly className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm cursor-not-allowed" />
                        </div>
                        <div>
                            <Label>Tanggal Peminjaman</Label>
                            <input defaultValue={new Date(peminjaman.tanggal_peminjaman).toLocaleDateString()} readOnly className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm cursor-not-allowed" />
                        </div>
                        <div>
                            <Label>Tanggal Pengembalian</Label>
                            <input
                                defaultValue={peminjaman.tanggal_pengembalian
                                    ? new Date(peminjaman.tanggal_pengembalian).toLocaleDateString()
                                    : "-"}
                                readOnly
                                className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm cursor-not-allowed"
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
                    </div>)}

                {/* Tombol Aksi */}
                {peminjaman.status === "pending" && (
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        {/* Tombol Tolak sekarang membuka dialog */}
                        <Button onClick={() => setIsRejectDialogOpen(true)} className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"><X className="h-4 w-4" /> Tolak</Button>
                        <Button onClick={() => handleStatusUpdate("disetuju")} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"><Check className="h-4 w-4" /> Setujui</Button>
                    </div>
                )}
            </div>

            {/* Dialog Alasan Penolakan */}
            <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900">
                    <DialogHeader className="border-b pb-4">
                        <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                            <X className="h-5 w-5 text-red-500" />
                            Konfirmasi Penolakan
                        </DialogTitle>
                        <DialogDescription>
                            Berikan alasan yang jelas mengapa peminjaman ini ditolak.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="space-y-2">
                            <label htmlFor="rejectionReason" className="text-sm font-medium text-gray-700 dark:text-gray-400">Alasan Penolakan</label>
                            <textarea
                                id="rejectionReason"
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                className="dark:bg-dark-900 min-h-[100px] w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                rows={4}
                                placeholder="Contoh: Stok buku tidak tersedia, data peminjam tidak valid, dll."
                            />
                        </div>
                    </div>
                    <DialogFooter className="border-t pt-4">
                        <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Batal</Button>
                        <Button onClick={handleRejectSubmit} className="bg-red-600 hover:bg-red-700 text-white">Tolak Peminjaman</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ComponentCard>
    );
}
