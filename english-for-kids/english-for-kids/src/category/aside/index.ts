import './style.scss';
import { MODE_PLAY, MODE_TRAIN } from '../../../constants';
import { getPlayBtnHtml, playBtnBind } from './playBtn';
import starSuccess from '../../assets/icons/starSuccess.svg';
import starFail from '../../assets/icons/starFail.svg';
import { StateType } from '../../common/types';

export function addAsideHtml(): string {
  return `
    <div class="stars">
      
    </div>
    <div class="play__btn">
      ${getPlayBtnHtml()}
    </div>
  `;
}

export function asideBind(mode: string): void {
  if (mode === MODE_PLAY) {
    playBtnBind();
  }
}

export function asideRender(mode: string): void {
  const asideEl = document.querySelector('.aside');
  if (mode === MODE_PLAY) {
    asideEl.innerHTML = addAsideHtml();
  } else if (mode === MODE_TRAIN) {
    asideEl.innerHTML = '';
  }
}

export function addStars(state: StateType): void {
  const stars = document.querySelector('.stars');
  const { log } = state.round;
  stars.innerHTML = log.slice(-9).reduce((acc, star) => {
    if (star.right)
      return `<img class="star" src="${starSuccess}" alt=""> ${acc}`;
    return `<img class="star" src="${starFail}" alt=""> ${acc}`;
  }, '');
}
