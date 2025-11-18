import { apiFetch } from "./api";

export default async function FetchBooks() {
    return apiFetch("/api/books");
}   