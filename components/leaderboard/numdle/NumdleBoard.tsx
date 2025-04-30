'use client'

import getTopTenTime from "@/lib/leaderboard/numdle/getTopTenTime";
import { numdleLeaderBoardData } from "@/type";
import { useEffect, useState } from "react";
import Board from "./NumdleTable";
import getTopTenAttempt from "@/lib/leaderboard/numdle/getTopTenAttempt";
import { Button } from "@mui/joy";

enum RankBy {
    ClearTime = 'Best Clear Time',
    Attempts = 'Best Attempts'
}

/**
 * A leaderboard component for numdle.
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @returns 
 */
export default function NumdleBoard() {
    const [data, setData] = useState<numdleLeaderBoardData[]>([]);
    const [rankBy, setRankBy] = useState<RankBy>(RankBy.ClearTime);

    useEffect(() => {
        switch (rankBy) {
            case RankBy.Attempts:
                getTopTenAttempt().then((data) => {
                    setData([...data]);
                })
                break;
            case RankBy.ClearTime:
                getTopTenTime().then((data) => {
                    setData([...data]);
                })
                break;
        }
    }, [rankBy]);

    function switchTable() {
        switch (rankBy) {
            case RankBy.Attempts:
                setRankBy(RankBy.ClearTime);
                break;
            case RankBy.ClearTime:
                setRankBy(RankBy.Attempts);
                break;
        }
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <Button variant="soft" onClick={switchTable}>{rankBy}</Button>
                <Board data={data}/>
            </div>
            
        </>
    )
}