import './style.scss';
import { Store } from 'redux';
import { MODE_TRAIN } from '../../constants';
import { WordType, CategoryType } from '../common/types';
import playAudio from '../common/player';
import { dispatchActionAttempt } from '../redux/actions';
import getWordByEnglish from '../common/wordInfo';
import { categories } from '../common/categories';

export default function getCategoryWords(categoryName: string): WordType[] {
  const currCategory = categories().find(
    (cat: CategoryType) => cat.name === categoryName,
  );
  return currCategory.words;
}

export function categoryCardsBind(store: Store): void {
  const cardElArray = document.querySelectorAll('.card_category');
  cardElArray.forEach((cardEl: HTMLElement) => {
    cardEl.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('.rotation-btn')) {
        cardEl.classList.add('rotate');
      } else {
        const curWord = cardEl.dataset.word;
        const wordObj = getWordByEnglish(curWord);
        if (store.getState().tumbler.mode === MODE_TRAIN) {
          playAudio(wordObj.audioSrc);
        } else {
          dispatchActionAttempt(curWord);
        }
      }
    });
    cardEl.addEventListener('mouseleave', () => {
      cardEl.classList.remove('rotate');
    });
  });
}

export function goToMainPage(): void {
  setTimeout(() => {
    document.location.hash = '';
  }, 3000);
}
