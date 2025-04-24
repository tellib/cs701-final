import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

export default function SignInGitHub() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button type="submit">
        <FaGithub />
        <span>Sign in with GitHub</span>
      </Button>
    </form>
  );
}
