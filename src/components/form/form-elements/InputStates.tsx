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
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Kolom Kiri */}
          <div className="space-y-5">
            <div>
              <Label>Judul Buku</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Koala Kumal"
                required
              />
            </div>
            <div>
              <Label>Penulis</Label>
              <Input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Contoh: Raditya Dika"
                required
              />
            </div>
            <div>
              <Label>Penerbit</Label>
              <Input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Contoh: Gagas Media"
                required
              />
            </div>
            <div>
              <Label>ISBN</Label>
              <Input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="Contoh: 978-979-780-790-2"
              />
            </div>
            <div>
              <Label>Kategori</Label>
              <Input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Contoh: Humor"
              />
            </div>
            <div>
              <Label>URL Gambar Sampul</Label>
              <Input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label>Deskripsi</Label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Masukkan deskripsi singkat buku"
                rows={5}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tahun Terbit</Label>
                <Input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Contoh: 2015"
                  required
                />
              </div>
              <div>
                <Label>Total Halaman</Label>
                <Input
                  type="number"
                  value={totalPages}
                  onChange={(e) => setTotalPages(e.target.value)}
                  placeholder="Contoh: 250"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Stok</Label>
                <Input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Contoh: 30"
                />
              </div>
              <div>
                <Label>Rating (1-5)</Label>
                <Input
                  type="number"
                  value={stars}
                  onChange={(e) => setStars(e.target.value)}
                  placeholder="Contoh: 4"
                  min="1"
                  max="5"
                />
              </div>
            </div>
            <div>
              <Label>Bahasa</Label>
              <Input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Contoh: Indonesia"
              />
            </div>
            <div>
              <Label>Kode Lokasi</Label>
              <Input
                type="text"
                value={locationCode}
                onChange={(e) => setLocationCode(e.target.value)}
                placeholder="Contoh: RAK-07-B"
              />
            </div>
            {/* Select inputs can be added here if you have a Select component */}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-8 flex justify-end border-t border-gray-200 pt-5">
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
            Simpan Buku
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
