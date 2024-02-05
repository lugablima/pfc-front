/* eslint-disable no-param-reassign */

import { ITest } from "../services/classService";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function generateCTests(
  code: string,
  tests: ITest[],
  exName: string,
): string {
  let cCode = code;
  cCode += "\n\n";

  cCode += `int main() {\n`;
  tests.forEach((test, index) => {
    // const arrayDeclaration = `${test.inputDataType} numeros${
    //   index + 1
    // }[] = {${test.inputs.join(", ")}};`;
    const varDeclaration = generateVariableDeclaration(
      test.inputDataType.split(" ")[0],
      `var${index + 1}`,
      test.inputs,
      test.inputDataType.split(" ")[1],
    );
    const expectedResult = test.result;
    const testFunction = `
            printf("Teste ${index + 1}: ");
            ${generateResultDeclaration(
              test.resultDataType.split(" ")[0],
              index + 1,
              exName,
              test.resultDataType.split(" ")[1],
              test.inputDataType.split(" ")[1],
            )}
            ${compareExpectedResultAndResult(
              test.resultDataType.split(" ")[0],
              index + 1,
              expectedResult,
              test.resultDataType.split(" ")[1],
            )}
        `;

    cCode += `${varDeclaration}\n${testFunction}\n\n`;
  });

  cCode += `    return 0;\n}\n`;

  return cCode;
}

// interface VariableDeclaration {
//   primitiveType: string;
//   type: string;
//   name: string;
//   value?: any;
// }

// const primitiveDataTypes = {
//   integer: "int",
//   character: "char",
//   "floating point": "float",
//   "double floating point": "double",
//   boolean: "bool",
// };

export function generateVariableDeclaration(
  inputPrimitiveDataType: string,
  varName: string,
  varValue: any,
  inputDataType?: string,
): string {
  if (!inputDataType) {
    return `${inputPrimitiveDataType} ${varName} = ${varValue};`;
  }

  if (inputDataType === "array") {
    return `${inputPrimitiveDataType} ${varName}[] = {${varValue.join(", ")}};`;
  }

  if (inputDataType === "pointer") {
    return `${inputPrimitiveDataType} *${varName} = NULL;`;
  }
  return `// Tipo de dado não reconhecido: ${inputDataType}`;

  // switch (declaration.type) {
  //   case "integer":
  //   case "character":
  //   case "floating point":
  //   case "double floating point":
  //   case "boolean":
  //     return `${declaration.primitiveType} ${declaration.name} = ${
  //       declaration.value || 0
  //     };`;
  //   case "pointer":
  //     return `${declaration.primitiveType} *${declaration.name} = NULL;`;
  //   case "array":
  //     return `${declaration.primitiveType} ${
  //       declaration.name
  //     }[] = {${declaration.value.join(", ")}};`;
  //   default:
  //     return `// Tipo de dado não reconhecido: ${declaration.type}`;
  // }
}

export function generateResultDeclaration(
  resultPrimitiveDataType: string,
  resultIdx: number,
  exName: string,
  resultDataType?: string,
  inputDataType?: string,
) {
  if (inputDataType === "array") {
    return `
    size_t len${resultIdx} = sizeof(var${resultIdx}) / sizeof(var${resultIdx}[0]);
    ${resultPrimitiveDataType} resultado${resultIdx} = ${exName}(var${resultIdx}, len${resultIdx});`;
  }

  if (!resultDataType) {
    return `${resultPrimitiveDataType} resultado${resultIdx} = ${exName}(var${resultIdx});`;
  }

  if (resultDataType === "array") {
    return `${resultPrimitiveDataType} resultado${resultIdx}[] = ${exName}(var${resultIdx});`;
  }
  if (resultDataType === "pointer") {
    return `${resultPrimitiveDataType} *resultado${resultIdx} = ${exName}(var${resultIdx});`;
  }
  return `// Tipo de dado não reconhecido: ${resultDataType}`;
}

