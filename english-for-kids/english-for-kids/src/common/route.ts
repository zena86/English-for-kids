import {
  ADMIN_STATUS_LOGINED,
  PAGES_CATEGORY,
  PAGES_DIFFICALT_WORDS,
  PAGES_EDIT_CATEGORIES,
  PAGES_EDIT_WORDS,
  PAGES_LOGIN,
  PAGES_MAIN,
  PAGES_STATISTIC,
} from '../../constants';
import catalogCardsRender from '../catalog';
import getCategoryWords, { categoryCardsBind, goToMainPage } from '../category';
import difficultWordsRender, { wordCardsRender } from '../difficultWords';
import { menuRender } from '../header/menu';
import {
  dispatchActionCloseMenu,
  dispatchActionGamePrepare,
} from '../redux/actions';
import { store } from '../redux/store';
import statisticRender, { statisticBind } from '../statistic';
import getPage from './pageInfo';
import { getStatistic } from './statisticStore';
import loginRender, { cancelBind, loginBind, logoutBind } from '../login';
import editCategoriesRender, { editCategoriesBind } from '../editCategories';
import editWordsRender, { editWordsBind } from '../editWords';
import { categories } from './categories';

function routPagesCategory() {
  dispatchActionGamePrepare();
  const pageInfo = getPage();
  const categoryWords = getCategoryWords(pageInfo.subPage);
  wordCardsRender(categoryWords, store().getState().tumbler.mode);
  categoryCardsBind(store());
}

function routPagesStatistic() {
  statisticRender(getStatistic());
  statisticBind();
}

function routPagesDifficultWords() {
  difficultWordsRender(store().getState().tumbler.mode);
  categoryCardsBind(store());
}

function routPagesMain() {
  catalogCardsRender();
}

function routPagesLogin() {
  loginRender();
  loginBind();
  cancelBind();
}

function checkAccess() {
  if (store().getState().admin.adminStatus !== ADMIN_STATUS_LOGINED) {
    goToMainPage();
  }
}

async function routPagesEditCategories() {
  checkAccess();
  await editCategoriesRender();
  editCategoriesBind();
  logoutBind();
}

async function routPagesEditWords() {
  checkAccess();
  await editWordsRender();
  editWordsBind();
  logoutBind();
}

const config = new Map([
  [PAGES_CATEGORY, routPagesCategory],
  [PAGES_STATISTIC, routPagesStatistic],
  [PAGES_DIFFICALT_WORDS, routPagesDifficultWords],
  [PAGES_MAIN, routPagesMain],
  [PAGES_LOGIN, routPagesLogin],
  [PAGES_EDIT_CATEGORIES, routPagesEditCategories],
  [PAGES_EDIT_WORDS, routPagesEditWords],
]);

export default function route(): void {
  const pageInfo = getPage();
  dispatchActionCloseMenu();
  const { page } = pageInfo;
  const renderer = config.get(page);
  if (renderer) renderer();
  menuRender(categories());
}

export function initRoute(): void {
  window.addEventListener('hashchange', () => {
    route();
  });
  route();
}
