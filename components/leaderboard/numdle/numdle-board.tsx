'use client'

import getTopTenTime from "@/lib/leaderboard/numdle/getTopTenTime";
import { numdleLeaderBoardData } from "@/type";
import { useEffect, useState } from "react";
import Board from "./numdle-table";
import getTopTenAttempt from "@/lib/leaderboard/numdle/getTopTenAttempt";
import { Button } from "@mui/joy";
import { useSearchParams } from 'next/navigation'

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
            <div className="flex justify-center">
                <Button onClick={switchTable}>{rankBy}</Button>
            </div>
            <Board data={data}/>
        </>
    )
}