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
import { Check, X, Info } from "lucide-react";
import { readAllPeminjaman } from "@/lib/peminjaman";
import { useRouter } from "next/navigation";
import { updatePeminjamanStatus } from "@/lib/peminjaman";
import { toast } from "sonner";


interface BorrowRequest {
    id: string;
    user_id: string;
    book_id: number;
    full_name: string;
    tanggal_peminjaman: string;
    tanggal_pengembalian: string | null;
    status: "pending" | "disetuju" | "ditolak" | "dikembalikan";
    books: {
        title: string;
        image: string | null;
    };
}

export default function PeminjamanBuku() {
    const [tableData, setTableData] = useState<BorrowRequest[]>([]);
    const router = useRouter();


    useEffect(() => {
        const FetchData = async () => {
            const res = await readAllPeminjaman();
            setTableData(Array.isArray(res?.data) ? res.data : []);
        };

        FetchData();
    }, []);

    const handleStatusUpdate = async (id: string, status: "disetuju" | "ditolak" | "dikembalikan") => {
        const res = await updatePeminjamanStatus(id, status);
        console.log(res);
        if (res.success) {
            toast.success(`Peminjaman berhasil ${status === "disetuju" ? "disetujui" : status}`);
            router.refresh();
        } else {
            toast.error(res.message || "Gagal memperbarui status.");
        }
    };


    return (
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
                            {tableData.map((p) => (
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
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
