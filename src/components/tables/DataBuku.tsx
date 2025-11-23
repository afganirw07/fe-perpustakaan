"use client"
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import Image from "next/image";
import FetchBooks, { updateBook, deleteBook } from "@/lib/books";
import { useState, useEffect } from "react";
import { Button } from "../ui/button/Navbutton";
import { Edit, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog/dialog"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    is_available: boolean;
}

export default function DataBuku() {
    const [tableData, setTableData] = useState<Book[]>([]);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const FetchData = async () => {
            const data = await FetchBooks();
            setTableData(data);
        }

        FetchData();
    }, []);

    const handleEditClick = (book: Book) => {
        setEditingBook({ ...book });
        setIsEditDialogOpen(true);
    };

    const handleSave = async () => {
        if (!editingBook) return;

        try {
            const updatedData = await updateBook(editingBook.id, editingBook);
            if (updatedData) {
                const bookToUpdate = updatedData[0];
                setTableData(tableData.map(book => book.id === editingBook.id ? bookToUpdate : book));
            }
            toast.success("Buku berhasil diperbarui.");
            router.refresh();
        } catch (error) {
            console.error("Gagal mengupdate buku:", error);
        } finally {
            setIsEditDialogOpen(false);
            setEditingBook(null);
        }
    };

    const deteleBook = async (id: number) => {
        try {
            const deletedData = await deleteBook(id);
            if (deletedData) {
                setTableData(tableData.filter(book => book.id !== id));
                toast.success("Buku berhasil dihapus.");
                router.refresh();
            }
        } catch (error) {
            console.error("Gagal menghapus buku:", error);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!editingBook) return;
        const { name, value } = e.target;
        setEditingBook({ ...editingBook, [name]: value });
    };


    return (
        <>
            <div className="max-w-full border rounded-2xl bg-white overflow-x-auto">
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
                                    Author
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Stock
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
                            {tableData.map((book) => (
                                <TableRow key={book.id}>
                                    <TableCell key={`${book.id}-judul`} className="px-5 py-4 sm:px-6 text-start">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    src={book.image || "/no-image.png"}
                                                    alt={book.title || "Buku"}
                                                    className="object-cover w-full h-full"
                                                />

                                            </div>
                                            <div>
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                    {book.title}
                                                </span>
                                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                    {book.publisher} - {book.year}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell key={`${book.id}-author`} className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {book.author}
                                    </TableCell>
                                    <TableCell key={`${book.id}-stock`} className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {book.stock}
                                    </TableCell>
                                    <TableCell key={`${book.id}-status`} className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Badge
                                            size="sm"
                                            color={
                                                book.is_available ? "success" : "error"
                                            }
                                        >
                                            {book.is_available ? "Tersedia" : "Dipinjam"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell key={`${book.id}-action`} className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-2">
                                        <Button variant="outline" size="icon" className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleEditClick(book)}><Edit className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon" onClick={() => deteleBook(book.id)} className="h-8 w-8 bg-red-600 hover:bg-red-700 text-white" ><Trash2 className="h-4 w-4" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {editingBook && (
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-900">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">Edit Data Buku</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-400">Judul</label>
                                <input id="title" name="title" value={editingBook.title} onChange={handleInputChange} className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="author" className="text-sm font-medium text-gray-700 dark:text-gray-400">Author</label>
                                <input id="author" name="author" value={editingBook.author} onChange={handleInputChange} className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="publisher" className="text-sm font-medium text-gray-700 dark:text-gray-400">Publisher</label>
                                <input id="publisher" name="publisher" value={editingBook.publisher} onChange={handleInputChange} className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="year" className="text-sm font-medium text-gray-700 dark:text-gray-400">Tahun</label>
                                    <input id="year" name="year" type="number" value={editingBook.year} onChange={handleInputChange} className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="stock" className="text-sm font-medium text-gray-700 dark:text-gray-400">Stock</label>
                                    <input id="stock" name="stock" type="number" value={editingBook.stock} onChange={handleInputChange} className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-400">Deskripsi</label>
                                <textarea id="description" name="description" value={editingBook.description} onChange={handleInputChange} className="dark:bg-dark-900 min-h-[100px] w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => setIsEditDialogOpen(false)} variant="outline">Batal</Button>
                            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">Simpan Perubahan</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
