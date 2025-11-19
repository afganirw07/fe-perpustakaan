import DetailBooks from "@/components/users/detail";

export default function Detail({ params }) {
    return (
        <div>
            <DetailBooks id={params.id}/>
        </div>
    );
}
