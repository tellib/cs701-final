'use client'

import InputPanel from "@/components/numdle/input-panel";
import generateAnswer from "@/lib/numdle/generateAnswer";
import { useEffect, useState } from "react";

export default function Numdle() {
    const [ans, setAns] = useState<number[]>([]);
    
    useEffect(() => {
        generateAnswer().then((data) => {
            console.log(data);
            setAns(data);
        });
    }, []);

    function handleGuess(guess: number[]) {
        if (guess.length < 4) {
            return false;
        }
        for (let i = 0; i < ans.length; i++) {
            if (ans[i] != guess[i]) {
                return false;
            }
        }

        // trigger some event after user correct
        alert("Correct!");
        return true;
    }

    return (
        <>
            <InputPanel makeGuess={handleGuess} />
        </>
    )
}