// Functions related to fetching list of games
// Created by Berk Tellioglu

"use server";

import { db } from "@/db/index";
import { games } from "@/db/schema";

// fetches the list of games from the database.
export async function getGameList() {
  const result = await db.select().from(games);
  if (!result) throw new Error("No games found in database");
  return result;
}
