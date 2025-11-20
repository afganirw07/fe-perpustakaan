import { apiFetch } from "./api";

export async function registerUser(data: {
    full_name: string;
    email: string;
    password: string;
    role_user: string;
}) {
    return apiFetch("/api/users/create", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function loginUser(email: string, password: string) {
    const oneWeek = 6048000;

    const res = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });

    if (res.access_token) {
        document.cookie = `access_token=${res.access_token}; Path=/; Max-Age=${oneWeek};`;
        document.cookie = `role=${res.role_user}; Path=/; Max-Age=${oneWeek};`;
        document.cookie = `user_id=${res.user_id}; Path=/; Max-Age=${oneWeek};`;
        document.cookie = `email=${res.email}; Path=/; Max-Age=${oneWeek};`;
        document.cookie = `full_name=${res.full_name}; Path=/; Max-Age=${oneWeek};`;
    }

    return res;
}


export default async function FetchUsers() {
    return apiFetch("/api/users");
}