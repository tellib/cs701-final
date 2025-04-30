import Leaderboard from "@/components/leaderboard/Leaderboard";
import Loading from "@/components/ui/Loading";
import PageHeader from "@/components/ui/PageHeader";
import { Suspense } from "react";

/**
 * A page for leaderboard
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @returns 
 */
export default function LeaderboardPage() {
  return (
    <main className="flex flex-col gap-4">
      <PageHeader>Leaderboard</PageHeader>
      <Suspense fallback={<Loading />}>
        <Leaderboard />
      </Suspense>
    </main>
  );
}
