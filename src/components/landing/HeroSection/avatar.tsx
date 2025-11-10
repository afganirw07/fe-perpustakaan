import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar/AvatarHero"

export function AvatarDemo() {
    return (
        <div className="flex flex-row flex-wrap items-center gap-12">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                <Avatar>
                    <AvatarImage src="https://uns.ac.id/en/wp-content/uploads/2020/05/Design-Kemendagri-Logo-Competition-UNS.jpg" alt="Kemendagri" />
                </Avatar>
                <Avatar>
                    <AvatarImage
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_the_Ministry_of_Social_Affairs_of_the_Republic_of_Indonesia.svg/500px-Logo_of_the_Ministry_of_Social_Affairs_of_the_Republic_of_Indonesia.svg.png"
                        alt="kemensos"
                    />
                </Avatar>
                <Avatar>
                    <AvatarImage
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg/768px-Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg.png"
                        alt="kemendikbud"
                    />
                    </Avatar>
            </div>
        </div>
    )
}
