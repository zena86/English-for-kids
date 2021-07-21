import { ADMIN_STATUS_NOT_LOGINED, ASC, MODE_TRAIN, TABLE_CATEGORY } from '../../constants';
import { StateType } from './types';

export const initState: StateType = {
  isMenuOpen: false,
  mode: MODE_TRAIN,
  round: {
    spellCounter: 0,
    curWord: null,
    log: [],
    cardsNum: 0,
  },
  sortColumn: TABLE_CATEGORY,
  sortDirection: ASC,
  adminStatus: ADMIN_STATUS_NOT_LOGINED,
  accessToken: null,
};