import './style.scss';
import closeImg from '../assets/icons/close.svg';
import audioImg from '../assets/icons/audio.svg';
import addImg from '../assets/icons/add.svg';
import {
  createWord,
  deleteWord,
  getWords,
  updateWord,
} from '../common/serverServise';
import getPage from '../common/pageInfo';
import { store } from '../redux/store';
import { MAX_CARDS_PER_PAGE } from '../../constants';

function getEditWordHtml(
  english: string,
  russian: string,
  audioSrc: string,
  imageSrc: string,
  wordId: string,
): string {
  return `
    <div class="word-update word-card" data-id="${wordId}">
      <div class="word-form">
      <img src="${closeImg}" alt="" class="close">
        <div class="form__fields">
          <p class="prev-label">Word: <span>${english}</span></p>
          
          <div class="form__field">
            <div class="form__content">
              <label for="word${wordId}" class="form__label input-label">Word</label>
              <input type="text" id="word${wordId}" value="${english}" class="form__input inp-update-word" placeholder="">
            </div>
          </div>

          <p class="prev-label">Translation: <span>${russian}</span></p>
          
          <div class="form__field">
            <div class="form__content">
              <label for="translation${wordId}" class="form__label input-label">Translation</label>
              <input type="text" id="translation${wordId}" value="${russian}" class="form__input inp-update-rus" placeholder="">
            </div>
          </div>

          <div>
          <img class="audio-btn" src="${audioImg}" alt="">
          <audio src="${audioSrc}"></audio>
          
          <div class="form__field field-file">
            <label for="sound${wordId}">
              <div class="box">
                <p class="input-label">Sound:&nbsp;<button class="btn-edit file-btn">select file</button></p>
                <input class="update-audio-upload hide" id="sound${wordId}" type="file" />
              </div>
            </label>
          </div>


          <img class="prev-img" src="${imageSrc}" alt="">
          
          <div class="form__field field-file">    
            <label for="image${wordId}">
              <div class="box">
                <p class="input-label">Image:&nbsp;<button class="btn-edit file-btn">select file</button></p>
                <input class="update-image-upload hide" id="image${wordId}" type="file" />
              </div>
            </label>
            
          </div>

          </div>
        </div>

        <p class="valid-msg-edit">Fill all fields</p>

        <button class="btn-change">Change</button>

        <div class="edit-btns">
          <button class="btn-edit save-word save-word_update">Save</button>
          <button class="btn-edit cancel-word">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

function getAddWordHtml(): string {
  return `
  <div class="word-edit word-card" id="word-add">
    <div class="word-form">
      <p class="create-text">Add new Word</p>
      <img src="${addImg}" alt="add" id="add-word">
      <img src="${closeImg}" alt="" class="close">
        <div class="form__fields">
          <div class="form__field">
            <div class="form__content">
              <label for="word" class="form__label input-label">Word</label>
              <input type="text" id="word" class="form__input inp-add-word" placeholder="">
            </div>
          </div>
          <div class="form__field">
            <div class="form__content">
              <label for="translation" class="form__label input-label">Translation</label>
              <input type="text" id="translation" class="form__input inp-add-rus" placeholder="">
            </div>
          </div>
          <div>
          <div class="form__field field-file">
            <label for="add-sound">
              <div class="box">
                <p class="input-label">Sound:&nbsp;<button class="btn-edit file-btn">select file</button></p>
                <input class="add-audio-upload hide" id="add-sound" type="file" />
              </div>
            </label>
          </div>
          <div class="form__field field-file">    
            <label for="add-image">
              <div class="box">
                <p class="input-label">Image:&nbsp;<button class="btn-edit file-btn">select file</button></p>
                <input class="add-image-upload hide" id="add-image" type="file" />
              </div>
            </label>
          </div>
          </div>
        </div>
        <p class="valid-msg-add">Fill all fields</p>
        <div class="edit-btns">
          <button class="btn-edit save-word" id="save-word">Save</button>
          <button class="btn-edit cancel-word">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

let rebind: () => void = null;

async function getEditWordsHtml(id: string, skip: number, limit: number) {
  const editWordsArr = await getWords(id, skip, limit);
  return editWordsArr.reduce(
    (acc, word) =>
      `${getEditWordHtml(
        word.english,
        word.russian,
        word.audioSrc,
        word.imageSrc,
        word.wordId,
      )} ${acc}`,
    '',
  );
}

export default async function editWordsRender(): Promise<void> {
  const pageInfo = getPage();
  const boardEl = document.getElementById('board');
  boardEl.innerHTML =
    (await getEditWordsHtml(pageInfo.subPage, 0, MAX_CARDS_PER_PAGE)) +
    getAddWordHtml();
  const asideEl = document.querySelector('.aside');
  asideEl.innerHTML = '';

  const categoriesLink = document.querySelector('.categories-link');
  const wordsLink = document.querySelector('.words-link');
  categoriesLink.classList.remove('active');
  wordsLink.classList.add('active');
}

function addWordBind() {
  const addWordEl = document.getElementById('add-word');
  const editWordCardEl = document.querySelector('#word-add');
  addWordEl.addEventListener('click', () => {
    editWordCardEl.classList.add('editable');
  });
}

function mediaReaderFoo(input: HTMLInputElement) {
  return new Promise((resolve, reject) => {
    const mediafile = input.files[0];
    const mediaReader = new FileReader();
    mediaReader.readAsDataURL(mediafile);
    mediaReader.onload = () => {
      resolve(mediaReader.result);
    };
    mediaReader.onerror = reject;
  });
}

function showInvalidMsg() {
  const validMsgAdd = document.querySelector('.valid-msg-add');
  validMsgAdd.classList.add('active');
}

function createWordBind() {
  const saveWordBtnEl = document.getElementById('save-word');

  const pageInfo = getPage();
  const categoryId = pageInfo.subPage;

  const saveFunc = async () => {
    const englishInpEl = document.querySelector(
      '.inp-add-word',
    ) as HTMLInputElement;
    const russianInpEl = document.querySelector(
      '.inp-add-rus',
    ) as HTMLInputElement;
    const imageInpEl = document.querySelector(
      '.add-image-upload',
    ) as HTMLInputElement;
    const audioInpEl = document.querySelector(
      '.add-audio-upload',
    ) as HTMLInputElement;

    const english = englishInpEl.value;
    const russian = russianInpEl.value;

    if (
      !english ||
      !russian ||
      audioInpEl.files.length === 0 ||
      imageInpEl.files.length === 0
    ) {
      showInvalidMsg();
      return;
    }

    const mediaData = await Promise.all([
      mediaReaderFoo(audioInpEl),
      mediaReaderFoo(imageInpEl),
    ]);

    const audioSrc = `${mediaData[0]}`;
    const imageSrc = `${mediaData[1]}`;

    const { accessToken } = store().getState().admin;
    await createWord(
      categoryId,
      english,
      russian,
      audioSrc,
      imageSrc,
      accessToken,
    );
    await editWordsRender();
    rebind();
  };
  saveWordBtnEl.addEventListener('click', saveFunc);
}

function playSoundBind() {
  const audioBtnElArr = Array.from(document.querySelectorAll('.audio-btn'));
  audioBtnElArr.forEach((audioBtnEl) => {
    audioBtnEl.addEventListener('click', (el) => {
      const audioBtn = el.target as HTMLElement;
      const wordEl = audioBtn.closest('.word-form') as HTMLElement;
      wordEl.querySelector('audio').play();
    });
  });
}

function deleteWordBind() {
  const closeElArr = Array.from(document.querySelectorAll('.close'));
  closeElArr.forEach((closeEl) => {
    closeEl.addEventListener('click', async (el) => {
      const close = el.target as HTMLElement;
      const wordEl = close.closest('.word-update') as HTMLElement;
      const wordId = wordEl.dataset.id;
      const categoryId = getPage().subPage;
      const { accessToken } = store().getState().admin;
      await deleteWord(wordId, categoryId, accessToken);
      await editWordsRender();
      rebind();
    });
  });
}

function updateWordBind() {
  const changeElArr = Array.from(document.querySelectorAll('.btn-change'));
  changeElArr.forEach((changeEl) => {
    changeEl.addEventListener('click', () => {
      const wordEl = changeEl.closest('.word-update') as HTMLElement;
      const wordId = wordEl.dataset.id;
      wordEl.classList.add('editable');

      const saveElArr = Array.from(
        document.querySelectorAll('.save-word_update'),
      );
      saveElArr.forEach((saveEl) => {
        const pageInfo = getPage();
        const categoryId = pageInfo.subPage;

        saveEl.addEventListener('click', async () => {
          const englishInpEl = wordEl.querySelector(
            '.inp-update-word',
          ) as HTMLInputElement;
          const russianInpEl = wordEl.querySelector(
            '.inp-update-rus',
          ) as HTMLInputElement;
          const imageInpEl = wordEl.querySelector(
            '.update-image-upload',
          ) as HTMLInputElement;
          const audioInpEl = wordEl.querySelector(
            '.update-audio-upload',
          ) as HTMLInputElement;

          const english = englishInpEl.value;
          const russian = russianInpEl.value;

          if (
            !english ||
            !russian ||
            audioInpEl.files.length === 0 ||
            imageInpEl.files.length === 0
          ) {
            showInvalidMsg();
            return;
          }

          const mediaData = await Promise.all([
            mediaReaderFoo(audioInpEl),
            mediaReaderFoo(imageInpEl),
          ]);
          const audioSrc = `${mediaData[0]}`;
          const imageSrc = `${mediaData[1]}`;

          const word = {
            english,
            russian,
            audioSrc,
            imageSrc,
            wordId,
          };
          const { accessToken } = store().getState().admin;
          await updateWord(word, categoryId, accessToken);
          await editWordsRender();
          rebind();
        });
      });
    });
  });
}

function cancelWordBind() {
  const cancelElArr = Array.from(document.querySelectorAll('.cancel-word'));
  cancelElArr.forEach((cancelEl) => {
    cancelEl.addEventListener('click', () => {
      const wordEl = cancelEl.closest('.word-card') as HTMLElement;
      wordEl.classList.remove('editable');
      const validMsgEdit = wordEl.querySelector('.valid-msg-edit');
      const validMsgAdd = wordEl.querySelector('.valid-msg-add');
      validMsgEdit.classList.remove('active');
      validMsgAdd.classList.remove('active');
    });
  });
}

export function editWordsBind(): void {
  addWordBind();
  createWordBind();
  playSoundBind();
  deleteWordBind();
  updateWordBind();
  cancelWordBind();
}

rebind = editWordsBind;
