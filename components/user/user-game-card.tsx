'use client'

import getUserRecords from "@/lib/user/getUserRecords";
import { userGameRecord } from "@/type";
import { useEffect, useState } from "react";
import NumdleItem from "./gamelistItems/numdle-item";

/**
 * A componant used to list out different game records
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @param props uid: string
 * @returns 
 */
export default function UserGameCard(props: {uid: string}) {
    const [gameRecords, setGameRecords] = useState<userGameRecord | null>();
    
    useEffect(() => {
        getUserRecords(props.uid).then((data) => {
            setGameRecords(data);
        })
    }, []);

    if (!gameRecords) {
        return (
            <div className="text-center">Loading...</div>
        )
    }

    return (
        <div>
            <ul className="flex flex-wrap justify-between">
                <NumdleItem numdleRecord={gameRecords.numdleRecord} />
            </ul>
        </div>
    );
}