'use client'

import getUserRecords from "@/lib/user/getUserRecords";
import { userGameRecord } from "@/type";
import { useEffect, useState } from "react";
import NumdleItem from "./gamelistItems/numdle-item";

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
            <ul>
                <NumdleItem numdleRecord={gameRecords.numdleRecord} />
            </ul>
        </div>
    );
}