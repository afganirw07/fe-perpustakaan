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
    const res = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });

    if (res.access_token) {
        document.cookie = `access_token=${res.access_token}; Path=/; Max-Age=86400;`;
        document.cookie = `role=${res.role_user}; Path=/; Max-Age=86400;`;
        document.cookie = `user_id=${res.user_id}; Path=/; Max-Age=86400;`;

        sessionStorage.setItem("full_name", res.full_name);
        sessionStorage.setItem("email", res.email);
    }

    return res;
}


export default async function FetchUsers() {
    return apiFetch("/api/users");
}