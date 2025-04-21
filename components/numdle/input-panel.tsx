'use client'

import { useEffect, useState } from "react";

interface inputPanelProps {
    makeGuess: (input: number[]) => void;
}

enum buttonColor {
    GRAY = " text-white ",
    GREEN = " text-lime-400 ",
    YELLOW = " text-yellow-400 ",
    RED = " text-red-400 "
}

/**
 * Component for user input.
 * Written by Allen. 
 * 
 * @param inputPanelProps 
 * @returns 
 */
export default function InputPanel({makeGuess}: inputPanelProps) {
    const DIGITCNT = 4;

    const [guess, setGuess] = useState<string[]>(["","","",""]);
    const [note, setNote] = useState<boolean>(false);
    const [keyColor, setKeyColor] = useState<string[][]>([]);

    useEffect(() => {
        const _keyColor: string[][] = [];
        for (let i = 0; i < DIGITCNT; i++) {
            _keyColor[i] = [];
            for (let j = 0; j < 10; j++) {
                _keyColor[i][j] = buttonColor.GRAY;
            }
        }
        setKeyColor([..._keyColor]);
    }, []);

    function handleKeyClick(col: number, row:number) {
        if (note) {
            // chanage the color of the key
            const newKeyColor: string[][] = [];
            for (let i = 0; i < DIGITCNT; i++) {
                newKeyColor[i] = [];
                for (let j = 0; j < 10; j++) {
                    if (i == col && j == row) {
                        switch(keyColor[i][j]) {
                            case buttonColor.GRAY:
                                newKeyColor[i][j] = buttonColor.RED;
                                break;
                            case buttonColor.GREEN:
                                newKeyColor[i][j] = buttonColor.GRAY;
                                break;
                            case buttonColor.YELLOW:
                                newKeyColor[i][j] = buttonColor.GREEN;
                                break;
                            case buttonColor.RED:
                                newKeyColor[i][j] = buttonColor.YELLOW;
                                break;
                        }
                    } else {
                        newKeyColor[i][j] = keyColor[i][j];
                    }
                }
            }
            setKeyColor([...newKeyColor]);
        } else {
            setGuess(guess.map((num:string, i: number) => {
                if (i == col) {
                    return row.toString() !== num ? row.toString() : "";
                } else {
                    return num;
                }
            }));
        }
    }

    function handleMakeGuess() {
        makeGuess(guess.map(num => parseInt(num)));
    }
    
    return (
        <div>
            <div className="text-6xl mb-20">
                {guess.map((num, i) => 
                    {
                        if (num === "") {
                            return (
                                <span key={i} className="mx-4">_</span>
                            )
                        } else {
                            return (
                                <span key={i} className="mx-4 underline">{num}</span>
                            )
                        }
                    }
                )}
            </div>
            <div className="flex justify-end mb-5">
                <button 
                    className={"px-1 mx-1 border rounded hover:bg-blue-700" + (note ? " bg-blue-500 " : "")}
                    onClick={() => setNote(!note)}>
                    {note ? 'Taking...' : 'Notes'} &#9998;
                </button>
                <button 
                    className="px-1 mx-1 border rounded hover:bg-lime-500"
                    onClick={() => handleMakeGuess()}>
                    Guess!
                </button>
            </div>
            <div className="text-2xl flex justify-between">
                {
                    [...Array(DIGITCNT).keys()].map((i: number) => {
                        return (
                            <div key={"col_" + i} className="w-1/8 flex flex-col mx-2">
                                {
                                    [...Array(10).keys()].map((j: number) => {
                                        return (
                                            <button 
                                                key={"col_" + i + "_row_" + j}
                                                className={"border rounded my-0.5" + ((keyColor.length > i && keyColor[i].length > j) ? keyColor[i][j] : buttonColor.GRAY)}
                                                onClick={() => {handleKeyClick(i, j)}}>
                                                {j}
                                            </button>
                                        );
                                    })
                                }
                            </div>
                    )})
                }
            </div>
        </div>
    )
}