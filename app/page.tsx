import SignInGitHub from "@/components/auth/sign-in-github";
import SignInGoogle from "@/components/auth/sign-in-google";
import SignOut from "@/components/auth/sign-out";
import UserCard from "@/components/auth/user-card";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-4 pt-8 space-y-2">
      <h1 className="font-bold text-4xl">CS701 Final Project</h1>
      <p className="text-current/60">Project created with NextJS, AuthJS, Drizzle, PostgreSQL, TailwindCSS, and ShadCN.</p>
    </main>
  );
}
