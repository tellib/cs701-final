"use client";

import { useState, useEffect, Suspense } from "react";
import {
  generateWords,
  calculateWPM,
  countMistakes,
} from "@/lib/typing-speed/actions";
import { Input, Button } from "@mui/joy";
import Loading from "@/components/ui/Loading";

export default function TypingSpeedGame() {
  const [gameStart, setGameStart] = useState(false);
  const [words, setWords] = useState<string>("");

  const [userInput, setUserInput] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60); // 1 min
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [wpm, setWPM] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);

  // when the game starts, load the sentence (words)
  useEffect(() => {
    restartGame();
  }, [gameStart]);

  useEffect(() => {
    if (isFinished) return;

    if (timeLeft <= 0) {
      finishGame();
      return;
    }

    // if the game is not finished, set the timer to count down every second
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // clear the timer when the component unmounts or when the timeLeft changes
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  // update the stats (WPM and mistakes) every time the user input changes
  useEffect(() => {
    if (!isFinished) {
      updateStats();
    }
  }, [userInput]);

  // function that loads a new sentence (words), then sets the sentence's state and user input to empty
  const loadWords = async () => {
    const sentence = await generateWords();
    setWords(sentence);
  };

  // function that calculates the WPM and mistakes
  const updateStats = async () => {
    const elapsed = 60 - timeLeft;
    if (elapsed <= 0) return;

    const wpmResult = await calculateWPM(userInput, elapsed);
    const mistakesResult = await countMistakes(words, userInput);

    setWPM(wpmResult);
    setMistakes(mistakesResult);
  };

  // handle user input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // function on game finish
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
    await loadWords();
  };

  // if the game is not started, show the start screen
  if (!gameStart) {
    return <Button onClick={() => setGameStart(true)}>Start Game</Button>;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="border-1 p-4 bg-white rounded-xl text-left text-sm md:text-lg select-none cursor-default leading-relaxed break-words whitespace-pre-wrap">
          {words.split("").map((char, i) => {
            let background = "";
            if (i < userInput.length) {
              // if the character is matches the text, set the background to yellow, otherwise red
              background =
                userInput[i] === char ? "bg-yellow-300" : "bg-red-300";
            }

            return (
              <span key={i} className={`${background}`}>
                {char}
              </span>
            );
          })}
        </div>
      </Suspense>

      <div className="flex flex-col md:flex-row gap-2 justify-between text-lg">
        <pre>
          Time Left: <span className="font-bold">{timeLeft}s</span>
        </pre>
        <pre className="text-blue-900">
          Words Per Minute (WPM): <span className="font-bold">{wpm}</span>
        </pre>
        <pre className="text-red-900">
          Mistakes: <span className="font-bold">{mistakes}</span>
        </pre>
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
        autoComplete="off"
        spellCheck="false"
      />

      {isFinished && (
        <div className="space-y-2 text-center">
          <p className="text-xl">Game Over</p>
          <Button onClick={restartGame}>Play Again</Button>
        </div>
      )}
    </>
  );
}
