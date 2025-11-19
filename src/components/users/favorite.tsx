"use client";
import { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import { deleteFavorite, readFavoriteLikes } from "@/lib/favorite";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Book {
    id: number;
    title: string;
    author: string;
    image: string;
    stars?: number;
}

interface RatingProps {
    count: number;
}

const BookRating = ({ count }: RatingProps) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <Star
                key={i}
                className={`w-4 h-4 ${i < count ? "text-orange-500 fill-orange-500" : "text-gray-300"
                    }`}
            />
        );
    }
    return <div className="flex space-x-0.5">{stars}</div>;
};

export default function FavoriteBook() {
    const router = useRouter();

    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
        return null;
    };

    useEffect(() => {
        const loadFavorite = async () => {
            try {
                setIsLoading(true);
                const userId = getCookie("user_id");
                if (!userId) return;

                const data: Book[] = await readFavoriteLikes(userId);
                setBooks(data || []);
            } catch (err) {
                setError("Gagal memuat data. Silakan coba lagi.");
                setBooks([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadFavorite();
    }, []);

    const deleteFavoriteBook = async (bookId: number) => {
        const userId = getCookie("user_id");
        if (!userId) return;

        try {
            await deleteFavorite({ user_id: userId, book_id: bookId });
            toast.success("Berhasil dihapus dari favorite");
            setBooks((prev) => prev.filter((book) => book.id !== bookId));
        } catch (err) {
            toast.error("Gagal menghapus data");
        }
    };

    if (isLoading)
        return (
            <div className="flex h-screen items-center justify-center">
                Memuat data buku...
            </div>
        );

    if (error)
        return (
            <div className="flex h-screen items-center justify-center text-red-600">
                {error}
            </div>
        );

    if (books.length === 0)
        return (
            <div className="flex h-screen items-center justify-center text-gray-500">
                Tidak ada buku ditemukan.
            </div>
        );

    return (
        <div className="">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {books.map((book) => (
                    <div key={book.id}
                        onClick={() => router.push(`/user/detail/${book.id}`)}
                        className="group cursor-pointer text-center">
                        <div className="relative h-64 w-full overflow-hidden rounded-lg">
                            <Image
                                width={200}
                                height={300}
                                src={book.image}
                                alt={`Sampul buku: ${book.title}`}
                                className="w-full h-full object-cover"
                            />
                            <div
                                onClick={() => deleteFavoriteBook(book.id)}
                                className="absolute top-2 right-2 p-2 bg-white/70 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white transition"
                            >
                                <Heart className="transition-colors duration-300 text-red-500 fill-red-500" />
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800 truncate">
                                {book.title}
                            </h3>
                            <p className="text-sm text-gray-500">{book.author}</p>
                            <div className="mt-2 flex justify-center">
                                <BookRating count={book.stars ?? 5} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
