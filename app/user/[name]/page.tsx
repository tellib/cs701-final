'use client'

import UserNameList from "@/components/user/user-name-list";
import UserSearchBar from "@/components/user/user-serach-bar";
import { useParams } from "next/navigation"

/**
 * A page for search result on user name
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @returns 
 */
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