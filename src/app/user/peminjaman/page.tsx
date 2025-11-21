"use client";
import DefaultInputs from "@/components/form/form-elements/DefaultInputs"
import { useSearchParams } from "next/navigation";

export default function PeminjamanPage() {
    const params = useSearchParams();
    const book_id = params.get("book_id");

    return <DefaultInputs preselectedBookId={book_id} />;
}
