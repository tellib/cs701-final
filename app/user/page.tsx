import { auth } from "@/auth"
import UserGameCard from "@/components/user/user-game-card";
import UserSearchBar from "@/components/user/user-serach-bar";

/**
 * A page that display user's game record
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @returns 
 */
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