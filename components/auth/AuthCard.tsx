import { Card } from "@mui/joy";
import SignInGoogle from "./SignInGoogle";
import SignInGitHub from "./SignInGitHub";

export function AuthCard() {
  return (
    <Card size="lg" sx={{ width: "100%", maxWidth: "400px" }}>
      <div className="mb-4">
        <h1 className="text-lg font-bold">Login</h1>
        <p className="text-sm">Choose a login method</p>
      </div>
      <div>
        <div className="flex flex-col gap-2 items-center">
          <SignInGoogle />
          <SignInGitHub />
        </div>
      </div>
    </Card>
  );
}
