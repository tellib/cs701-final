import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant={"outline"} type="submit">
        <LogOut />
        <span>Sign Out</span>
      </Button>
    </form>
  );
}
