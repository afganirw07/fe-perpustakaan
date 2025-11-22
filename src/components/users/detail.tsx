"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import Badge from "../ui/badge/Badge";
import Books from "./Books";
import FetchBooks from "@/lib/books";
import Image from "next/image";
import { Button } from "../ui/button/Navbutton";
import { Heart, BookOpenCheck } from "lucide-react";
import { addUserFavorite, readFavorite, deleteFavorite } from "@/lib/favorite";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getReviewsByBook } from "@/lib/ulasan";

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
    total_pages: number;
    language: string;
    location_code: string;
    condition: string;
    is_available: boolean;
    stars: number;
}

interface Review {
    id: string;
    users: {
        full_name: string;
    };
    rating: number;
    review_text: string;
    created_at: string;
}

interface DetailProps {
    id: string;
}

export default function DetailBooks({ id }: DetailProps) {
    const [book, setBook] = useState<Book | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [wishlist, setWishlist] = useState<Set<number>>(new Set());
    const router = useRouter();


    function getCookie(name: string): string | undefined {
        if (typeof document === 'undefined') return undefined;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";")[0];
    }

    useEffect(() => {
        const loadFavorites = async () => {
            const userId = getCookie("user_id");
            if (userId) {
                try {
                    const favorites = await readFavorite(userId);
                    const favoriteBookIds = favorites.map((fav: { book_id: number }) => fav.book_id);
                    setWishlist(new Set(favoriteBookIds));
                } catch (err) {
                    console.error("Gagal memuat favorit:", err);
                }
            }
        };
        loadFavorites();
    }, []);

    const toggleFavorite = async (bookId: number) => {
        const userId = getCookie("user_id");
        if (!userId) {
            toast.error("Anda harus login untuk menambahkan favorit.");
            return;
        }

        const isFavorite = wishlist.has(bookId);
        const newWishlist = new Set(wishlist);

        try {
            if (isFavorite) {
                await deleteFavorite({ user_id: userId, book_id: bookId });
                newWishlist.delete(bookId);
                toast.success("Berhasil dihapus dari favorit");
            } else {
                await addUserFavorite({ user_id: userId, book_id: bookId });
                newWishlist.add(bookId);
                toast.success("Berhasil ditambahkan ke favorit");
            }
            setWishlist(newWishlist);
        } catch (err) {
            console.error("Gagal memperbarui favorit:", err);
            toast.error("Gagal memperbarui status favorit.");
        }
    };

    useEffect(() => {
        const loadBookAndReviews = async () => {
            try {
                const allBooks: Book[] = await FetchBooks();
                const found = allBooks.find((b) => String(b.id) === String(id));
                setBook(found || null);

                if (found) {
                    const reviewData = await getReviewsByBook(found.id);
                    if (reviewData.success && Array.isArray(reviewData.data)) {
                        setReviews(reviewData.data);
                    }
                    // console.log("=================DATA==============",reviewData);
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadBookAndReviews();
    }, [id]);

    if (isLoading) {
        return <div className="p-10 text-center">Memuat detail buku...</div>;
    }

    if (!book) {
        return (
            <div className="p-10 text-center text-red-500">
                Buku tidak ditemukan.
            </div>
        );
    }

    const bookDetails = [
        { label: "Penulis", value: book.author },
        { label: "Penerbit", value: book.publisher },
        { label: "Tahun Terbit", value: book.year },
        { label: "ISBN", value: book.isbn },
        { label: "Kategori", value: book.category },
        { label: "Jumlah Halaman", value: `${book.total_pages} halaman` },
        { label: "Bahasa", value: book.language },
        { label: "Lokasi Buku", value: book.location_code },
        { label: "Kondisi", value: book.condition },
        { label: "Stok", value: book.stock },
    ];

    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-5 h-5 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.53-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex-shrink-0">
                    <div className="aspect-[2/3] w-full mb-4 rounded-lg overflow-hidden shadow-md">
                        <Image
                            width={400}
                            height={600}
                            src={book.image}
                            alt={book.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                <div className="md:w-2/3">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        {book.title}
                    </h1>

                    <p className="text-sm text-gray-600 mb-4">{book.author}</p>

                    <p className="text-gray-700 leading-relaxed mb-4">
                        {book.description}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                        <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-300"
                        >
                            {book.category}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-300"
                        >
                            {book.publisher}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-300"
                        >
                            {book.author}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-300"
                        >
                            {book.language}
                        </Badge>
                    </div>

                    <Table className="border-t border-gray-200">
                        <TableBody>
                            {bookDetails.map((detail, index) => (
                                <TableRow
                                    key={index}
                                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                >
                                    <TableCell className="font-semibold text-gray-700 w-1/3 py-2 px-4">
                                        {detail.label}
                                    </TableCell>
                                    <TableCell className="text-gray-900 w-2/3 py-2 px-4">
                                        {detail.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex flex-row gap-6 py-7">
                        <Button
                            onClick={() => router.push(`/user/peminjaman?book_id=${book.id}`)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
                        >
                            <BookOpenCheck className="mr-2 h-4 w-4" /> Pinjam
                        </Button>

                        <Button
                            onClick={() => toggleFavorite(book.id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
                        >
                            <Heart className={`mr-2 h-4 w-4 transition-colors duration-300 ${wishlist.has(book.id) ? "fill-white" : ""
                                }`} />
                            Favorit
                        </Button>
                    </div>
                </div>
            </div>


            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                    Ulasan
                </h2>

                {reviews.length > 0 ? (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="p-4 border rounded-lg bg-white shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-semibold text-gray-800">
                                        {review.users?.full_name || "Pengguna Anonim"}
                                    </p>

                                    <span className="text-xs text-gray-500">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <StarRating rating={review.rating} />
                                <p className="text-gray-700 mt-2">{review.review_text}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-yellow-500 rounded-lg p-4">
                        <p className="text-black">Belum ada ulasan untuk buku ini.</p>
                    </div>
                )}

                <div className="mt-6">
                    <h1 className="text-xl font-semibold text-gray-900 mb-3">
                        Rekomendasi Buku Lain
                    </h1>
                    <Books />
                </div>
            </div>
        </div>
    );
}