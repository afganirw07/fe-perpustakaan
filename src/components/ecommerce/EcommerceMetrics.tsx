"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowUpIcon, GroupIcon } from "@/icons";
import { FetchUsers } from "@/lib/auth";
import { useState, useEffect } from "react";
import { readAllPeminjaman } from "@/lib/peminjaman";
import { Book } from "lucide-react";

interface User {
  id: number;
  full_name: string;
  email: string;
  password: string;
  role_user: string;
}

interface Peminjaman {
  id: string;
  user_id: string;
  book_id: number;
  full_name: string;

}

export const EcommerceMetrics = () => {
  const [tableData, setTableData] = useState<User[]>([]);
  const [totalPeminjaman, setTotalPeminjaman] = useState<Peminjaman[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const FetchData = async () => {
      try {
        const data = await FetchUsers();
        const peminjaman = await readAllPeminjaman();
        setTotalPeminjaman(peminjaman.data);
  
        setTableData(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    FetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Pengguna
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {tableData.length}
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            {tableData.length}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Book className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Peminjaman
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totalPeminjaman.length}
            </h4>
          </div>

          <Badge color="success">
            <ArrowUpIcon />
            {totalPeminjaman.length}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
