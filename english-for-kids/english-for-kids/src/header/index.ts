import { ADMIN_STATUS_LOGINED } from '../../constants';
import { categories } from '../common/categories';
import { store } from '../redux/store';
import getBurgerHtml, { menuBind, menuRender } from './menu';
import './style.scss';
import { toggleRender, tumblerBind } from './tumbler';

function getSubmenuHtml() {
  return `
    <div class="submenu">
      <div class="links">
        <a href="#/edit_categories" class="submenu__link categories-link">Categories</a>
        <span class="submenu__link words-link">Words</span>
      </div>
      <span class="submenu__link logout-btn">Log out</span>
    </div>
  `;
}

function headerRender(isAdmin: boolean) {
  const headerEl = document.querySelector('.header');
  headerEl.innerHTML = `
    <div class="container">
      <div class="header__body">
        <div class="burger">
          ${isAdmin ? '' : getBurgerHtml()}
        </div>
          ${isAdmin ? getSubmenuHtml() : ''}
        <div class="switch-box">
        </div>
        <div class="menu" >
        </div>
      </div>
    </div>`;
}

export default async function initHeader(): Promise<void> {
  const isAdmin = store().getState().admin.adminStatus === ADMIN_STATUS_LOGINED;
  headerRender(isAdmin);
  if (!isAdmin) {
    toggleRender();
    menuRender(categories());
    menuBind();
    tumblerBind();
  }
}
