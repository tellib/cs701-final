'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

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
        router.replace(`/user/${input}`);
    }

    return (
        <form 
            className="m-3 w-fit border rounded-2xl justify-self-end"
            onSubmit={(e:FormEvent) => {
                e.preventDefault();
                handleSearch();
            }}>
            <input 
                type="text"
                className="px-3 py-1 rounded-l-2xl border-1"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search User..."
            />
            <button className="px-2 py-1 rounded-r-2xl border-1 cursor-pointer">
                &#x1F50E;
            </button>
        </form>
    )
}