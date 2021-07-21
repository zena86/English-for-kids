import initHeader from '../header';
import rssImg from '../assets/icons/rss.svg';
import githubImg from '../assets/icons/github-logo.svg';
import './style.scss';

function mainRender() {
  return `
      <div class="container">
        <div class="board__box">
          <div id='board' class="board">
          </div>
          <div class="aside">
          </div>
        </div>
      </div>
    `;
}

function appRender() {
  const appEl = document.getElementById('app');
  appEl.innerHTML = `
    
    <div class="wrapper">
      <header class="header">  
      </header>
      <main class="main">
        ${mainRender()}
      </main>
      <footer class="footer">
        <div class="container footer__body">
          <a href="https://rs.school/js/" class="logo" target="_blank"><img src="${rssImg}"></a>
          <p class="footer-text">2021<p>
          <a href="https://github.com/zena86" class="github-link footer-text"><img class="github-img" src="${githubImg}">zena86</a>
        </div>
      </footer>
      <div id="glass">
      </div>
    </div>
  `;
}

export default async function initRender(): Promise<void> {
  appRender();
  initHeader();
}
