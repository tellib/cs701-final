'use server'

import { numdleGames, numdleLogs } from "@/db/schema";
import { db } from "@/db/index"
import { eq } from 'drizzle-orm';

/**
 * A function that check the answer for numdle game, the result will be write to the log.
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 * 
 * @param guess number [ ]
 * @param id number (numdle game id)
 * @returns boolean (return true if answer is correct)
 */
export default async function checkAnswer(guess: number[], id: number): Promise<boolean> {
    // invalid input
    if (guess.includes(NaN)) {
        return false;
    }
    
    // game do not exist
    const data = await db.select().from(numdleGames).where(eq(numdleGames.id, id));
    if (data.length === 0) {
        return false;
    }

    // game already finished
    const game = data[0];
    if (game.finished) {
        return false;
    }

    const answer = game.answer.split('').map((c) => parseInt(c));
    const _guess = [...guess];
    let perfect = 0;
    for (let i = 0; i < _guess.length; i++) {
        if (answer[i] == _guess[i]) {
            perfect += 1;
            answer[i] = -1;
            _guess[i] = -1;
        }
    }
    let imperfect = 0;
    for (let i = 0; i < _guess.length; i++) {
        if (_guess[i] !== -1 && answer.includes(_guess[i])) {
            imperfect += 1;
        }
    }

    // update log
    await db.insert(numdleLogs).values({
        guess: guess.join(''),
        perfect: perfect,
        imperfect: imperfect,
        gameId: game.id
    });
    
    const finished = (perfect === answer.length);
    
    await db.update(numdleGames).set({
        attempts: game.attempts + 1,
        finished: finished,
        endTime: (finished ? new Date() : undefined),
        clearTime: (finished ? new Date(Date.now() - data[0].startTime.getTime()) : undefined),
    }).where(eq(numdleGames.id, game.id));

    return finished;
}