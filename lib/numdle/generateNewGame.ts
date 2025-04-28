'use server'

import { numdleGames } from "@/db/schema";
import { db } from "@/db/index"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * generate a new game record on db with random ans
 * 
 * @returns game id
 */
export default async function generateNewGame(): Promise<number> {
    {/* FIXME: get Game ID from db or enum */}
    const GAME_ID = 1;
        
    const session = await auth();
    if (session === null || session.user === undefined  || session.user.id === undefined) {
        redirect('/login');
    }

    let ansStr = ""
    for (let i = 0; i < 4; i++) {
        ansStr += Math.floor(Math.random() * 10);
    }

    const result = await db.insert(numdleGames).values({
        gameId: GAME_ID,
        userId: session.user.id,
        answer: ansStr,
    }).returning({id: numdleGames.id})
    return result[0].id;
}