export type numdleLog = {
    guess: string,
    perfect: number,
    imperfect: number
}

export type numdleLeaderBoardData = {
    userName: string | null,
    clearTime: Date | null,
    attempts: number,
}

export type userInfo = {
    id: string,
    name: string | null,
    image: string | null
}

export type userGameRecord = {
    numdleRecord: numdleRecord
}

export type numdleRecord = {
    gamePlayed: number,
    bestAttempts: number | null,
    bestClearTime: Date | null
}