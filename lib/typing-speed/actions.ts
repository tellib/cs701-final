// Server functions related to Typing Speed Game
// Created by Berk Tellioglu

"use server";

import { faker } from "@faker-js/faker";

export async function generateWords(): Promise<string> {
  const words = Array.from({ length: 150 }, () => faker.word.words(1));
  return words.join(" ");
}

export async function calculateWPM(
  userInput: string,
  timeElapsedSeconds: number
): Promise<number> {
  const wordsTyped = userInput.trim().split(/\s+/).length;
  const minutes = timeElapsedSeconds / 60;
  return Math.round(wordsTyped / minutes);
}

export async function countMistakes(
  reference: string,
  userInput: string
): Promise<number> {
  let mistakes = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== reference[i]) {
      mistakes++;
    }
  }
  return mistakes;
}
