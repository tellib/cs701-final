'use client'

import DisplayPanel from "@/components/numdle/display-panel";
import InputPanel from "@/components/numdle/input-panel";
import LogPanel from "@/components/numdle/log-panel";
import checkAnswer from "@/lib/numdle/checkAnswer";
import generateNewGame from "@/lib/numdle/generateNewGame";
import getLogs from "@/lib/numdle/getLogs";
import removeGame from "@/lib/numdle/removeGame";
import { numdleLog } from "@/type";

import { useEffect, useState } from "react";

export default function Numdle() {
    const [id, setId] = useState<number>();
    const [logs, setLogs] = useState<numdleLog[]>([]);
    
    useEffect(() => {
        setLogs([]);
        generateNewGame().then((data) => {
            setId(data);
        });
    }, []);

    useEffect(() => {
        window.addEventListener('beforeunload', unloadEvent);

        return () => {
            window.removeEventListener('beforeunload', unloadEvent);
        }
    }, [id])

    function unloadEvent() {
        removeGame(id);
    }

    function handleGuess(guess: number[]) {
        if (guess.includes(NaN)) {
            return false;
        }
        if (id === undefined) {
            return false;
        }

        checkAnswer(guess, id).then((data) => {
            getLogs(id).then((data) => {
                setLogs([...data.map((log) => {
                    return {
                        guess: log.guess,
                        perfect: log.perfect,
                        imperfect: log.imperfect
                    } as numdleLog
                })])
            })
            
            if (data) {
                setId(undefined);
                setLogs([]);
                alert("Correct!");
            }
        });
    }

    function handleReset() {
        removeGame(id).then(() =>
            window.location.reload()
        );
    }

    return (
        <div className="bg-blue-950 text-white text-xl h-screen">
            <div className="m-3">
                <button className="border rounded px-1" onClick={handleReset}>New Game &#8635;</button>
            </div>
            <div className="flex flex-nowrap">
                <div className="w-1/3 flex justify-center my-auto">
                    <DisplayPanel/>
                </div>
                <div className="w-1/3 flex justify-center my-auto">
                    <InputPanel makeGuess={handleGuess}/>
                </div>
                <div className="w-1/3 flex justify-center my-auto">
                    <LogPanel logs={logs} />
                </div>
            </div>
        </div>
    )
}