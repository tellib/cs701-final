'use server'

import { userGameRecord } from "@/type";
import getNumdleRecord from "./games/getNumdleRecord";

/**
 * A function that returns a user's game records from the db
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @param uid string
 * @returns userGameRecord
 */
export default async function getUserRecords(uid: string): Promise<userGameRecord> {
    // get record from different games
    const numdleRecord = await getNumdleRecord(uid);
    
    // the type of userGameRecord should also be updated to include more records from different games
    return {
        numdleRecord: numdleRecord
    }
}