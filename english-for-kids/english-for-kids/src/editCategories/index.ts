import './style.scss';
import closeImg from '../assets/icons/close.svg';
import addImg from '../assets/icons/add.svg';
import {
  changeCategoryName,
  createCategory,
  deleteCategory,
  getCategories,
} from '../common/serverServise';
import { MAX_CARDS_PER_PAGE, PAGES_EDIT_WORDS } from '../../constants';
import { store } from '../redux/store';

function getEditCategoryHtml(
  title: string,
  wordNumber: number,
  id: string,
): string {
  return `
    <div class="category-edit" data-id="${id}">
      <h2 class="category-edit__title">${title}</h2>
      <div class="form__field category-name">
        <div class="form__content">
          <label for="category-name${id}" class="form__label">Category name</label>
          <input type="text" id="category-name${id}" class="form__input" placeholder="">
        </div>
      </div>
      <img src="${closeImg}" alt="close" class="close">
      <p class="category-edit__info">words: <span class="word-number">${wordNumber}</span></p>
      <button class="btn-edit update-category">update</button>
      <button class="btn-edit add-words">add words</button>
      <div class = "edit-btns">
        <button class="btn-edit cancel-category">Cancel</button>
        <button class="btn-edit save-category">Save</button>
      </div>
    </div>
  `;
}

function getAddCategoryHtml(): string {
  return `
    <div class="category-edit edit-category-card">
      <p class="create-text">Create new Category</p>
      <img src="${addImg}" alt="add" id="add-category">
      <div class="form__field category-name">
        <div class="form__content">
          <label for="create-cat-name" class="form__label">Category name</label>
          <input type="text" id="create-cat-name" class="form__input" placeholder="">
        </div>
      </div>
      <div class = "edit-btns">
        <button class="btn-edit cancel-category">Cancel</button>
        <button class="btn-edit create-category">Create</button>
      </div>
    </div>
  `;
}

async function getEditCategoriesHtml(skip: number, limit: number) {
  const editCategoriesArr = await getCategories(skip, limit);
  return editCategoriesArr.reduce(
    (acc, category) =>
      `${getEditCategoryHtml(
        category.name,
        category.words.length,
        category.id,
      )} ${acc}`,
    '',
  );
}

let rebind: () => void = null;

function selectSubLink() {
  const categoriesLink = document.querySelector('.categories-link');
  const wordsLink = document.querySelector('.words-link');
  categoriesLink.classList.add('active');
  wordsLink.classList.remove('active');
}

export default async function editCategoriesRender(): Promise<void> {
  const boardEl = document.getElementById('board');
  const boardHtml = await getEditCategoriesHtml(0, MAX_CARDS_PER_PAGE);
  boardEl.innerHTML = boardHtml + getAddCategoryHtml();
  const asideEl = document.querySelector('.aside');
  asideEl.innerHTML = '';
  selectSubLink();
}

function deleteCategoryBind() {
  const closeElArr = Array.from(document.querySelectorAll('.close'));
  closeElArr.forEach((closeEl) => {
    const deleteCategoryFunc = async (el: Event) => {
      const close = el.target as HTMLElement;
      const categoryEl = close.closest('.category-edit') as HTMLElement;
      const { id } = categoryEl.dataset;
      const { accessToken } = store().getState().admin;
      await deleteCategory(id, accessToken);
      await editCategoriesRender();
      rebind();
    };
    closeEl.addEventListener('click', deleteCategoryFunc);
  });
}

function addCategoryBind() {
  const addCategoryEl = document.getElementById('add-category');
  const editCategoryCardEl = document.querySelector('.edit-category-card');
  addCategoryEl?.addEventListener('click', () => {
    editCategoryCardEl.classList.add('editable');
  });
}

function createCategoryBind() {
  const createCategoryEl = document.querySelector(
    '.create-category',
  ) as HTMLElement;
  const categoryNameEl = document.querySelector(
    '#create-cat-name',
  ) as HTMLInputElement;
  createCategoryEl?.addEventListener('click', async () => {
    if (categoryNameEl.value) {
      const { accessToken } = store().getState().admin;
      await createCategory(categoryNameEl.value, accessToken);
      await editCategoriesRender();
      rebind();
    }
  });
}

function updateCategoryBind() {
  const updateElArr = Array.from(document.querySelectorAll('.update-category'));
  updateElArr.forEach((updateEl) => {
    updateEl.addEventListener('click', () => {
      const categoryEl = updateEl.closest('.category-edit') as HTMLElement;
      categoryEl.classList.add('editable');
      const { id } = categoryEl.dataset;
      const saveBtn = categoryEl.querySelector('.save-category');
      const inputEl = categoryEl.querySelector(
        '.form__input',
      ) as HTMLInputElement;
      const title = categoryEl.querySelector(
        '.category-edit__title',
      ).textContent;
      inputEl.value = title;
      saveBtn.addEventListener('click', async () => {
        const { accessToken } = store().getState().admin;
        changeCategoryName(inputEl.value, id, accessToken);
        await editCategoriesRender();
        rebind();
      });
    });
  });
}

function cancelCategoryBind() {
  const cancelElArr = Array.from(document.querySelectorAll('.cancel-category'));
  cancelElArr.forEach((cancelEl) => {
    cancelEl.addEventListener('click', () => {
      const categoryEl = cancelEl.closest('.category-edit') as HTMLElement;
      categoryEl.classList.remove('editable');
    });
  });
}

function goToEditWords(id: string) {
  document.location.hash = `/${PAGES_EDIT_WORDS}/${id}`;
}

function addWordsBind() {
  const addWordsElArr = Array.from(document.querySelectorAll('.add-words'));
  addWordsElArr.forEach((addWordsEl) => {
    addWordsEl.addEventListener('click', () => {
      const categoryEl = addWordsEl.closest('.category-edit') as HTMLElement;
      const { id } = categoryEl.dataset;
      goToEditWords(id);
    });
  });
}

export function editCategoriesBind(): void {
  deleteCategoryBind();
  addCategoryBind();
  createCategoryBind();
  updateCategoryBind();
  cancelCategoryBind();
  addWordsBind();
}

rebind = editCategoriesBind;
