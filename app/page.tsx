import SignInGitHub from "@/components/auth/sign-in-github";
import SignInGoogle from "@/components/auth/sign-in-google";
import SignOut from "@/components/auth/sign-out";
import UserCard from "@/components/ui/user-card";

export default function Home() {
  return (
    <main className="p-2">
      <UserCard />
      <SignInGitHub />
      <SignInGoogle />
      <SignOut />
    </main>
  );
}
