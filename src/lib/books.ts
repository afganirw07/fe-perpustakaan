import { apiFetch } from "./api";

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
    is_available: boolean;
}

export default async function FetchBooks() {
    return apiFetch("/api/books");
}   


export async function BookbyId(id : number) {
    return apiFetch(`/api/books/${id}`);
}

export async function updateBook(book_id: number, bookData: Partial<Book>) {
    return apiFetch(`/api/books/${book_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
    });
}

export async function deleteBook(book_id: number) {
    return apiFetch(`/api/books/${book_id}`, {
        method: "DELETE",
    });
}