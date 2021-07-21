import { Dispatch } from 'redux';
import {
  ACTION_ATTEMPT,
  ACTION_CLOSE_MENU,
  ACTION_GAME_PREPARE,
  ACTION_LOGIN_FAILURE,
  ACTION_LOGIN_REQUEST,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGOUT,
  ACTION_SPELL,
  ACTION_STATISTIC_SORT,
  ACTION_TOGLE_MENU,
  PAGES_EDIT_CATEGORIES,
} from '../../constants';
import { login } from '../common/serverServise';
import { store } from './store';

export function dispatchActionToggleMenu(): void {
  store().dispatch({
    type: ACTION_TOGLE_MENU,
  });
}

export function dispatchActionCloseMenu(): void {
  store().dispatch({
    type: ACTION_CLOSE_MENU,
  });
}

export function dispatchActionSpell(): void {
  store().dispatch({
    type: ACTION_SPELL,
  });
}

export function dispatchActionAttempt(curWord: string): void {
  store().dispatch({
    type: ACTION_ATTEMPT,
    payload: curWord,
  });
}

export function dispatchActionStatisticSort(columnName: string): void {
  store().dispatch({
    type: ACTION_STATISTIC_SORT,
    payload: columnName,
  });
}

export function dispatchActionGamePrepare(): void {
  store().dispatch({
    type: ACTION_GAME_PREPARE,
  });
}

function goToEditCategories() {
  document.location.hash = `/${PAGES_EDIT_CATEGORIES}`;
}

export function dispatchActionLogout(): void {
  store().dispatch({
    type: ACTION_LOGOUT,
  });
}

export function dispatchLogin(log: string, pass: string): void {
  store().dispatch<any>(async (dispatch: Dispatch) => {
    dispatch({ type: ACTION_LOGIN_REQUEST });
    const accessToken = await login(log, pass);

    if (accessToken) {
      dispatch({ type: ACTION_LOGIN_SUCCESS, payload: accessToken });
      goToEditCategories();
    } else {
      dispatch({ type: ACTION_LOGIN_FAILURE });
    }
  });
}
