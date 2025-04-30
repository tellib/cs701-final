"use client";

import { Calculator, Gamepad2, Home, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@mui/joy";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Games", href: "/games" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Profile", href: "/user" },
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
                sx={{
                  color: pathname === link.href ? '#dddddd' : 'white',
                }}
                >
                <span>{link.name}</span>
                </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
