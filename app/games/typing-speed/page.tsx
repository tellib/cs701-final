// Page for playing typing speed game
// Created by Berk Tellioglu

import TypingSpeed from "@/components/games/typing-speed/TypingSpeed";
import Loading from "@/components/ui/Loading";
import PageHeader from "@/components/ui/PageHeader";
import { Suspense } from "react";

export default function TypingSpeedPage() {
  return (
    <main className="flex flex-col space-y-6">
      <PageHeader>Typing Speed Game</PageHeader>
      <p>Type the given sentence as fast as you can until the time runs out.</p>
      <Suspense fallback={<Loading />}>
        <TypingSpeed />
      </Suspense>
    </main>
  );
}
