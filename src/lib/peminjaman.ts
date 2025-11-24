import { apiFetch } from "./api";

export async function createPeminjaman(data: {
    user_id: string;
    book_id: number;
    full_name?: string;
    address?: string;
    tanggal_peminjaman?: string;
    tanggal_pengembalian?: string;
    status?: string;
    alasan?: string;
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
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error" ; 
        return {
            success: false,
            message
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
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error" ; 
        return {
            success: false,
            message
        };
    }
}

export async function updatePeminjamanStatus(
    id: string,
    status: "pending" | "disetuju" | "ditolak" | "dikembalikan",
    alasan: string
) {
    try {
        const params = new URLSearchParams();
        params.append("status", status);
        if (alasan) {
            params.append("alasan", alasan);
        }
        const res = await apiFetch(`/api/peminjaman/status/${id}?${params.toString()}`, {
            method: "PUT",
        });

        return {
            success: true,
            message: res.message,
            data: res.data,
        };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error" ; 
        return {
            success: false,
            message
        };
    }
}

export async function readUserPeminjaman(user_id: string) {
    try {
        const res = await apiFetch(`/api/peminjaman/${user_id}`, {
            method: "GET",
        });

        return {
            success: true,
            data: res,
        };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error" ; 
        return {
            success: false,
            message
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
    } catch (err : unknown) {
        const message = err instanceof Error ? err.message : "Unknown error" ; 
        return {
            success: false,
            message
        };
    }
}


export async function readUserPeminjamanDetail(id: string) {
    return apiFetch(`/api/peminjaman/${id}`);
}
