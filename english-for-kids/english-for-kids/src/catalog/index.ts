import { PAGES_CATEGORY } from '../../constants';
import { categories } from '../common/categories';
import { CategoryType } from '../common/types';
import './style.scss';
import failImg from '../assets/icons/question.svg';

function addImgForCategory(category: CategoryType) {
  if (category.words[0]) {
    return category.words[0].imageSrc;
  }
  return `${failImg}`;
}

function getCardHtml(category: CategoryType) {
  return `
    <a href="#/${PAGES_CATEGORY}/${category.name}">
      <div class='card'>
        <div class="back">
          <div class="pic pic-back">
            <img src="${addImgForCategory(category)}" alt="">
          </div>
          <p class="word word_categories">${category.name}</p>
        </div>
      </div>
    </a>
  `;
}

export default function catalogCardsRender(): void {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = categories().reduce(
    (acc: string, category: CategoryType) => `${getCardHtml(category)} ${acc}`,
    '',
  );
  const asideEl = document.querySelector('.aside');
  asideEl.innerHTML = '';
}
