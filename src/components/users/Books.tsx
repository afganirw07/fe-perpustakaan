"use client"
import { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";

import { FetchBooks } from "@/lib/books";


const BookRating = ({ count }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <Star
                key={i}
                className={`w-4 h-4 ${i < count ? 'text-orange-500 fill-orange-500' : 'text-gray-300'}`}
            />
        );
    }
    return <div className="flex space-x-0.5 ">{stars}</div>;
};

export default function Books() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState(new Set());

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setIsLoading(true);
                const data = await FetchBooks();
                setBooks(data || []);
            } catch (err) {
                console.error("Gagal mengambil data buku:", err);
                setError("Gagal memuat data. Silakan coba lagi.");
                setBooks([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadBooks();
    }, []);

    const handleWishlistToggle = (bookId) => {
        setWishlist(prevWishlist => {
            const newWishlist = new Set(prevWishlist);
            if (newWishlist.has(bookId)) {
                newWishlist.delete(bookId);
            } else {
                newWishlist.add(bookId);
            }
            return newWishlist;
        });
    };

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Memuat data buku...</div>;
    }

    if (error) {
        return <div className="flex h-screen items-center justify-center text-red-600">{error}</div>;
    }

    if (books.length === 0) {
        return <div className="flex h-screen items-center justify-center text-gray-500">Tidak ada buku ditemukan.</div>;
    }


    return (
        <div className="">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {books.map((book) => (
                    <div key={book.id} className="group cursor-pointer text-center">
                        <div className="relative h-64 w-full overflow-hidden rounded-lg">
                            <img
                                src={book.image}
                                alt={`Sampul buku: ${book.title}`}
                                className="w-full h-full object-cover"
                            />
                            <div
                                onClick={() => handleWishlistToggle(book.id)}
                                className="absolute top-2 right-2 p-2 bg-white/70 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white transition"
                            >
                                <Heart
                                    className={`transition-colors duration-300 ${
                                        wishlist.has(book.id) ? 'text-red-500 fill-red-500' : 'text-black'
                                    }`}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800 truncate">
                                {book.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {book.author}
                            </p>
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