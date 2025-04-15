'use client'

import { useEffect, useState } from "react";

interface inputPanelProps {
    makeGuess: (input: number[]) => boolean;
}

enum buttonColor {
    GRAY = " text-gray-400 ",
    GREEN = " text-lime-400 ",
    YELLOW = " text-yellow-400 ",
    RED = " text-red-500 "
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
                                newKeyColor[i][j] = buttonColor.GREEN;
                                break;
                            case buttonColor.GREEN:
                                newKeyColor[i][j] = buttonColor.YELLOW;
                                break;
                            case buttonColor.YELLOW:
                                newKeyColor[i][j] = buttonColor.RED;
                                break;
                            case buttonColor.RED:
                                newKeyColor[i][j] = buttonColor.GRAY;
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
        <>
            <div>
                {guess.map((num, i) => 
                    {
                        if (num === "") {
                            return (
                                <span key={i} className="mx-2">_</span>
                            )
                        } else {
                            return (
                                <span key={i} className="mx-2 underline">{num}</span>
                            )
                        }
                    }
                )}
            </div>
            <div>
                <button onClick={() => setNote(!note)}>Take Notes &#9998;</button>
                <button onClick={() => handleMakeGuess()}>Guess!</button>
            </div>
            <div className="flex">
                {
                    [...Array(DIGITCNT).keys()].map((i: number) => {
                        return (
                            <div key={"col_" + i} className="flex flex-col mx-2">
                                {
                                    [...Array(10).keys()].map((j: number) => {
                                        return (
                                            <button 
                                                key={"col_" + i + "_row_" + j}
                                                className={((keyColor.length > i && keyColor[i].length > j) ? keyColor[i][j] : buttonColor.GRAY)}
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
        </>
    )
}