import {
  ADMIN_STATUS_LOGIN_FAILURE,
  PAGES_CATEGORY,
  PAGES_DIFFICALT_WORDS,
  PAGES_LOGIN,
  PAGES_STATISTIC,
} from '../../constants';
import gameLogic, { getGameWords } from '../common/gameLogic';
import getPage from '../common/pageInfo';
import { getStatistic } from '../common/statisticStore';
import initHeader from '../header';
import { toggleMenu } from '../header/menu';
import { showLoginFailure } from '../login';
import statisticRender, { statisticBind } from '../statistic';
import { store } from './store';

export default function initSubscribe(): void {
  let previousState = store().getState();
  store().subscribe(() => {
    const pageInfo = getPage();
    const state = store().getState();
    const {
      menu: { isMenuOpen },
      statistic: { sortColumn, sortDirection },
    } = state;
    const {
      menu: prevMenu,
      statistic: {
        sortColumn: prevSortColumn,
        sortDirection: prevSortDirection,
      },
    } = previousState;

    if (pageInfo.page === PAGES_CATEGORY) {
      const categoryWords = getGameWords();
      gameLogic(store(), previousState, categoryWords);
    } else if (pageInfo.page === PAGES_STATISTIC) {
      const isStatisticSortChanged =
        prevSortColumn !== sortColumn || prevSortDirection !== sortDirection;
      if (isStatisticSortChanged) {
        statisticRender(getStatistic());
        statisticBind();
      }
    } else if (pageInfo.page === PAGES_DIFFICALT_WORDS) {
      const difficultWords = getGameWords();
      gameLogic(store(), previousState, difficultWords);
    } else if (pageInfo.page === PAGES_LOGIN) {
      if (state.admin.adminStatus === ADMIN_STATUS_LOGIN_FAILURE) {
        showLoginFailure();
      }
    }
    const isLoginStatusChanged =
      state.admin.adminStatus !== previousState.admin.adminStatus;
    if (isLoginStatusChanged) {
      initHeader();
    }

    const isMenuToggled = prevMenu.isMenuOpen !== isMenuOpen;
    if (isMenuToggled) {
      toggleMenu(isMenuOpen);
    }
    previousState = state;
  });
}
