"use client"
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import { useState, useEffect } from "react";
import { Button } from "../ui/button/Navbutton";
import { Edit, Trash2 } from "lucide-react";
import {FetchUsers} from "@/lib/auth";

interface User {
    id: number;
    full_name: string;
    email: string;
    password: string;
    role_user: string;
}

export default function DataPengguna() {
    const [tableData, setTableData] = useState<User[]>([]);

    useEffect(() => {
        const FetchData = async () => {
            const data = await FetchUsers();
            setTableData(data);
        }

        FetchData();
    }, []);


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
                                    Nama Lengkap
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Email
                                </TableCell>
                                    <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Role
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
                            {tableData.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {user.full_name}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.email}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {user.role_user.toUpperCase()}
                                    </TableCell>
                                    <TableCell className="px-2 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-2">
                                        <Button variant="outline" size="icon" className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white"><Edit className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon" className="h-8 w-8 bg-red-600 hover:bg-red-700 text-white"><Trash2 className="h-4 w-4" /></Button>
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
