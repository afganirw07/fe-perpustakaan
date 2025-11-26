"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import { Button } from "../ui/button/Navbutton";
import { Edit, Trash2 } from "lucide-react";
import { FetchUsers, deleteUser, editUserByAdmin } from "@/lib/auth";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { toast } from "sonner";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog/dialog";

interface User {
    id: number;
    full_name: string;
    email: string;
    password: string;
    role_user: string;
}

// Ambil role dari cookie
function getRoleFromCookie() {
    if (typeof document === "undefined") return null;

    const role = document.cookie
        .split("; ")
        .find((c) => c.startsWith("role="))
        ?.split("=")[1];

    return role || null;
}

export default function DataPengguna() {
    const [tableData, setTableData] = useState<User[]>([]);
    const [role, setRole] = useState<string | null>(null);

    // Dialog states
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Edit form states
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editRole, setEditRole] = useState("");

    useEffect(() => {
        setRole(getRoleFromCookie());

        const FetchData = async () => {
            const data = await FetchUsers();
            // console.log("==================", data);
            setTableData(data);
        };

        FetchData();
    }, []);

    const handleOpenEdit = (users: User) => {
        setSelectedUser(users);
        setEditName(users.full_name);
        setEditEmail(users.email);
        setEditRole(users.role_user);
        setOpenEdit(true);
    };

    const handleSubmitEdit = async () => {
        if (!selectedUser) return;

        const res = await editUserByAdmin({
            user_id: String(selectedUser.id),
            full_name: editName,
            email: editEmail,
            role_user: editRole,
        });
        toast.success("Pengguna berhasil diperbarui.")

        console.log("==============================R",res);

        const data = await FetchUsers();
        setTableData(data);

        setOpenEdit(false);
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) return;

        await deleteUser(String(selectedUser.id));
        toast.success("Pengguna berhasil dihapus.")

        const data = await FetchUsers();
        setTableData(data);

        setOpenDelete(false);
    };

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start">
                                        Nama Lengkap
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start">
                                        Email
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start">
                                        Role
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start">
                                        Aksi
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {tableData.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="px-5 py-4 text-start font-medium">
                                            {user.full_name}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start">
                                            {user.role_user.toUpperCase()}
                                        </TableCell>
                                        <TableCell className="px-2 py-3 flex gap-2">
                                            {role === "superadmin" && (
                                                <>
                                                    {/* Edit Button */}
                                                    <Button
                                                        onClick={() => handleOpenEdit(user)}
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>

                                                    {/* Delete Button */}
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setOpenDelete(true);
                                                        }}
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 bg-red-600 hover:bg-red-700 text-white"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* ---- DIALOG EDIT ---- */}
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Pengguna</DialogTitle>
                        <DialogDescription>Ubah data pengguna lalu simpan.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nama
                            </Label>
                            <Input
                                id="name"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="col-span-3"
                                placeholder="Nama lengkap"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                className="col-span-3"
                                placeholder="Email"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                                Peran
                            </Label>
                            <select
                                id="role"
                                value={editRole}
                                onChange={(e) => setEditRole(e.target.value)}
                                className="col-span-3 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="superadmin">Superadmin</option>
                                <option value="petugas">Petugas</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                        </DialogClose>
                        <Button onClick={handleSubmitEdit} className="bg-blue-600 text-white hover:bg-blue-700">
                            Simpan Perubahan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ---- DIALOG DELETE ---- */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus Pengguna</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus pengguna <strong>{selectedUser?.full_name}</strong>? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Batal</Button>
                        </DialogClose>
                        <Button
                            onClick={handleDeleteUser}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            Ya, Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
