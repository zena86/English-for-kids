import { goToMainPage } from '../category';
import { dispatchActionLogout, dispatchLogin } from '../redux/actions';
import './style.scss';

function getLoginHtml(): string {
  return `
    <div class="form">
      <div class="form__header">
          <h2 class="title">Login</h2>
      </div>
      <div class="form__main">
        <div class="form__fields">
          <div class="form__field">
              <div class="form__content">
                <label for="username" class="form__label">Username</label>
                <input type="text" id="username" class="form__input" placeholder="username">
              </div>
          </div>
          <div class="form__field">
              <div class="form__content">
                <label for="password" class="form__label">Password</label>
                <input type="password" id="password" class="form__input" placeholder="password">
              </div>
          </div>
          <p id="login-msg"></p>
        </div>
      </div>
      <div class="form__footer">
        <div class="form__btns">
          <button id="cancel-btn" class="form__btn btn active-btn ">cancel</button>
          <button id="login-btn" class="form__btn btn">login</button>
        </div>
      </div>
    </div>
  `;
}

export default function loginRender(): void {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = getLoginHtml();

  const asideEl = document.querySelector('.aside');
  asideEl.innerHTML = '';
}

export function loginBind(): void {
  const loginBtnEl = document.getElementById('login-btn');
  const usernameEl = document.getElementById('username') as HTMLInputElement;
  const passwordEl = document.getElementById('password') as HTMLInputElement;
  loginBtnEl.addEventListener('click', () => {
    dispatchLogin(usernameEl.value, passwordEl.value);
  });
}

export function showLoginFailure(): void {
  const loginMsg = document.getElementById('login-msg');
  loginMsg.innerHTML = 'Invalid login or password';
}

export function logoutBind(): void {
  const logoutBtnEl = document.querySelector('.logout-btn');
  logoutBtnEl.addEventListener('click', () => {
    dispatchActionLogout();
    goToMainPage();
  });
}

export function cancelBind(): void {
  const cancelBtnEl = document.getElementById('cancel-btn');
  const usernameEl = document.getElementById('username') as HTMLInputElement;
  const passwordEl = document.getElementById('password') as HTMLInputElement;
  const loginMsg = document.getElementById('login-msg');
  cancelBtnEl.addEventListener('click', () => {
    usernameEl.value = '';
    passwordEl.value = '';
    loginMsg.innerHTML = '';
  });
}
