"use client";
import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import { Button } from "../ui/button/Navbutton";
import { Check, X, Info, Search } from "lucide-react";
import { readAllPeminjaman } from "@/lib/peminjaman";
import { useRouter } from "next/navigation";
import { updatePeminjamanStatus } from "@/lib/peminjaman";
import { toast } from "sonner";
import { Input } from "@/components/ui/input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import { updateBook } from "@/lib/books";
import FetchBooks from "@/lib/books";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog/dialog"


interface BorrowRequest {
    id: string;
    user_id: string;
    book_id: number;
    full_name: string;
    tanggal_peminjaman: string;
    tanggal_pengembalian: string | null;
    status: "pending" | "disetuju" | "ditolak" | "dikembalikan";
    alasan: string | null;
    books: {
        title: string;
        image: string | null;
    };
}

export default function PeminjamanBuku() {
    const [tableData, setTableData] = useState<BorrowRequest[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
    const [currentRejectId, setCurrentRejectId] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const router = useRouter();


    useEffect(() => {
        const FetchData = async () => {
            const res = await readAllPeminjaman();
            setTableData(Array.isArray(res?.data) ? res.data : []);
        };

        FetchData();
    }, []);

    const handleStatusUpdate = async (id: string, status: "disetuju" | "ditolak" | "dikembalikan", alasan?: string) => {
        if (status === "ditolak" && !alasan) {
            setCurrentRejectId(id);
            setIsRejectDialogOpen(true);
            return;
        }

        const p = tableData.find((item) => item.id === id);

        if (!p) {
            toast.error("Data peminjaman tidak ditemukan.");
            return;
        }

        if (status === "disetuju") {
            try {
                const allBooks = await FetchBooks();
                const book = allBooks.find((b) => b.id === p.book_id);

                if (book) {
                    // update stock
                    const updatedStock = book.stock > 0 ? book.stock - 1 : 0; 
                    await updateBook(book.id, { ...book, stock: updatedStock });
                }
            } catch (error) {
                console.error("Failed to update book stock:", error);
                toast.error("Gagal memperbarui stok buku.");
                return;
            }
        }

        const res = await updatePeminjamanStatus(id, status, alasan);
        console.log(res);
        if (res.success) {
            toast.success(`Peminjaman berhasil ${status === "disetuju" ? "disetujui" : status}`);
            setTimeout(() => {
                
                window.location.reload();
            }, 3000);
            setIsRejectDialogOpen(false);
            setRejectionReason(""); // Clear reason
            setCurrentRejectId(null); // Clear current ID
        } else {
            toast.error(res.message || "Gagal memperbarui status.");
        }
    };

    const handleRejectSubmit = async () => {
        if (!currentRejectId || rejectionReason.trim() === "") {
            toast.error("Alasan penolakan tidak boleh kosong.");
            return;
        }
        await handleStatusUpdate(currentRejectId, "ditolak", rejectionReason);
    };

    const filteredData = tableData.filter(p => {
        const matchesSearch =
            p.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.books.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || p.status === statusFilter;

        return matchesSearch && matchesStatus;
    });


    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type="text" placeholder="Cari nama peminjam." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 h-10 w-full dark:bg-gray-800" />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="h-10 w-full sm:w-[180px] dark:bg-gray-800">
                            <SelectValue placeholder="Filter Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="disetuju">Disetujui</SelectItem>
                            <SelectItem value="ditolak">Ditolak</SelectItem>
                            <SelectItem value="dikembalikan">Dikembalikan</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>
                            {/* HEADER */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Nama Peminjam
                                    </TableCell>

                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Tanggal Pinjam
                                    </TableCell>

                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Tanggal Kembali 
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

                            {/* BODY */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {filteredData.length > 0 ? filteredData.map((p) => (
                                    <TableRow key={p.id}>

                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {p.full_name}
                                            </span>
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {new Date(p.tanggal_peminjaman).toLocaleDateString()}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {p.tanggal_pengembalian
                                                ? new Date(p.tanggal_pengembalian).toLocaleDateString()
                                                : "-"}
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell className="px-4 py-3">
                                            <Badge
                                                size="sm"
                                                color={
                                                    p.status === "disetuju"
                                                        ? "success"
                                                        : p.status === "pending"
                                                            ? "warning"
                                                            : p.status === "dikembalikan"
                                                                ? "info"
                                                                : "error"
                                                }
                                            >
                                                {p.status}
                                            </Badge>
                                        </TableCell>

                                        {/* Tombol Aksi */}
                                        <TableCell className="px-2 py-3">
                                            <div className="flex items-center gap-2">
                                                {p.status === "pending" && (
                                                    <>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 bg-green-600 hover:bg-green-700 text-white"
                                                            onClick={() =>
                                                                handleStatusUpdate(p.id, "disetuju")
                                                            }
                                                        >
                                                            <Check className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8 bg-red-600 hover:bg-red-700 text-white"
                                                            onClick={() =>
                                                                handleStatusUpdate(p.id, "ditolak")
                                                            }
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                )}
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/admin/data-peminjaman/${p.id}`);
                                                        console.log(p.id);
                                                    }}
                                                >
                                                    <Info className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-10">
                                            <p className="text-gray-500">Tidak ada data peminjaman yang cocok dengan kriteria filter.</p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Dialog Alasan Penolakan */}
                <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                    <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900">
                        <DialogHeader className="border-b pb-4">
                            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
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
                                    placeholder="Contoh: Stok buku habis, peminjam melebihi batas, dll."
                                />
                            </div>
                        </div>
                        <DialogFooter className="border-t pt-4">
                            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Batal</Button>
                            <Button onClick={handleRejectSubmit} className="bg-red-600 hover:bg-red-700 text-white">Tolak Peminjaman</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
