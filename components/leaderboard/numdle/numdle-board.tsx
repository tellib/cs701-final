'use client'

import getTopTenTime from "@/lib/leaderboard/numdle/getTopTenTime";
import { numdleLeaderBoardData } from "@/type";
import { useEffect, useState } from "react";
import Board from "./numdle-table";
import getTopTenAttempt from "@/lib/leaderboard/numdle/getTopTenAttempt";

enum RankBy {
    ClearTime = 'Best Clear Time',
    Attempts = 'Best Attempts'
}

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
                <button className='border-2 rounded p-1 m-1 font-bold' onClick={switchTable}>{rankBy}</button>
            </div>
            <Board data={data}/>
        </>
    )
}