'use server'

import { db } from "@/db"
import { users } from "@/db/schema"
import { userInfo } from "@/type";
import { like } from 'drizzle-orm'

export default async function getUserByName(name: string):Promise<userInfo[]> {
    const data = await db.select().from(users).where(like(users.name, "%"+name+"%"));

    return data;
}