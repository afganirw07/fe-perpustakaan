import DetailPeminjamanAktif from "@/components/users/detailPinjamanAktif";

export default function DetailPeminjamanPage({ params }: { params: { id: string } }) {
    return (
        <DetailPeminjamanAktif peminjamanId={params.id} />
    );
}
