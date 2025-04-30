import { signIn } from "@/auth";
import { Button } from "@mui/joy";
import { FaGoogle } from "react-icons/fa";

export default function SignInGoogle() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button variant="soft" className="space-x-2" type="submit">
        <FaGoogle />
        <span>Sign in with Google</span>
      </Button>
    </form>
  );
}
