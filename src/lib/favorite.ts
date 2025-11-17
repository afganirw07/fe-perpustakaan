import { apiFetch } from "./api";

export async function addUserFavorite(data : {
    user_id : string;
    book_id : number;
}) {
    return apiFetch("/api/favorite/create", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function readFavorite(user_id: string) {
    return apiFetch(`/api/favorite/${user_id}`, {
        method: "GET",
    });
}

export async function readFavoriteLikes(user_id: string) {
    return apiFetch(`/api/favorite/books/${user_id}`, {
        method: "GET",
    });
}


export async function deleteFavorite({ user_id, book_id }: { user_id: string; book_id: number }) {
    return apiFetch(`/api/favorite/${user_id}/${book_id}`, {
        method: "DELETE",
    });
}
