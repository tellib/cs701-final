'use server'

import { db } from "@/db";
import { numdleGames } from "@/db/schema";
import { eq } from 'drizzle-orm';

/**
 * remove game if not finished
 */
export default async function removeGame(id: number | undefined) {
    if (id === undefined) {
        return;
    }

    const data = await db.select().from(numdleGames).where(eq(numdleGames.id, id));
    if (data.length === 0) {
        return;
    }

    if (!data[0].finished) {
        await db.delete(numdleGames).where(eq(numdleGames.id, id));
    }
}