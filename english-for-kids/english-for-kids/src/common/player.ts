export default function playAudio(src: string): void {
  const player = document.createElement('audio');
  player.src = src;
  player.play();
}
