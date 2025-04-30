"use client";

import getUserByName from "@/lib/user/getUserByName";
import { userInfo } from "@/type";
import { useEffect, useState } from "react";
import UserGameCard from "./user-game-card";
import Image from "next/image";
import { Card } from "@mui/joy";

/**
 * A list component that list out users
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 *
 * @param props name: string
 * @returns
 */
export default function UserNameList(props: { name: string }) {
  const [users, setUsers] = useState<userInfo[]>([]);
  const [selectUser, setSelectUser] = useState<string>();

  useEffect(() => {
    getUserByName(props.name).then((data) => {
      setUsers([...data]);
    });
  }, [props.name]);

  return (
    <div className="flex flex-col gap-2 p-4">
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
              <div>
                <hr className="pb-4" />
                <UserGameCard uid={user.id} />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
