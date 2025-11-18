import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "403 Forbidden - Akses Ditolak",
    description: "Anda tidak memiliki izin untuk mengakses halaman ini.",
};

export default function ForbiddenPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">403 - Forbidden</h1>
            <p className="mt-4 text-gray-600">
                Kamu tidak memiliki izin untuk mengakses halaman ini.
            </p>
        </div>
    );
}
