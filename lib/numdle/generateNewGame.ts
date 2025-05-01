'use server'

import { games, numdleGames } from "@/db/schema";
import { db } from "@/db/index"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

/**
 * A function that generate a new numdle game in db with random answer.
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @returns number (the new numdle game's id)
 */
export default async function generateNewGame(): Promise<number> {
    const data = await db.select({id: games.gameId}).from(games).where(eq(games.name, 'Numdle'));
    const GAME_ID = data[0].id;
    
    // redirect user if not logged in
    const session = await auth();
    if (session === null || session.user === undefined  || session.user.id === undefined) {
        redirect('/auth');
    }

    // generate random answer
    let ansStr = ""
    for (let i = 0; i < 4; i++) {
        ansStr += Math.floor(Math.random() * 10);
    }

    // set the game with the state to db
    const result = await db.insert(numdleGames).values({
        gameId: GAME_ID,
        userId: session.user.id,
        answer: ansStr,
    }).returning({id: numdleGames.id})
    return result[0].id;
}