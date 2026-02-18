export function getRandomPosition() {
  const {clientHeight, clientWidth} = document.body;

  return {
    x: Math.random() * clientWidth,
    y: Math.random() * clientHeight * 0.85,
  }
}