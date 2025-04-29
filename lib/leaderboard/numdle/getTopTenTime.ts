'use server'

import { db } from "@/db";
import { numdleGames, users } from "@/db/schema";
import { numdleLeaderBoardData } from "@/type";
import { eq, } from "drizzle-orm";

/**
 * A function that get the top ten user ranking by clear time for numdle game.
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @returns numdleLeaderBoardData [ ]
 */
export default async function getTopTenTime(): Promise<numdleLeaderBoardData[]> {
    const data = await db.select({
            userName: users.name,
            attempts: numdleGames.attempts,
            clearTime: numdleGames.clearTime
        }).from(
            numdleGames
        ).orderBy(
            numdleGames.clearTime
        ).where(
            eq(numdleGames.finished, true)
        ).limit(
            10
        ).leftJoin(
            users, eq(numdleGames.userId, users.id)
        );

    if (data.length === 0) {
        return [];
    }
    return data;
}