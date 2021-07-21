import { WordType } from './types';

export default function generateRandomWord(
  excludedWords: string[],
  words: WordType[],
): WordType {
  const wordForRandom = words.filter(
    (word) => !excludedWords.includes(word.english),
  );
  const randomWord =
    wordForRandom[Math.floor(Math.random() * wordForRandom.length)];
  return randomWord;
}
