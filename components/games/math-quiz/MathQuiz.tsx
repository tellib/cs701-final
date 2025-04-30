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
    restartGame();
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
    return <Button onClick={() => setGameStart(true)}>Start Game</Button>;
  }

  // game screen
  return (
    <>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <div className="flex-2/3 flex flex-col items-center gap-4">
          <Card>
            <span className="font-bold text-center text-xl">
              {gameOver
                ? "Game Over"
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
        </div>

        <div className="flex-1/3">
          <Card>
            <pre>
              Score: <span className="font-bold">{score}</span>
            </pre>
            <pre>
              Questions Answered:{" "}
              <span className="font-bold">{questionsAnswered}</span>
            </pre>
            <pre>
              Accuracy: <span className="font-bold">{accuracy}%</span>
            </pre>
          </Card>
        </div>
      </div>
      {gameOver && <Button onClick={restartGame}>Restart Game</Button>}
    </>
  );
}
