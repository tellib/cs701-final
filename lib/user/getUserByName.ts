'use server'

import { db } from "@/db"
import { users } from "@/db/schema"
import { userInfo } from "@/type";
import { like } from 'drizzle-orm'

/**
 * A function that returns users that has username match the search pattern
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @param name string
 * @returns userInfo[ ]
 */
export default async function getUserByName(name: string):Promise<userInfo[]> {
    const data = await db.select().from(users).where(like(users.name, "%"+name+"%"));

    return data;
}