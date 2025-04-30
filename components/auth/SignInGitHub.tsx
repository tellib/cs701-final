import { signIn } from "@/auth";
import { Button } from "@mui/joy";
import { FaGithub } from "react-icons/fa";

export default function SignInGitHub() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button variant="soft" className="space-x-2" type="submit">
        <FaGithub />
        <span>Sign in with GitHub</span>
      </Button>
    </form>
  );
}
