// Math Quiz Game
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
  // tracking if game has started and/or is over
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // the math problem displayed
  const [question, setQuestion] = useState<Question | null>(null);

  // the input will use this
  const [userAnswer, setUserAnswer] = useState("");

  // stats
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  // on game start, load a question
  useEffect(() => {
    restartGame();
  }, [gameStart]);

  // every time time left changes...
  useEffect(() => {
    // check if the game is over, stop the timer (and send data to db, which isn't implemented yet)
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    // otherwise, set the timer to count down every second
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // on unloading the component, cancel the Timeout object
    return () => clearInterval(timer);
  }, [timeLeft]);

  // async function that loads a new question, then sets the question's state and user input to empty
  const loadQuestion = async () => {
    const newQuestion = await generateQuestion();
    setQuestion(newQuestion);
    setUserAnswer("");
  };

  // handle answer submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || gameOver) return;

    // check if is correct on the server
    const isCorrect = await checkAnswer(question, parseInt(userAnswer));

    // update scores and load a new question
    if (isCorrect) setScore((prev) => prev + 1);
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

  // render game screen
  return (
    <>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <div className="flex-2/3 flex flex-col items-center gap-4">
          {/* display question, OR if game is over display Game Over  */}
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
