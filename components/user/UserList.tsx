"use client";

import getUserByName from "@/lib/user/getUserByName";
import { userInfo } from "@/type";
import { Suspense, useEffect, useState } from "react";
import UserGameCard from "./UserGameCard";
import Image from "next/image";
import { Card } from "@mui/joy";
import Loading from "../ui/Loading";

/**
 * A list component that list out users
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 *
 * @param props name: string
 * @returns
 */
export default function UserList(props: { name: string }) {
  const [users, setUsers] = useState<userInfo[]>([]);
  const [selectUser, setSelectUser] = useState<string>();

  // get the search result of users based on the name passed in
  useEffect(() => {
    getUserByName(props.name).then((data) => {
      setUsers([...data]);
    });
  }, [props.name]);

  // if there is no user match the name
  if (users.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <Card size="lg" className="text-center">
          No users found
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {users.map((user) => {
        return (
          <Card
            key={user.id}
            size="lg"
            onClick={() => {
              setSelectUser(selectUser === user.id ? undefined : user.id);
            }}
          >
            <div className="flex items-center gap-4">
              <Image
                className="object-contain border rounded-full"
                src={user.image ? user.image : "/images/default-user"}
                width={50}
                height={50}
                alt={`${user.name}'s user icon`}
                
              />
               <span className="text-left">{user.name}</span>
             
            </div>
            {user.id !== selectUser ? null : (
              <Suspense fallback={<Loading />}>
                <UserGameCard uid={user.id} />
              </Suspense>
            )}
          </Card>
        );
      })}
    </div>
  );
}
