'use server'

import { numdleGames } from "@/db/schema";
import { db } from "@/db/index"
import { auth } from "@/auth";

/**
 * generate a new game record on db with random ans
 * 
 * @returns game id
 */
export default async function generateNewGame(): Promise<number> {
    const session = await auth();
    if (session === null || session.user === undefined  || session.user.id === undefined) {
        throw Error("Authentication Error");
    }

    let ansStr = ""
    for (let i = 0; i < 4; i++) {
        ansStr += Math.floor(Math.random() * 10);
    }

    const result = await db.insert(numdleGames).values({
        userId: session.user.id,
        answer: ansStr,
    }).returning({gameId: numdleGames.gameId})
    return result[0].gameId;
}