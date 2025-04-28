import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

export default function SignInGoogle() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit">
        <FaGoogle />
        <span>Sign in with Google</span>
      </Button>
    </form>
  );
}
