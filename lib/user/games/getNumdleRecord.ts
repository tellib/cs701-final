'use server'

import { db } from "@/db"
import { numdleGames } from "@/db/schema"
import { numdleRecord } from "@/type";
import { and, count, eq, min } from "drizzle-orm"

/**
 * A function that returns a user's numdle record from the db
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @param uid string
 * @returns numdleRecord
 */
export default async function getNumdleRecord(uid: string): Promise<numdleRecord> {
    const data = await db.select({
        gamePlayed: count(),
        bestAttempts: min(numdleGames.attempts),
        bestClearTime: min(numdleGames.clearTime)
    }).from(
        numdleGames
    ).where(
        and(
            eq(numdleGames.userId, uid),
            eq(numdleGames.finished, true)
        )
    );

    return data[0];
}