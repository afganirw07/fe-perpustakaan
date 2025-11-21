import DetailPeminjaman from "@/components/users/detailPeminjaman";

export default function DetailPeminjamanPage({ params } : { params: { id: string } }) {
    return (
        <DetailPeminjaman peminjamanId={params.id} />
    );
}
