import { Store } from 'redux';
import {
  PAGES_DIFFICALT_WORDS,
  AUDIO_FAILURE,
  AUDIO_SUCCESS,
  IMAGE_FAILURE,
  IMAGE_SUCCESS,
} from '../../constants';
import { categoryCardsBind, goToMainPage } from '../category';
import { addStars } from '../category/aside';
import { disableCard, isWordRight, playMarkAudio } from '../category/card';
import getPopupHtml from '../category/popup';
import { getDifficultWords, wordCardsRender } from '../difficultWords';
import { updateStatistic } from '../statistic';
import { categories } from './categories';
import getPage from './pageInfo';
import playAudio from './player';
import { AttemptType, CombinedType, StateType, WordType } from './types';

export function finishGame(state: StateType): void {
  const boardEl = document.getElementById('board');
  const { log } = state.round;
  const errorAnswer = log.filter((attempt) => !attempt.right);
  if (errorAnswer.length === 0) {
    playAudio(AUDIO_SUCCESS);
    boardEl.innerHTML = getPopupHtml('Win!', `${IMAGE_SUCCESS}`);
  } else {
    playAudio(AUDIO_FAILURE);
    boardEl.innerHTML = getPopupHtml(
      `Oops! ${errorAnswer.length} errors`,
      `${IMAGE_FAILURE}`,
    );
  }
}

export function preparePlayBtn(): void {
  const btnText = document.querySelector('.btn-text');
  const btnIcon = document.querySelector('.btn-icon');
  btnText?.classList.add('hidden');
  btnIcon?.classList.remove('hidden');
}

export default function gameLogic(
  store: Store,
  previousState: CombinedType,
  words: WordType[],
): void {
  const state = store.getState();

  const {
    tumbler: { mode },
    game: {
      round: { spellCounter, curWord, log, cardsNum },
    },
  } = state;
  const {
    tumbler: prevTumbler,
    game: {
      round: {
        spellCounter: prevSpellCounter,
        curWord: prevCurWord,
        log: prevLog,
      },
    },
  } = previousState;

  const isSpellCounterIncremented = prevSpellCounter < spellCounter;
  const isWordChanged = prevCurWord !== curWord;
  const isModeChanged = prevTumbler.mode !== mode;
  const isLogChanged = prevLog.length !== log.length;
  if (isModeChanged) {
    wordCardsRender(words, mode);
    categoryCardsBind(store);
  }
  if (isLogChanged) {
    const isRight = isWordRight(state.game);
    if (log.length > 0) {
      updateStatistic(log);
      playMarkAudio(isRight);
      addStars(state.game);
    }
    if (isRight) disableCard(prevCurWord.english);
    const correctAnswers = log.reduce(
      (acc: number, answer: AttemptType) => +answer.right + acc,
      0,
    );
    if (correctAnswers === cardsNum && correctAnswers > 0) {
      finishGame(state.game);
      goToMainPage();
    }
  }
  if (isWordChanged || isSpellCounterIncremented) {
    preparePlayBtn();
    setTimeout(() => {
      playAudio(curWord.audioSrc);
    }, 500);
  }
}

export function getGameWords(): WordType[] {
  let words;
  if (getPage().page === PAGES_DIFFICALT_WORDS) {
    words = getDifficultWords();
  } else {
    const curCategory = getPage().subPage;
    words = categories().find(
      (category) => category.name === curCategory,
    ).words;
  }
  return words;
}
