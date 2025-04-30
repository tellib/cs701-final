"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Input, Button } from "@mui/joy";

/**
 * A form component that used to search user by name
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 *
 * @returns
 */
export default function UserSearchBar() {
  const [input, setInput] = useState<string>("");
  const router = useRouter();

  function handleSearch() {
    router.replace(`/user/${encodeURIComponent(input)}`);
  }

  return (
    <form
      className="flex gap-2"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <Input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search User..."
      />
      <Button>Search</Button>
    </form>
  );
}
