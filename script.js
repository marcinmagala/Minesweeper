'use strict';

const board = document.querySelector('.board');

// Tworzenie planszy
const boxList = new Array(10);

for (let k = 0; k < boxList.length; k++) {
  boxList[k] = new Array(10);
}

console.log(boxList);

for (let i = 0; i < boxList.length; i++) {
  for (let j = 0; j < boxList[i].length; j++) {
    const box = document.createElement('div');
    // box.textContent = `${i}, ${j}`;
    box.classList.add('field');
    box.setAttribute('row', `${i}`);
    box.setAttribute('column', `${j}`);
    board.appendChild(box);
  }
}

// Lewy przycisk myszy na dane pole - odsłonięcie pola
board.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
});

// Prawy przycisk myszy na dane pole - oznaczenie pola z miną
board.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  console.log(e.target);
});
