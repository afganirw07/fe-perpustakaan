import { Suspense } from "react";
import PeminjamanClient from "./PeminjamanClient";

export default function PeminjamanPage() {
    return (
        <Suspense fallback={<div>Memuat formulir...</div>}>
            <PeminjamanClient />
        </Suspense>
    );
}