export function compareExpectedResultAndResult(
  resultPrimitiveDataType: string,
  resultIdx: number,
  expectedResult: any,
  resultDataType?: string,
) {
  if (resultPrimitiveDataType === "float") {
    expectedResult = parseFloat(expectedResult).toFixed(6);
  }

  if (!resultDataType) {
    return `
      if (resultado${resultIdx} == ${expectedResult}) {
        printf("[PASSOU]. Esperava: ${expectedResult}. Retornou: %${getConversionForPrintf(
          resultPrimitiveDataType,
        )}\\n", resultado${resultIdx});
      } else {
        printf("[FALHOU]. Esperava: ${expectedResult}. Retornou: %${getConversionForPrintf(
          resultPrimitiveDataType,
        )}\\n", resultado${resultIdx});
      }`;
  }

  if (resultDataType === "array") {
    return `
            int i;
            size_t tam = sizeof(${expectedResult}) / sizeof(${expectedResult[0]});
            for(i=0; i < tam; i++) {
              if (resultado${resultIdx}[i] != ${expectedResult}[i]) {
                printf("[FALHOU]. Esperava: ${expectedResult}. Retornou: %d\\n", resultado${resultIdx});
                break;
              }
            }

            printf("[PASSOU]. Esperava: ${expectedResult}. Retornou: %d\\n", resultado${resultIdx});`;
  }
  if (resultDataType === "pointer") {
    return `
      if (*resultado${resultIdx} == ${expectedResult}) {
        printf("[PASSOU]. Esperava: ${expectedResult}. Retornou: %${getConversionForPrintf(
          resultPrimitiveDataType,
        )}\\n", *resultado${resultIdx});
      } else {
        printf("[FALHOU]. Esperava: ${expectedResult}. Retornou: %${getConversionForPrintf(
          resultPrimitiveDataType,
        )}\\n", *resultado${resultIdx});
      }`;
  }
  return `// Tipo de dado não reconhecido: ${resultPrimitiveDataType}`;

  // switch (resultPrimitiveDataType) {
  //   case "int":
  //   case "char":
  //   case "float":
  //   case "double":
  //   case "bool":
  //     return `if (resultado${resultIdx} == ${expectedResult}) {
  //               printf("[PASSOU]. Esperava: ${expectedResult}. Retornou: %d\\n", resultado${resultIdx});
  //             } else {
  //               printf("[FALHOU]. Esperava: ${expectedResult}. Retornou: %d\\n", resultado${resultIdx});
  //             }`;
  //   case "pointer":
  //     return `if (*resultado${resultIdx} == ${expectedResult}) {
  //               printf("[PASSOU]. Esperava: ${expectedResult}. Retornou: %d\\n", *resultado${resultIdx});
  //             } else {
  //               printf("[FALHOU]. Esperava: ${expectedResult}. Retornou: %d\\n", *resultado${resultIdx});
  //             }`;
  //   case "array":
  //     return `
  //             int i;
  //             int tam = sizeof(${expectedResult}) / sizeof(${expectedResult[0]});
  //             for(i=0; i < tam; i++) {
  //               if (resultado${resultIdx}[i] != ${expectedResult}[i]) {
  //                 printf("[FALHOU]. Esperava: ${expectedResult}. Retornou: %d\\n", resultado${resultIdx});
  //                 break;
  //               }
  //             }

  //             printf("[PASSOU]. Esperava: ${expectedResult}. Retornou: %d\\n", resultado${resultIdx});`;
  //   default:
  //     return `// Tipo de dado não reconhecido: ${resultPrimitiveDataType}`;
  // }
}

function getConversionForPrintf(dataType: string, decimalPoints?: number) {
  switch (dataType) {
    case "int":
      return "d";
    case "float":
      return decimalPoints ? `.${decimalPoints}f` : "f";
    case "double":
      return decimalPoints ? `.${decimalPoints}f` : "f";
    case "_Bool":
      return "d";
    case "char":
      return "c";
    case "array":
      return "d";
    case "pointer":
      return "d";
    default:
      return "d";
  }
}
