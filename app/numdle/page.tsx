'use client'

import DisplayPanel from "@/components/numdle/display-panel";
import InputPanel from "@/components/numdle/input-panel";
import LogPanel from "@/components/numdle/log-panel";
import generateAnswer from "@/lib/numdle/generateAnswer";
import { numdleLog } from "@/type";
import { useEffect, useState } from "react";

export default function Numdle() {
    const DIGITCNT = 4;

    const [ans, setAns] = useState<number[]>([]);
    const [logs, setLogs] = useState<numdleLog[]>([]);
    
    useEffect(() => {
        generateAnswer().then((data) => {
            console.log(data);
            setAns(data);
        });
    }, []);

    function handleGuess(guess: number[]) {
        if (guess.length < 4 || guess.includes(NaN)) {
            return false;
        }

        const guessLog: numdleLog = {
            guess: [...guess],
            perfect: 0,
            imperfect: 0
        };
        const tempAns = [...ans];
        for (let i = 0; i < tempAns.length; i++) {
            if (tempAns[i] == guess[i]) {
                guessLog.perfect += 1;
                tempAns[i] = -1;
            } else if (tempAns.includes(guess[i])) {
                guessLog.imperfect += 1;
                tempAns[tempAns.indexOf(guess[i])] = -1;
            }
        }
        
        if (guessLog.perfect === DIGITCNT) {
            // trigger some event after user correct
            alert("Correct!");
            return true;
        } else {
            setLogs([...logs, guessLog]);
            return false;
        }
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