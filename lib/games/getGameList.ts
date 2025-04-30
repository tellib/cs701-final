// actions/games/actions.ts
// Created by Berk Tellioglu

"use server";

import { db } from "@/db/index";
import { games } from "@/db/schema";

// const timeout = (ms: number) => new Promise(res => setTimeout(res, ms));

// fetches the list of games from the database.
export async function getGameList() {
  const result = await db.select().from(games);
  if (!result) throw new Error("No games found in database");
  // await timeout(1000); // Simulate a delay
  return result;
}
