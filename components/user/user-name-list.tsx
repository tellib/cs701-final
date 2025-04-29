'use client'

import getUserByName from "@/lib/user/getUserByName";
import { userInfo } from "@/type";
import { useEffect, useState } from "react";
import UserGameCard from "./user-game-card";
import Image from "next/image";

/**
 * A list component that list out users
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @param props name: string
 * @returns 
 */
export default function UserNameList(props: {name: string}) {
    const [users, setUsers] = useState<userInfo[]>([]);
    const [selectUser, setSelectUser] = useState<string>();

    useEffect(() => {
        getUserByName(props.name).then((data) => {
            setUsers([...data])
        });
    }, [props.name]);

    return (
        <ul>
            {
                users.map((user) => {
                    return (
                    <li key={user.id} 
                        onClick={() => {setSelectUser(selectUser === user.id ? undefined : user.id)}} 
                        className="border-3 rounded m-3 cursor-pointer hover:bg-gray-100">
                        <div className="m-5 flex">
                            <Image
                                className="object-contain border rounded-full"
                                src={user.image ? user.image : "/images/default-user"}
                                width={50}
                                height={50}
                                alt={`${user.name}'s user icon`}
                            />
                            <span className="content-center mx-2">{user.name}</span>
                        </div>
                        {user.id !== selectUser ? null :
                            <div className="m-5">
                                <hr/>
                                <UserGameCard uid={user.id}/>
                            </div>
                        }
                    </li>
                    )
                })
            }
        </ul>
    )
}