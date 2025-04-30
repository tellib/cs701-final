// Created by Berk Tellioglu

"use client";

import { useState, useEffect } from "react";
import {
  generateQuestion,
  checkAnswer,
  type Question,
} from "@/lib/math-quiz/actions";
import { Input, Button, Card } from "@mui/joy";

export default function MathQuiz() {
  const [gameStart, setGameStart] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // on game start, load a question
  useEffect(() => {
    if (gameStart) loadQuestion();
  }, [gameStart]);

  useEffect(() => {
    // if the game is over, stop the timer and send data to db
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    // otherwise, set the timer to count down every second
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // function that loads a new question, then sets the question's state and user input to empty
  const loadQuestion = async () => {
    const newQuestion = await generateQuestion();
    setQuestion(newQuestion);
    setUserAnswer("");
  };

  // handle answer submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || gameOver) return;

    const isCorrect = await checkAnswer(question, parseInt(userAnswer));
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setQuestionsAnswered((prev) => prev + 1);
    loadQuestion();
  };

  // calculate accuracy
  const accuracy =
    questionsAnswered > 0
      ? ((score / questionsAnswered) * 100).toFixed(1)
      : "100";

  // function to restart the game
  const restartGame = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setTimeLeft(60);
    setGameOver(false);
    loadQuestion();
  };

  // if the game is not started, show the start screen
  if (!gameStart) {
    return (
      <main className="flex flex-col p-8 space-y-6">
        <h1 className="text-4xl font-bold">Math Quiz Game</h1>
        <p>Answer as many questions as you can within 1 minute.</p>
        <Button onClick={() => setGameStart(true)}>Start Game</Button>
      </main>
    );
  }

  // game screen
  return (
    <main className="flex flex-col p-8 space-y-6">
      <h1 className="text-2xl font-bold">Math Quiz</h1>

      <Card>
        <span className="font-bold text-center text-2xl">
          {gameOver
            ? "Game Over!"
            : question
            ? `${question.num1} ${question.operator} ${question.num2} = ?`
            : "Loading..."}
        </span>
      </Card>

      <pre>Time Left: {timeLeft} seconds</pre>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col items-center"
      >
        <Input
          type="number"
          className="bg-white"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your Answer"
          required
          autoFocus
          disabled={gameOver}
        />
        <Button type="submit" disabled={gameOver}>
          Submit
        </Button>
      </form>

      <div>
        <p>Score: {score}</p>
        <p>Questions Answered: {questionsAnswered}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>

      {gameOver && <Button onClick={restartGame}>Restart Game</Button>}
    </main>
  );
}
