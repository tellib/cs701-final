"use client";

import PageHeader from "@/components/ui/PageHeader";
import UserNameList from "@/components/user/UserList";
import UserSearchBar from "@/components/user/UserSearchBar";
import { useParams } from "next/navigation";

/**
 * A page for search result on user name
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 *
 * @returns
 */
export default function UserNamePage() {
  const { name } = useParams<{ name: string }>();

  return (
    <main className="flex flex-col gap-4">
     <div className="flex justify-between">
     <PageHeader>User: Results for {decodeURIComponent(name)}</PageHeader>
     <UserSearchBar />
     </div>
      <UserNameList name={decodeURIComponent(name)} />
    </main>
  );
}
