'use client'

import UserNameList from "@/components/user/user-name-list";
import UserSearchBar from "@/components/user/user-serach-bar";
import { useParams } from "next/navigation"

export default function UserNamePage() {
    const { name } = useParams<{name: string}>();
    
    return (
        <>
            <div>
                <UserSearchBar />
            </div>
            <UserNameList name={name} />
        </>
    )
}