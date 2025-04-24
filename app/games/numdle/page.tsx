'use client'

import DisplayPanel from "@/components/numdle/display-panel";
import InputPanel from "@/components/numdle/input-panel";
import LogPanel from "@/components/numdle/log-panel";
import checkAnswer from "@/lib/numdle/checkAnswer";
import generateNewGame from "@/lib/numdle/generateNewGame";
import getLogs from "@/lib/numdle/getLogs";
import { numdleLog } from "@/type";
import { useEffect, useState } from "react";

export default function Numdle() {
    const [gameId, setGameId] = useState<number>();
    const [logs, setLogs] = useState<numdleLog[]>([]);
    
    useEffect(() => {
        generateNewGame().then((data) => {
            setGameId(data);
        });
    }, []);

    function handleGuess(guess: number[]) {
        if (guess.includes(NaN)) {
            return false;
        }
        if (gameId === undefined) {
            return false;
        }

        checkAnswer(guess, gameId).then((data) => {
            getLogs(gameId).then((data) => {
                setLogs([...data.map((log) => {
                    return {
                        guess: log.guess,
                        perfect: log.perfect,
                        imperfect: log.imperfect
                    } as numdleLog
                })])
            })
            
            if (data) {
                alert("Correct!");
            }
        });
    }

    return (
        <div className="flex flex-nowrap h-screen text-xl bg-blue-950 text-white">
            <div className="w-1/3 flex justify-center my-auto">
                <DisplayPanel/>
            </div>
            <div className="w-1/3 flex justify-center my-auto">
                <InputPanel makeGuess={handleGuess} />
            </div>
            <div className="w-1/3 flex justify-center my-auto">
                <LogPanel logs={logs} />
            </div>
            
        </div>
    )
}