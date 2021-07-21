import { MAX_CARDS_PER_PAGE } from '../constants';
import initRender from './app/index';
import { updateCategories } from './common/categories';
import { initRoute } from './common/route';
import { getCategories } from './common/serverServise';
import initStore from './redux/reducers';
import initSubscribe from './redux/subscribe';

window.addEventListener('load', async () => {
  updateCategories(await getCategories(0, MAX_CARDS_PER_PAGE));
  initStore();
  await initRender();
  initSubscribe();
  initRoute();
});
