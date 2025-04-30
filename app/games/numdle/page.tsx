"use client";

import InputPanel from "@/components/games/numdle/NumdleInputPanel";
import LogPanel from "@/components/games/numdle/NumdleLogPanel";
import PageHeader from "@/components/ui/PageHeader";
import checkAnswer from "@/lib/numdle/checkAnswer";
import generateNewGame from "@/lib/numdle/generateNewGame";
import getLogs from "@/lib/numdle/getLogs";
import removeGame from "@/lib/numdle/removeGame";
import { numdleLog } from "@/type";
import { Button } from "@mui/joy";

import { Suspense, useEffect, useState } from "react";

/**
 * A page for numdle game
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 *
 * @returns
 */
export default function Numdle() {
  const [id, setId] = useState<number>();
  const [logs, setLogs] = useState<numdleLog[]>([]);

  // generate a new game when the page load
  useEffect(() => {
    setLogs([]);
    generateNewGame().then((data) => {
      setId(data);
    });
  }, []);

  // remove the game from db if the game is not finished when user leave the page
  useEffect(() => {
    window.addEventListener("beforeunload", unloadEvent);

    return () => {
      window.removeEventListener("beforeunload", unloadEvent);
    };
  }, [id]);

  function unloadEvent() {
    removeGame(id);
  }

  // pass guess to server to confirm the guess and update the logs
  function handleGuess(guess: number[]) {
    if (guess.includes(NaN)) {
      return false;
    }
    if (id === undefined) {
      return false;
    }

    checkAnswer(guess, id).then((data) => {
      getLogs(id).then((data) => {
        setLogs([
          ...data.map((log) => {
            return {
              guess: log.guess,
              perfect: log.perfect,
              imperfect: log.imperfect,
            } as numdleLog;
          }),
        ]);
      });

      // if the user get the answer correctly, popup the window alert to inform that and clean the log and game id
      if (data) {
        setId(undefined);
        setLogs([]);
        alert("Correct!");
      }
    });
  }

  // reload the page to start a new game
  function handleReset() {
    removeGame(id).then(() => window.location.reload());
  }

  return (
    <main className="flex-1 flex flex-col gap-4">
      <PageHeader>Numdle</PageHeader>
      <p>
        Guess the correct number! Perfect Guess means the right digit is in the
        right place. Imperfect Guess means you have the right digit, but in the
        wrong place.
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col md:flex-row rounded-lg gap-4 px-16 sm:px-24 md:px-24 lg:px-36">
          <InputPanel makeGuess={handleGuess} />
          <LogPanel logs={logs} />
        </div>
        <Button variant={"soft"} onClick={handleReset}>
          New Game/Reset
        </Button>
      </Suspense>
    </main>
  );
}
