import { auth } from "@/auth";
import PageHeader from "@/components/ui/PageHeader";
import UserGameCard from "@/components/user/UserGameCard";
import UserSearchBar from "@/components/user/UserSearchBar";
import { redirect } from "next/navigation";

/**
 * A page that display user's game record
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 *
 * @returns
 */
export default async function UserPage() {
  const session = await auth();

  // if user not logged in, redirect to the login page
  if (!session?.user || !session.user.id) {
    redirect("/auth");
  }

  return (
    <main className="flex flex-col gap-4">
      <div className="flex justify-between">
      <PageHeader>User: {session.user.name}</PageHeader>
      <UserSearchBar />
      </div>
      <UserGameCard uid={session.user.id} />
    </main>
  );
}
