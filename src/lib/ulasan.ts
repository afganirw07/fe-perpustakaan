import { apiFetch } from "./api";

export interface ReviewPayload {
    borrow_id: string;
    user_id: string;
    book_id: number;
    rating: number;
    review_text: string;
}


export async function createReview(data: ReviewPayload) {
    return apiFetch("/api/review/create", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function getReviewByBorrow(borrow_id: string) {
    return apiFetch(`/api/review/${borrow_id}`, {
        method: "GET",
    });
}


export async function getReviewsByBook(book_id: number) {
    return apiFetch(`/api/review/book/${book_id}`, {
        method: "GET",
    });
}


export async function getReviewsByUser(user_id: string) {
    return apiFetch(`/api/review/user/${user_id}`, {
        method: "GET",
    });
}
