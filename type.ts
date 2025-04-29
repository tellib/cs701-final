/**
 * A type for the log of numdle game
 */
export type numdleLog = {
    guess: string,
    perfect: number,
    imperfect: number
}

/**
 * A type for numdle game display data on the leaderboard
 */
export type numdleLeaderBoardData = {
    userName: string | null,
    clearTime: Date | null,
    attempts: number,
}

/**
 * A type for user's information
 */
export type userInfo = {
    id: string,
    name: string | null,
    image: string | null
}

/**
 * A type for user's game records. Should be updated to add new game.
 */
export type userGameRecord = {
    numdleRecord: numdleRecord
}

/**
 * A type for numdle game record.
 */
export type numdleRecord = {
    gamePlayed: number,
    bestAttempts: number | null,
    bestClearTime: Date | null
}