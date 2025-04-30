'use client'

import { Button } from "@mui/joy";
import { useEffect, useState } from "react";

// interface for the component property
interface inputPanelProps {
    makeGuess: (input: number[]) => void;
}

// enum for the button color when taking note
enum buttonColor {
    GRAY = "neutral",
    GREEN = "success",
    YELLOW = "warning",
    RED = "danger"
}

/**
 * An input component to handle user input and notes
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @param inputPanelProps function for making guess
 * @returns 
 */
export default function InputPanel({makeGuess}: inputPanelProps) {
    const DIGITCNT = 4;

    const [guess, setGuess] = useState<string[]>(["","","",""]);
    const [note, setNote] = useState<boolean>(false);
    const [keyColor, setKeyColor] = useState<buttonColor[][]>([]);

    // set the button color to default when page load
    useEffect(() => {
        const _keyColor: buttonColor[][] = [];
        for (let i = 0; i < DIGITCNT; i++) {
            _keyColor[i] = [];
            for (let j = 0; j < 10; j++) {
                _keyColor[i][j] = buttonColor.GRAY;
            }
        }
        setKeyColor([..._keyColor]);
    }, []);

    // when user click button, if note is true, change the button color, else, set the input and display on top
    function handleKeyClick(col: number, row:number) {
        if (note) {
            // chanage the color of the key
            const newKeyColor: buttonColor[][] = [];
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

    // pass the guess to parent
    function handleMakeGuess() {
        makeGuess(guess.map(num => parseInt(num)));
    }
    
    return (
        <div className="bg-blue-950 flex flex-col gap-2 p-4 rounded-xl flex-1">
            <div className="flex flex-1 text-lg gap-1">
                {guess.map((num, i) => 
                    <Button sx={{flex: "1"}} aria-readonly variant={"soft"} key={i}><pre>{num ? num : " "}</pre></Button>
                )}
            </div>
            <Button 
                color="success"
                    onClick={() => handleMakeGuess()}>
                    Guess!
                </Button>
            <div className="text-2xl flex gap-1">
                {
                    [...Array(DIGITCNT).keys()].map((i: number) => {
                        return (
                            <div key={"col_" + i} className="flex text-lg flex-1 flex-col gap-1">
                                {
                                    [...Array(10).keys()].map((j: number) => {
                                        return (
                                            <Button 
                                                key={"col_" + i + "_row_" + j}
                                                color={((keyColor.length > i && keyColor[i].length > j) ? keyColor[i][j] : buttonColor.GRAY)}
                                                onClick={() => {handleKeyClick(i, j)}}>
                                                <pre>{j}</pre>
                                            </Button>
                                        );
                                    })
                                }
                            </div>
                    )})
                }
            </div>
            <Button 
            sx={{width: "100%"}}
                color={"primary"}
                    onClick={() => setNote(!note)}>
                    {note ? 'Taking Notes...' : 'Add Notes'} &#9998;
                </Button>
        </div>
    )
}