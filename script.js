'use strict';

const board = document.querySelector('.board');

// Tworzenie planszy
const boxList = new Array(10);

for (let k = 0; k < boxList.length; k++) {
  boxList[k] = new Array(10);
}

// Tworzenie min

let mineCoords = [];

const setMine = function () {
  for (let m = 0; m < 10; m++) {
    const mineX = Math.floor(Math.random() * 10);
    const mineY = Math.floor(Math.random() * 10);

    mineCoords.push([mineX, mineY]);
  }

  console.log(mineCoords);
};

setMine();

const fieldWithNeighbours = new Map();

const buildBoard = function () {
  for (let i = 0; i < boxList.length; i++) {
    for (let j = 0; j < boxList[i].length; j++) {
      const box = document.createElement('div');
      mineCoords;

      box.classList.add('field');

      box.dataset.coords = `${i}${j}`;

      fieldWithNeighbours.set(`${i}${j}`, [
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j - 1],
        [i, j + 1],
        [i + 1, j - 1],
        [i + 1, j],
        [i + 1, j + 1],
        false,
      ]);

      for (let l = 0; l < mineCoords.length; l++) {
        if (mineCoords[l][0] === i && mineCoords[l][1] === j) {
          fieldWithNeighbours.set(`${i}${j}`, [
            [i - 1, j - 1],
            [i - 1, j],
            [i - 1, j + 1],
            [i, j - 1],
            [i, j + 1],
            [i + 1, j - 1],
            [i + 1, j],
            [i + 1, j + 1],
            true,
          ]);
        }
      }

      board.appendChild(box);
    }
  }
};

buildBoard();

console.log(fieldWithNeighbours);

// Tworzenie sąsiadów

// Lewy przycisk myszy na dane pole - odsłonięcie pola
board.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target.dataset.coords);
  // console.log(fieldWithNeighbours.get(`${e.target.dataset.coords}`)[8]);
  if (!fieldWithNeighbours.get(`${e.target.dataset.coords}`)[8]) {
    e.target.style.backgroundColor = 'green';
  } else {
    e.target.style.backgroundColor = 'red';
  }
  console.log(e.target);
});

// Prawy przycisk myszy na dane pole - oznaczenie pola z miną
board.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  e.target.style.backgroundColor = 'violet';
  console.log(e.target);
});
