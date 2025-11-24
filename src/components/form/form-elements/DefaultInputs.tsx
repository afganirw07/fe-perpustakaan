"use client";

import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import DatePicker from "@/components/form/date-picker";
import { Button } from "@/components/ui/button/Navbutton";
import FetchBooks from "@/lib/books";
import { createPeminjaman } from "@/lib/peminjaman";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BookPreview = ({ book }) => {
  if (!book) return null;

  return (
    <div className="mb-8 p-6 transition duration-300">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
        Detail Buku
      </h3>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Image
          width={200}
          height={300}
          src={book.image}
          alt={book.title}
          className="w-32 h-48 object-cover rounded-md shadow-md border border-gray-200"
        />

        <div>
          <p className="text-2xl font-extrabold text-gray-900">{book.title}</p>
          <p className="text-md text-gray-600 italic mt-1">Oleh: {book.author}</p>
          <p className="text-sm mt-4 text-gray-700">{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function DefaultInputs({ preselectedBookId }) {
  const [form, setForm] = useState({
    full_name: "",
    address: "",
    tanggal_peminjaman: "",
    tanggal_pengembalian: "",
  });

  const [errors, setErrors] = useState({});
  const [book, setBook] = useState(null);
  const router = useRouter();

  // zod
  const borrowingSchema = z.object({
    full_name: z.string().min(1, "Nama lengkap wajib diisi."),
    address: z.string().min(1, "Alamat wajib diisi."),
    tanggal_peminjaman: z.string().min(1, "Tanggal peminjaman wajib diisi.").refine((date) => !isNaN(new Date(date).getTime()), "Format tanggal peminjaman tidak valid."),
    tanggal_pengembalian: z.string().min(1, "Tanggal pengembalian wajib diisi.").refine((date) => !isNaN(new Date(date).getTime()), "Format tanggal pengembalian tidak valid."),
  }).refine((data) => {
    const borrowDate = new Date(data.tanggal_peminjaman);
    const returnDate = new Date(data.tanggal_pengembalian);
    return returnDate >= borrowDate;
  }, {
    message: "Tanggal pengembalian harus setelah atau sama dengan tanggal peminjaman.",
    path: ["tanggal_pengembalian"],
  });

  useEffect(() => {
    const loadBook = async () => {
      if (!preselectedBookId) return;

      const allBooks = await FetchBooks();
      const found = allBooks.find((b) => String(b.id) === String(preselectedBookId));
      setBook(found);
    };

    loadBook();
  }, [preselectedBookId]);

  const handleChange = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setForm((prev) => ({ ...prev, [field]: value }));
  };


  // peminjaman
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      borrowingSchema.parse(form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => (newErrors[err.path[0]] = err.message));
        setErrors(newErrors);
        return;
      }
    }

    const user_id = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_id="))
      ?.split("=")[1];

    if (!user_id) {
      toast.error("Anda harus login untuk mengajukan peminjaman.");
      return;
    }

    const payload = {
      user_id,
      book_id: Number(preselectedBookId),
      full_name: form.full_name,
      address: form.address,
      tanggal_peminjaman: form.tanggal_peminjaman,
      tanggal_pengembalian: form.tanggal_pengembalian,
      status: "pending",
    };

    const res = await createPeminjaman(payload);
    if (res.success) {
      toast.success("Peminjaman berhasil! Tunggu konfirmasi admin");
      setTimeout(() => {

        router.push("/user/homepage");
      }, 2000);
    } else {
      toast.error(res.message || "Gagal mengirim form!");
    }
  };

  return (
    <ComponentCard title="Form Pengajuan Peminjaman Buku">
      <BookPreview book={book} />

      <form onSubmit={handleSubmit} className="space-y-8 p-6">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
          Data Peminjam
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="font-semibold text-gray-700">Nama Lengkap</Label>
            <Input
              value={form.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)}
            />
            {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
          </div>

          <div>
            <Label className="font-semibold text-gray-700">Alamat</Label>
            <Input
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 pt-4">
          Detail Peminjaman
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePicker
            id="tanggal_peminjaman"
            label="Tanggal Peminjaman"
            onChange={(dates, dateStr) => handleChange("tanggal_peminjaman", dateStr)}
          />
          {errors.tanggal_peminjaman && <p className="text-red-500 text-sm mt-1">{errors.tanggal_peminjaman}</p>}

          <DatePicker
            id="tanggal_pengembalian"
            label="Tanggal Pengembalian"
            onChange={(dates, dateStr) => handleChange("tanggal_pengembalian", dateStr)}
          />
          {errors.tanggal_pengembalian && <p className="text-red-500 text-sm mt-1">{errors.tanggal_pengembalian}</p>}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Send className="h-5 w-5" />
            Ajukan Peminjaman
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
