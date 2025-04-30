'use server'

import { db } from "@/db";
import { numdleGames } from "@/db/schema";
import { eq } from 'drizzle-orm';

/**
 * A function that remove the numdle game from the database.
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @param id number | undefined (numdle game id)
 * @returns
 */
export default async function removeGame(id: number | undefined) {
    // return if game dne
    if (id === undefined) {
        return;
    }

    const data = await db.select().from(numdleGames).where(eq(numdleGames.id, id));
    // return if game dne
    if (data.length === 0) {
        return;
    }

    // remove the game from db if not finished
    if (!data[0].finished) {
        await db.delete(numdleGames).where(eq(numdleGames.id, id));
    }
}