"use server";

type Operator = "+" | "-" | "×";

export type Question = {
  num1: number;
  num2: number;
  operator: Operator;
};

export async function generateQuestion(): Promise<Question> {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators: Operator[] = ["+", "-", "×"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  return { num1, num2, operator };
}

export async function checkAnswer(
  question: Question,
  userAnswer: number
): Promise<boolean> {
  let correctAnswer: number;

  switch (question.operator) {
    case "+":
      correctAnswer = question.num1 + question.num2;
      break;
    case "-":
      correctAnswer = question.num1 - question.num2;
      break;
    case "×":
      correctAnswer = question.num1 * question.num2;
      break;
    default:
      throw new Error("Invalid operator");
  }

  return userAnswer === correctAnswer;
}
