'use server'

import { userGameRecord } from "@/type";
import getNumdleRecord from "./games/getNumdleRecord";

export default async function getUserRecords(uid: string): Promise<userGameRecord> {
    const numdleRecord = await getNumdleRecord(uid);
    
    return {
        numdleRecord: numdleRecord
    }
}