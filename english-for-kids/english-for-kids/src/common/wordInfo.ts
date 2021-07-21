import { categories } from './categories';
import { WordType } from './types';

export default function getWordByEnglish(english: string): WordType {
  for (let i = 0; i < categories().length; i += 1) {
    const category = categories()[i];
    for (let j = 0; j < category.words.length; j += 1) {
      const word = category.words[j];
      if (word.english === english) return word;
    }
  }
  return null;
}
