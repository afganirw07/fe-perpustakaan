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
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
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
            </div>
        </>
    );
}
