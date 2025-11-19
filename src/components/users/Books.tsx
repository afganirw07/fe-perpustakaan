"use client";
import { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import { addUserFavorite, readFavorite, deleteFavorite } from "@/lib/favorite";
import { toast } from "sonner";
import FetchBooks from "@/lib/books";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearch } from "@/context/SearchContext";



interface Book {
    id: number;
    title: string;
    author: string;
    publisher?: string;
    year?: number;
    isbn?: string;
    category?: string;
    description?: string;
    image: string;
    stock?: number;
    total_pages?: number;
    language?: string;
    location_code?: string;
    condition?: string;
    is_available?: boolean;
    stars: number;
}

interface BookRatingProps {
    count: number;
}

const BookRating = ({ count }: BookRatingProps) => {
    return (
        <div className="flex space-x-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < count ? "text-orange-500 fill-orange-500" : "text-gray-300"
                        }`}
                />
            ))}
        </div>
    );
};


export default function Books() {
    const router = useRouter();

    const [books, setBooks] = useState<Book[]>([]);
    const [wishlist, setWishlist] = useState<Set<number>>(new Set());
    const [error, setError] = useState<string | null>(null);
    const { query } = useSearch();

    const filteredBooks = books.filter((book) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
            book.title.toLowerCase().includes(q) ||
            book.author.toLowerCase().includes(q)
        );
    });


    function getCookie(name: string): string | undefined {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";")[0];
    }

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const userId = getCookie("user_id");

                const allBooks: Book[] = await FetchBooks();

                let favoriteBooks: number[] = [];
                if (userId) {
                    const favorites = await readFavorite(userId);
                    favoriteBooks = favorites.map((fav: { book_id: number }) => fav.book_id);
                }

                setWishlist(new Set(favoriteBooks));
                setBooks(allBooks || []);
            } catch (err) {
                console.error("Error fetching books:", err);
                setError("Gagal mengambil data buku.");
                setBooks([]);
            }
        };

        loadBooks();
    }, []);


    const toggleFavorite = async (
        bookId: number,
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        const userId = getCookie("user_id");
        if (!userId) return;

        const isFavorite = wishlist.has(bookId);

        try {
            if (isFavorite) {
                await deleteFavorite({ user_id: userId, book_id: bookId });
                toast.success("Berhasil dihapus dari favorite");

                setWishlist((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(bookId);
                    return newSet;
                });
            } else {
                await addUserFavorite({ user_id: userId, book_id: bookId });
                toast.success("Berhasil ditambahkan ke favorite");

                setWishlist((prev) => new Set([...prev, bookId]));
            }
        } catch (err) {
            console.error("Gagal update favorite:", err);
            toast.error("Gagal memperbarui status favorite");
        }
    };
    

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {filteredBooks.map((book) => (
                    <div
                        key={book.id}
                        className="group cursor-pointer text-center"
                        onClick={() => router.push(`/user/detail/${book.id}`)}
                    >
                        <div className="relative h-64 w-full overflow-hidden rounded-lg">
                            <Image
                                src={book.image}
                                alt={`Sampul buku: ${book.title}`}
                                className="w-full h-full object-cover"
                                width={200}
                                height={300}
                            />

                            {/* Favorite Button */}
                            <div
                                onClick={(e) => toggleFavorite(book.id, e)}
                                className="absolute top-2 right-2 p-2 bg-white/70 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white transition"
                            >
                                <Heart
                                    className={`transition-colors duration-300 ${wishlist.has(book.id)
                                        ? "text-red-500 fill-red-500"
                                        : "text-black"
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800 truncate">
                                {book.title}
                            </h3>
                            <p className="text-sm text-gray-500">{book.author}</p>
                            <div className="mt-2 flex justify-center">
                                <BookRating count={book.stars} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
