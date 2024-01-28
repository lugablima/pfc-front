export default function toCamelCase(input: string): string {
  // Remove espaços em branco e divide a string em palavras
  const words = input.split(/\s+/);

  // Converte a primeira letra de cada palavra para maiúscula, exceto a primeira palavra
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Junta as palavras para formar a string CamelCase
  const camelCaseString = camelCaseWords.join("");

  return camelCaseString;
}
