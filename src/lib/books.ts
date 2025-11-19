import { apiFetch } from "./api";

export default async function FetchBooks() {
    return apiFetch("/api/books");
}   


export async function BookbyId(id : number) {
    return apiFetch(`/api/books/${id}`);
}