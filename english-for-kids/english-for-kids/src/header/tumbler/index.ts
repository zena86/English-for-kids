import { Action } from 'redux';
import {
  MODE_TRAIN,
  ACTION_MODE_TO_PLAY,
  ACTION_MODE_TO_TRAIN,
} from '../../../constants';
import { store } from '../../redux/store';
import './style.scss';

export function toggleRender(): void {
  const switchEl = document.querySelector('.switch-box');
  switchEl.innerHTML = `
    <div class="on-off-toggle">
      <input class="on-off-toggle__input" type="checkbox" id="bopis" />
      <label for="bopis" class="on-off-toggle__slider"></label>
    </div>
  `;
}

export function getActionMode(isTraimMode: boolean): Action {
  const actionType = isTraimMode ? ACTION_MODE_TO_PLAY : ACTION_MODE_TO_TRAIN;
  return { type: actionType };
}

export function tumblerBind(): void {
  const tumblerEl = document.querySelector('.on-off-toggle');
  tumblerEl.addEventListener('change', () => {
    const isTrainMode = store().getState().tumbler.mode === MODE_TRAIN;
    store().dispatch(getActionMode(isTrainMode));
  });
}
