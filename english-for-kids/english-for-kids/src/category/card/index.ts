import { StateType, WordType } from '../../common/types';
import arrowsImg from '../../assets/icons/arrows.svg';
import './style.scss';
import { AUDIO_CORRECT, AUDIO_ERROR, MODE_TRAIN } from '../../../constants';
import playAudio from '../../common/player';

export default function getCardHtml(word: WordType, mode: string): string {
  if (mode === MODE_TRAIN) {
    return `
      <div class="card_category" data-word="${word.english}">
        <div class="front_category">
          <div class="pic pic-front">
              <img src="${word.imageSrc}" alt="">
          </div>
          <p class="word">${word.russian}</p>
        </div>

        <div class="back_category">
          <div class="pic pic-back">
              <img src="${word.imageSrc}" alt="">
          </div>
          <p class="word">${word.english}</p>
          <div class="rotation-btn">
            <img src="${arrowsImg}" alt="">
          </div>
        </div>
        <audio src="${word.audioSrc}"></audio>
      </div>
  `;
  }
  return `
    <div class="card_category" data-word="${word.english}">
      <div class="back_category">
        <div class="pic pic-back pic-play">
          <img src="${word.imageSrc}" alt="">
        </div>
      </div>
    </div>
  `;
}

export function isWordRight(state: StateType): boolean {
  const { log } = state.round;
  const isRight = log.length > 0 && log[log.length - 1].right;
  return isRight;
}

export function playMarkAudio(isRight: boolean): void {
  if (isRight) {
    playAudio(AUDIO_CORRECT);
  } else {
    playAudio(AUDIO_ERROR);
  }
}

export function disableCard(word: string): void {
  const card = document.querySelector(`.card_category[data-word='${word}']`);
  card.classList.add('done');
}
