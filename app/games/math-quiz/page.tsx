// Page for playing math quiz game
// Created by Berk Tellioglu

import MathQuiz from "@/components/games/math-quiz/MathQuiz";
import Loading from "@/components/ui/Loading";
import PageHeader from "@/components/ui/PageHeader";
import { Suspense } from "react";

export default function MathQuizPage() {
  return (
    <main className="flex flex-col space-y-6">
      <PageHeader>Math Quiz Game</PageHeader>
      <p>Answer as many questions as you can within 1 minute.</p>
      <Suspense fallback={<Loading />}>
        <MathQuiz />
      </Suspense>
    </main>
  );
}
