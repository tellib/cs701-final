import { auth } from "@/auth";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function UserCard() {
  const session = await auth();

  if (!session?.user)
    return (
      <Link href="/login">
        <Button>Login/Register</Button>
      </Link>
    );

  return (
    <div className="flex gap-1 items-center">
      {session.user.image && (
        <img
          className="w-10 h-10 rounded-full"
          src={session.user.image}
          alt="User Avatar"
        />
      )}
      <div className="flex flex-col justify-center">
        <span>{session.user.name}</span>
        <span className="text-sm">{session.user.email}</span>
      </div>
    </div>
  );
}
