import { signOut } from "@/auth";
import { Button } from "@mui/joy";
import { LogOut } from "lucide-react";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="soft" className="space-x-2" type="submit">
        <LogOut />
        <span>Sign Out</span>
      </Button>
    </form>
  );
}
