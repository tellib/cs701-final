'use server'

import { numdleLogs } from "@/db/schema";
import { db } from "@/db/index"
import { eq } from 'drizzle-orm';

/**
 * A function that return the logs of a spesiic numdle game.
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @param gameId number (the numdle game id)
 * @returns numdleLogs [ ]
 */
export default async function getLogs(gameId: number) {
    return await db.select().from(numdleLogs).where(eq(numdleLogs.gameId, gameId));
}