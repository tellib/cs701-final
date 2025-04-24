import { auth } from "@/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="h-full p-2 pt-10 flex items-center justify-center">
      <AuthCard />
    </main>
  );
}
