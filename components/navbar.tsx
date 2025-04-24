import { Calculator, Gamepad2, Home, Settings, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import UserCard from "./auth/user-card";

const links = [
  { name: "Home", icon: <Home />, href: "/" },
  { name: "Games", icon: <Gamepad2 />, href: "/games" },
  { name: "Leaderboard", icon: <Calculator />, href: "/leaderboard" },
  { name: "Profile", icon: <User />, href: "/profile" },
  { name: "Settings", icon: <Settings />, href: "/settings" },
];

export default function Navbar() {
  // const pathname = usePathname();

  return (
    <nav className="shadow bg-slate-200">
      <div className="flex items-center justify-between py-4 px-6">
        <ul className="flex items-center space-x-2">
          <li>
            <h1 className="text-2xl font-bold">CS701</h1>
          </li>
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>
                <Button
                  variant="outline"
                  // className={pathname === link.href ? "text-red-500" : ""}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="hidden md:inline">{link.name}</span>
                </Button>
              </Link>
            </li>
          ))}
        </ul>
        <UserCard />
      </div>
    </nav>
  );
}
