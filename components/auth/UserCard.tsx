import { auth } from "@/auth";
import { Button } from "@mui/joy";
import Link from "next/link";
import SignOut from "./SignOut";

export default async function UserCard() {
  const session = await auth();

  if (!session?.user)
    return (
      <Link href="/auth">
        <Button variant="outlined">Login/Register</Button>
      </Link>
    );

  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col justify-center">
        <span>{session.user.name}</span>
      </div>
      {session.user.image && (
        <img
          className="w-8 h-full rounded-full"
          src={session.user.image}
          alt="User Avatar"
        />
      )}
      <SignOut />
    </div>
  );
}
