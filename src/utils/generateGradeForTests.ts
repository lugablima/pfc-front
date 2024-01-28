/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITest } from "../services/classService";

export default function generateGradeForTesting(
  outputDetails: any,
  tests: ITest[],
) {
  const statusId = outputDetails?.status?.id;
  let result = 0;

  if (statusId === 3) {
    const occurrences = countOccurrences("PASSOU", atob(outputDetails.stdout));
    result = (occurrences / tests.length) * 100;
  }

  return result;
}

function countOccurrences(word: string, text: string): number {
  // Expressão regular para encontrar todas as ocorrências da word
  const regex = new RegExp(`\\b${word}\\b`, "gi");

  // Usando a expressão regular para encontrar as ocorrências
  const occurrences = text.match(regex);

  // Verificando o número de ocorrências
  const amount = occurrences ? occurrences.length : 0;

  return amount;
}
