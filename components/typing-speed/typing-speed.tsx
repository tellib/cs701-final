"use client";

import { useState, useEffect } from "react";
import {
  generateSentence,
  calculateWPM,
  countMistakes,
} from "@/lib/typing-speed/actions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function TypingSpeedGame() {
  const [gameStart, setGameStart] = useState(false);
  const [words, setWords] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60); // 1 min
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [wpm, setWPM] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);

  useEffect(() => {
    loadSentence();
    setTimeLeft(60); // 1 min
  }, [gameStart]);

  useEffect(() => {
    if (isFinished) return;

    if (timeLeft <= 0) {
      finishGame();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  useEffect(() => {
    if (!isFinished) {
      updateStats();
    }
  }, [userInput]);

  const loadSentence = async () => {
    const sentence = await generateSentence();
    setWords(sentence);
  };

  const updateStats = async () => {
    const elapsed = 60 - timeLeft;
    if (elapsed <= 0) return;

    const wpmResult = await calculateWPM(userInput, elapsed);
    const mistakesResult = await countMistakes(words, userInput);

    setWPM(wpmResult);
    setMistakes(mistakesResult);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const finishGame = async () => {
    setIsFinished(true);
    await updateStats();
  };

  const restartGame = async () => {
    setUserInput("");
    setTimeLeft(60);
    setIsFinished(false);
    setWPM(0);
    setMistakes(0);
    await loadSentence();
  };

  if (!gameStart) {
    return (
      <main className="flex flex-col p-8 space-y-6">
        <h1 className="text-4xl font-bold">Typing Speed Game</h1>
        <p className="text-lg">Test your typing speed and accuracy.</p>
        <Button onClick={() => setGameStart(true)}>Start Game</Button>
      </main>
    );
  }

  return (
    <main className="flex flex-col p-8 space-y-6">
      <h1 className="text-4xl font-bold">Typing Speed Game</h1>

      <div className="text-left text-lg select-none cursor-default leading-relaxed break-words whitespace-pre-wrap">
        {words.split("").map((char, idx) => {
          let background = "";
          if (idx < userInput.length) {
            background =
              userInput[idx] === char ? "bg-yellow-300" : "bg-red-300";
          }

          return (
            <span key={idx} className={`${background}`}>
              {char}
            </span>
          );
        })}
      </div>

      <div className="flex gap-8 text-xl">
        <pre>Time Left: {timeLeft}s</pre>
        <pre>WPM: {wpm}</pre>
        <pre>Mistakes: {mistakes}</pre>
      </div>

      <Input
        className="bg-white"
        type="text"
        placeholder="Start typing here..."
        value={userInput}
        autoFocus
        onChange={handleChange}
        disabled={isFinished}
        autoCorrect="off"
        autoCapitalize="off"
      />

      {isFinished && (
        <div className="space-y-2 text-center">
          <p className="text-xl">🎉 Time's Up!</p>
          <p>Final WPM: {wpm}</p>
          <p>Total Mistakes: {mistakes}</p>
          <Button
            onClick={restartGame}
            className=" bg-blue-500 hover:bg-blue-600"
          >
            Play Again
          </Button>
        </div>
      )}
    </main>
  );
}
