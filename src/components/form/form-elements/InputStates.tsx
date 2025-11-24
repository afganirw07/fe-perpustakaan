"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";
import { createBook } from "@/lib/books";
import { Button } from "@/components/ui/button/Navbutton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); 
  const [stock, setStock] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [language, setLanguage] = useState("");
  const [locationCode, setLocationCode] = useState("");
  const [condition, setCondition] = useState("Baru");
  const [isAvailable, setIsAvailable] = useState(true);
  const [stars, setStars] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const bookData = {
        title,
        author,
        publisher,
        year: parseInt(year, 10) || 0,
        isbn,
        category,
        description,
        image,
        stock: parseInt(stock, 10) || 0,
        total_pages: parseInt(totalPages, 10) || 0,
        language,
        location_code: locationCode,
        condition,
        is_available: isAvailable,
        stars: parseInt(stars, 10) || 0,
      };
      await createBook(bookData);
      toast.success("Buku berhasil dibuat!");
      router.refresh();
      // Reset form
      setTitle("");
      setAuthor("");
      setPublisher("");
      setYear("");
      setIsbn("");
      setCategory("");
      setDescription("");
      setImage("");
      setStock("");
      setTotalPages("");
      setLanguage("");
      setLocationCode("");
      setCondition("Baru");
      setIsAvailable(true);
      setStars("");
    } catch (error) {
      console.error("Gagal membuat buku:", error);
      alert("Gagal membuat buku. Silakan coba lagi.");
    }
  };

  return (
    <ComponentCard
      title="Buat Buku Baru"
      desc="Isi formulir di bawah ini untuk menambahkan buku baru ke dalam koleksi."
    >
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Kolom Kiri: Gambar & URL */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex justify-center">
              <img
                src={image || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png"}
                width={250}
                height={300}
                className="object-cover rounded-lg shadow-lg border w-full h-auto max-w-[220px]"
                onError={(e) => (e.currentTarget.src = "/no-image.png")}
              />

            </div>
            <div className="space-y-2">
              <Label>URL Gambar Sampul</Label>
              <textarea
                value={image}
                onChange={(e) => setImage(e.target.value)}
                rows={4}
                className="dark:bg-dark-900 text-xs w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
          </div>

          {/* Kolom Kanan: Form Fields */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <div className="sm:col-span-2 space-y-2">
              <Label>Judul Buku</Label>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Koala Kumal" required />
            </div>
            <div className="space-y-2">
              <Label>Penulis</Label>
              <Input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Contoh: Raditya Dika" required />
            </div>
            <div className="space-y-2">
              <Label>Penerbit</Label>
              <Input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Contoh: Gagas Media" required />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <Label>ISBN</Label>
              <Input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder="Contoh: 978-979-780-790-2" />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Contoh: Humor" />
            </div>
            <div className="space-y-2">
              <Label>Bahasa</Label>
              <Input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Contoh: Indonesia" />
            </div>
            <div className="space-y-2">
              <Label>Tahun Terbit</Label>
              <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Contoh: 2015" required />
            </div>
            <div className="space-y-2">
              <Label>Total Halaman</Label>
              <Input type="number" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} placeholder="Contoh: 250" required />
            </div>
            <div className="space-y-2">
              <Label>Stok</Label>
              <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Contoh: 30" />
            </div>
            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <Input type="number" value={stars} onChange={(e) => setStars(e.target.value)} placeholder="Contoh: 4" min="1" max="5" />
            </div>
            <div className="space-y-2">
              <Label>Kode Lokasi</Label>
              <Input type="text" value={locationCode} onChange={(e) => setLocationCode(e.target.value)} placeholder="Contoh: RAK-07-B" />
            </div>
            <div className="space-y-2">
              <Label>Kondisi</Label>
              <Input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Contoh: Baru" />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <Label>Deskripsi</Label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Masukkan deskripsi singkat buku"
                rows={5}
                className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-8 flex justify-end border-t border-gray-200 dark:border-gray-700 pt-5">
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
            Simpan Buku
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
