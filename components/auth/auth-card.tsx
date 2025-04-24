import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInGoogle from "./sign-in-google";
import SignInGitHub from "./sign-in-github";

export function AuthCard() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Choose a login method</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 items-center">
          <SignInGoogle />
          <SignInGitHub />
        </div>
      </CardContent>
    </Card>
  );
}
