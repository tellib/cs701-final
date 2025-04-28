"use client";

import { Calculator, Gamepad2, Home, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", icon: <Home />, href: "/" },
  { name: "Games", icon: <Gamepad2 />, href: "/games" },
  { name: "Leaderboard", icon: <Calculator />, href: "/leaderboard" },
  { name: "Profile", icon: <User />, href: "/user" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center space-x-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "",
                  pathname === link.href
                    ? "text-gray-500 hover:text-gray-400"
                    : ""
                )}
              >
                {/* <span className="text-lg">{link.icon}</span> */}
                <span>{link.name}</span>
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
