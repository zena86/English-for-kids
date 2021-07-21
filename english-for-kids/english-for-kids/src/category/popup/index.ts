import './style.scss';

export default function getPopupHtml(
  message: string,
  imageSrc: string,
): string {
  return `
    <div class="popup">
      <div class="popup-content">
        <p class="msg">${message}</p>
        <img class="smile" src="${imageSrc}" alt="smile">
      </div>
    </div>
  `;
}
