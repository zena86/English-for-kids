import { Action, CombinedState } from "redux";

export interface WordType {
  english: string,
  russian: string,
  imageSrc: string,
  audioSrc: string,
  wordId: string,
}

export interface CategoryType {
  name: string,
  words: WordType[],
  id: string
}

export interface AttemptType {
  word: string,
  right: boolean,
}

export interface StateType {
  isMenuOpen: boolean,
  mode: string,
  round: {
    spellCounter: number;
    curWord: WordType,
    log: AttemptType[],
    cardsNum: number,
  },
  sortColumn: string,
  sortDirection: string,
  adminStatus: string,
  accessToken: string,
}

export interface StatisticType {
  engWord: string,
  attempts: number,
  rightNum: number,
}

export interface PageInfo {
  page: string,
  subPage: string,
}

export interface TableType {
  category: string,
  russian: string,
  english: string,
  attempts: number,
  rightNum: number,
  wrong: number,
  percent: number,
}

export interface ActionExtended extends Action {
  payload: string;
}

export interface CombinedType extends CombinedState<{ menu: StateType,
  tumbler: StateType,
  game: StateType,
  statistic: StateType}> {
}
