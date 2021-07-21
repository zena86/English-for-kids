import {
  LOGIN_PAGE,
  MAIN_PAGE,
  PAGES_CATEGORY,
  PAGES_LOGIN,
  PAGES_STATISTIC,
  STATISTIC_PAGE,
} from '../../../constants';
import getPage from '../../common/pageInfo';
import { CategoryType } from '../../common/types';
import {
  dispatchActionCloseMenu,
  dispatchActionToggleMenu,
} from '../../redux/actions';
import './style.scss';

export default function getBurgerHtml(): string {
  return `
    <span class="line"></span>
    <span class="line"></span>
    <span class="line"></span>
    <span class="line"></span>
  `;
}

export function menuRender(categories: CategoryType[]): void {
  const menuEl = document.querySelector('.menu');
  const pageInfo = getPage();
  const mainLinkHtml =
    pageInfo.page === ''
      ? `<span class="menu__link main__link current">${MAIN_PAGE}</span>`
      : `<a href="#" id="main-page" class="menu__link main__link">${MAIN_PAGE}</a>`;

  const categotiesHtml = categories.reduce((acc, category) => {
    if (category.name === pageInfo.subPage)
      return `<span class="menu__link current">${category.name}</span> ${acc}`;

    return `
    <a href="#/${PAGES_CATEGORY}/${category.name}"class="menu__link" data-category='${category.name}' >${category.name}</a> ${acc}`;
  }, '');

  const statisticLinkHtml =
    pageInfo.page === PAGES_STATISTIC
      ? `<span class="menu__link main__link current">${STATISTIC_PAGE}</span>`
      : `<a href="#/${PAGES_STATISTIC}" class="menu__link main__link">${STATISTIC_PAGE}</a>`;

  const adminLinkHtml =
    pageInfo.page === PAGES_LOGIN
      ? `<span class="menu__link main__link current">${LOGIN_PAGE}</span>`
      : `<a href="#/${PAGES_LOGIN}" class="menu__link main__link">${LOGIN_PAGE}</a>`;

  menuEl.innerHTML = `
    ${mainLinkHtml} 
    ${categotiesHtml} 
    ${statisticLinkHtml} 
    ${adminLinkHtml}
  `;
}

function burgerBind() {
  document.querySelector('.burger').addEventListener('click', () => {
    dispatchActionToggleMenu();
  });
}

export function menuBind(): void {
  const glassEl = document.getElementById('glass');
  glassEl.addEventListener('click', () => {
    dispatchActionCloseMenu();
  });
  burgerBind();
}

export function toggleMenu(isMenuOpen: boolean): void {
  const menu = document.querySelector('.menu');
  const burger = document.querySelector('.burger');
  const glass = document.getElementById('glass');
  const components = [burger, menu, glass];
  if (isMenuOpen) {
    components.forEach((item) => item.classList.add('active'));
  } else {
    components.forEach((item) => item.classList.remove('active'));
  }
}
