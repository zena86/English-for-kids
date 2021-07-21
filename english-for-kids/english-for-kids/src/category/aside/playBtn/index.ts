import replayIconSrc from '../../../assets/icons/replay.svg';
import { dispatchActionSpell } from '../../../redux/actions';

export function getPlayBtnHtml(): string {
  return `
    <div>
      <span class="btn-text">Play</span>
      <img class="btn-icon hidden" src="${replayIconSrc}" alt="">
    </div>
  `;
}

export function playBtnBind(): void {
  const playBtnEl = document.querySelector('.play__btn');
  playBtnEl.addEventListener('click', () => {
    dispatchActionSpell();
  });
}
