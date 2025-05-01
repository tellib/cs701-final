// Navbar
// Created by Berk Tellioglu

"use client";

import Link from "next/link";
import { Button } from "@mui/joy";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Games", href: "/games" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "User", href: "/user" },
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
                  textShadow:
                    pathname === link.href ? "#fff 1px 0 10px" : "0px 0px 0px",
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
