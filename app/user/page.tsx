import { auth } from "@/auth"
import UserGameCard from "@/components/user/user-game-card";
import UserSearchBar from "@/components/user/user-serach-bar";

export default async function UserPage() {
    const session = await auth();

    if (!session?.user || !session.user.id) {
        return (
            <></>
        );
    }

    return (
        <>
            <div>
                <UserSearchBar />
            </div>
            <UserGameCard uid={session.user.id} />
        </>
    );
}