// Button that signs user out (based on AuthJS docs)
// Created by Berk Tellioglu

import { signOut } from "@/auth";
import { Button } from "@mui/joy";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="outlined" className="space-x-2" type="submit">
        <span>Sign Out</span>
      </Button>
    </form>
  );
}
