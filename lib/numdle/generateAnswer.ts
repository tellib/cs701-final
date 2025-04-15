'use server'

export default async function generateAnswer(): Promise<number[]> {
    const result: number[] = [];
    for (let _ = 0; _ < 4; _++) {
        result.push(Math.floor(Math.random() * 10));
    }
    return result;
}