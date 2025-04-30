// Page for logging in and registering
// Created by Berk Tellioglu

import { auth } from "@/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="flex-1 flex items-center justify-center">
      <AuthCard />
    </main>
  );
}
