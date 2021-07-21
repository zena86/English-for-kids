import { asideRender, asideBind } from '../category/aside';
import getCardHtml from '../category/card';
import '../category/style.scss';
import { getStatistic } from '../common/statisticStore';
import { WordType } from '../common/types';
import getWordByEnglish from '../common/wordInfo';

export function getDifficultWords(): WordType[] {
  const statisticWords = getStatistic();
  const wordsForRepeat = statisticWords.filter(
    (word) => word.attempts - word.rightNum > 0,
  );

  return wordsForRepeat
    .map((statisticWord) => getWordByEnglish(statisticWord.engWord))
    .slice(-9);
}

export function wordCardsRender(words: WordType[], mode: string): void {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = words.reduce(
    (acc: string, word: WordType) => `${getCardHtml(word, mode)} ${acc}`,
    '',
  );
  asideRender(mode);
  asideBind(mode);
}

export default function difficultWordsRender(mode: string): void {
  const words = getDifficultWords();
  wordCardsRender(words, mode);
}
