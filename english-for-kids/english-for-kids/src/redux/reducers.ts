import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  ACTION_ATTEMPT,
  ACTION_CLOSE_MENU,
  ACTION_GAME_PREPARE,
  ACTION_LOGIN_FAILURE,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGOUT,
  ACTION_MODE_TO_PLAY,
  ACTION_MODE_TO_TRAIN,
  ACTION_SPELL,
  ACTION_STATISTIC_SORT,
  ACTION_TOGLE_MENU,
  ADMIN_STATUS_LOGINED,
  ADMIN_STATUS_LOGIN_FAILURE,
  ADMIN_STATUS_NOT_LOGINED,
  ASC,
  DESC,
  MODE_PLAY,
  MODE_TRAIN,
  TABLE_CATEGORY,
} from '../../constants';
import { getGameWords } from '../common/gameLogic';
import generateRandomWord from '../common/generator';
import { ActionExtended, StateType } from '../common/types';
import { init } from './store';

function menuReducer(
  state: StateType = { isMenuOpen: false } as StateType,
  action: ActionExtended,
): StateType {
  let resultState = state;
  if (action.type === ACTION_TOGLE_MENU) {
    resultState = { ...state, isMenuOpen: !state.isMenuOpen };
  }
  if (action.type === ACTION_CLOSE_MENU) {
    resultState = { ...state, isMenuOpen: false };
  }
  return resultState;
}

function tumblerReducer(
  state: StateType = { mode: MODE_TRAIN } as StateType,
  action: ActionExtended,
): StateType {
  let resultState = state;
  if (action.type === ACTION_MODE_TO_PLAY)
    resultState = { ...state, mode: MODE_PLAY };
  if (action.type === ACTION_MODE_TO_TRAIN)
    resultState = { ...state, mode: MODE_TRAIN };
  return resultState;
}

function gameReducer(
  state: StateType = { round: { curWord: null, log: [] } } as StateType,
  action: ActionExtended,
): StateType {
  if (action.type === ACTION_SPELL) {
    if (!state.round.curWord) {
      const words = getGameWords();
      const curRandomWord = generateRandomWord([], words);
      return {
        ...state,
        round: {
          ...state.round,
          spellCounter: 1,
          curWord: curRandomWord,
          log: [],
          cardsNum: words.length,
        },
      };
    }
    return {
      ...state,
      round: {
        ...state.round,
        spellCounter: state.round.spellCounter + 1,
      },
    };
  }
  if (action.type === ACTION_ATTEMPT) {
    const { curWord } = state.round;
    const isRight = curWord.english === action.payload;
    const newLog = [...state.round.log];
    newLog.push({ word: curWord.english, right: isRight });
    const excludedWords = newLog
      .filter((attempt) => attempt.right)
      .map((attempt) => attempt.word);
    if (isRight) {
      return {
        ...state,
        round: {
          ...state.round,
          curWord: generateRandomWord(excludedWords, getGameWords()),
          log: newLog,
        },
      };
    }
    return {
      ...state,
      round: { ...state.round, log: newLog },
    };
  }
  if (action.type === ACTION_GAME_PREPARE)
    return {
      ...state,
      round: {
        curWord: null,
        log: [],
        spellCounter: 0,
        cardsNum: 0,
      },
    };

  return state;
}

function statisticReducer(
  state: StateType = {
    sortColumn: TABLE_CATEGORY,
    sortDirection: ASC,
  } as StateType,
  action: ActionExtended,
): StateType {
  if (action.type === ACTION_STATISTIC_SORT) {
    const sortColumnName = action.payload;
    const newSortDirection = state.sortDirection === ASC ? DESC : ASC;
    const sortDirection =
      state.sortColumn === sortColumnName
        ? newSortDirection
        : state.sortDirection;
    return {
      ...state,
      sortColumn: sortColumnName,
      sortDirection,
    };
  }
  return state;
}

export function adminReducer(
  state: StateType = { adminStatus: ADMIN_STATUS_NOT_LOGINED } as StateType,
  action: ActionExtended,
): StateType {
  if (action.type === ACTION_LOGIN_SUCCESS) {
    return {
      ...state,
      adminStatus: ADMIN_STATUS_LOGINED,
      accessToken: action.payload,
    };
  }
  if (action.type === ACTION_LOGIN_FAILURE) {
    return { ...state, adminStatus: ADMIN_STATUS_LOGIN_FAILURE };
  }
  if (action.type === ACTION_LOGOUT) {
    return {
      ...state,
      adminStatus: ADMIN_STATUS_NOT_LOGINED,
      accessToken: null,
    };
  }
  return state;
}

export default function initStore(): void {
  const appReducer = combineReducers({
    menu: menuReducer,
    tumbler: tumblerReducer,
    game: gameReducer,
    statistic: statisticReducer,
    admin: adminReducer,
  });
  init(createStore(appReducer, applyMiddleware(thunk)));
}
