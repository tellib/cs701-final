'use server'

import { numdleLogs } from "@/db/schema";
import { db } from "@/db/index"
import { eq } from 'drizzle-orm';

export default async function getLogs(gameId: number) {
    return await db.select().from(numdleLogs).where(eq(numdleLogs.gameId, gameId));
}