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
        sessionStorage.setItem("access_token", res.access_token);
        sessionStorage.setItem("refresh_token", res.refresh_token);
        sessionStorage.setItem("user_email", res.user);
    }
    return res;
}
