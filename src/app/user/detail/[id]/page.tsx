import DetailBooks from "@/components/users/detail";

export default function Detail({ params }: { params: { id: string } }) {
    return (
        <div>
            <DetailBooks id={params.id}/>
        </div>
    );
}
