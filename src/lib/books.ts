import { apiFetch } from "./api";

export async function FetchBooks() {
    return apiFetch("/api/books");
} 