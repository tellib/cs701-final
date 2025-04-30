// Page with a list of all games
// Created by Berk Tellioglu

import GamesList from "@/components/games/GamesList";
import Loading from "@/components/ui/Loading";
import PageHeader from "@/components/ui/PageHeader";
import { Suspense } from "react";

export default function GamesPage() {
  return (
    <main className="flex flex-col gap-4">
      <PageHeader>Games</PageHeader>
      <Suspense fallback={<Loading />}>
        <GamesList />
      </Suspense>
    </main>
  );
}
