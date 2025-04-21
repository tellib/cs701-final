'use server'

import { numdleGames, numdleLogs } from "@/db/schema";
import { db } from "@/db/index"
import { eq } from 'drizzle-orm';

export default async function checkAnswer(guess: number[], gameId: number): Promise<boolean> {
    // invalid input
    if (guess.includes(NaN)) {
        return false;
    }
    
    // game do not exist
    const data = await db.select().from(numdleGames).where(eq(numdleGames.gameId, gameId));
    if (data.length === 0) {
        return false;
    }

    // game already finished
    const game = data[0];
    if (game.finished) {
        return false;
    }

    const answer = game.answer.split('').map((c) => parseInt(c));
    let perfect = 0;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] == guess[i]) {
            perfect += 1;
            answer[i] = -1;
        }
    }
    let imperfect = 0;
    for (let i = 0; i < answer.length; i++) {
        if (answer.includes(guess[i])) {
            imperfect += 1;
            answer[answer.indexOf(guess[i])] = -1;
        }
    }

    // update log
    await db.insert(numdleLogs).values({
        guess: guess.join(''),
        perfect: perfect,
        imperfect: imperfect,
        gameId: game.gameId
    });
    
    const finished = (perfect === answer.length);
    
    await db.update(numdleGames).set({
        attemps: game.attemps + 1,
        finished: finished,
    }).where(eq(numdleGames.gameId, game.gameId));

    return finished;
}