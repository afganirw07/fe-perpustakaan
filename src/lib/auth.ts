import { apiFetch } from "./api";

export async function registerUser(data: any) {
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

    if (res.token) localStorage.setItem("token", res.token);
    return res;
}
