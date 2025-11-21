import { apiFetch } from "./api";

export async function createPeminjaman(data: {
    user_id: string;
    book_id: number;
    full_name?: string;
    address?: string;
    tanggal_peminjaman?: string;
    tanggal_pengembalian?: string;
    status?: string;
}) {
    try {
        const res = await apiFetch("/api/peminjaman/create", {
            method: "POST",
            body: JSON.stringify(data),
        });

        return {
            success: true,
            message: res.message,
            data: res.data,
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message || "Gagal membuat peminjaman",
        };
    }
}

export async function getPeminjamanByUser(user_id: string) {
    try {
        const res = await apiFetch(`/api/peminjaman/${user_id}`, {
            method: "GET",
        });

        return {
            success: true,
            data: res,
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message || "Gagal mengambil data peminjaman",
        };
    }
}

export async function updatePeminjamanStatus(
    id: string,
    status: "pending" | "acc" | "ditolak" | "dikembalikan"
) {
    try {
        const res = await apiFetch(`/api/peminjaman/status/${id}?status=${status}`, {
            method: "PUT",
        });

        return {
            success: true,
            message: res.message,
            data: res.data,
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message || "Gagal update status",
        };
    }
}

export async function readAllPeminjaman() {
    try {
        const res = await apiFetch("/api/peminjaman", {
            method: "GET",
        });

        return {
            success: true,
            data: res,
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message || "Gagal mengambil semua peminjaman",
        };
    }
}
