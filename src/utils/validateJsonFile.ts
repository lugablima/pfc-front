/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
interface Test {
  inputs: string[];
  result: string[];
}

interface Exercise {
  name: string;
  statement: string;
  tests: Test[];
}

interface JSONStructure {
  exercises: Exercise[];
}

const validateJSONStructure = (jsonData: any): jsonData is JSONStructure => {
  if (!jsonData || !jsonData.exercises || !Array.isArray(jsonData.exercises)) {
    return false;
  }

  for (const exercise of jsonData.exercises) {
    if (
      !exercise ||
      typeof exercise.name !== "string" ||
      typeof exercise.statement !== "string" ||
      !exercise.tests ||
      !Array.isArray(exercise.tests) ||
      exercise.tests.length === 0
    ) {
      return false;
    }

    for (const test of exercise.tests) {
      if (
        !test ||
        test.inputs === undefined ||
        test.result === undefined ||
        !test.inputDataType ||
        !test.resultDataType
      ) {
        return false;
      }
    }
  }

  return true;
};

// const validateJSONStructure = (jsonData: any): jsonData is JSONStructure => {
//   if (!jsonData || !jsonData.exercises || !Array.isArray(jsonData.exercises)) {
//     return false;
//   }

//   for (const exercise of jsonData.exercises) {
//     if (
//       !exercise ||
//       typeof exercise.name !== "string" ||
//       typeof exercise.statement !== "string" ||
//       !exercise.tests ||
//       !Array.isArray(exercise.tests) ||
//       exercise.tests.some(
//         (test: any) =>
//           !test ||
//           !test.inputs ||
//           !Array.isArray(test.inputs) ||
//           test.inputs.some((input: any) => typeof input !== "string") ||
//           typeof test.result !== "string",
//       )
//     ) {
//       return false;
//     }
//   }

//   return true;
// };

export default validateJSONStructure;
