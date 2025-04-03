import { auth } from "@/auth";

export default async function UserCard() {
  const session = await auth();

  if (!session?.user)
    return (
      <div className="flex gap-1 pb-2">
        <p>Not logged in.</p>
      </div>
    );

  return (
    <div className="flex gap-1 pb-2">
      {session.user.image && (
        <img
          className="w-12 h-12 rounded-full"
          src={session.user.image}
          alt="User Avatar"
        />
      )}
      <div>
        <p>{session.user.name}</p>
        <p className="text-sm">{session.user.email}</p>
      </div>
    </div>
  );
}
