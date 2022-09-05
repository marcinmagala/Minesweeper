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
      box.setAttribute('row', `${i}`);
      box.setAttribute('column', `${j}`);
      box.setAttribute('coords', `${i},${j}`);
      // box.setAttribute('mine', false);
      box.dataset.mine = false;

      fieldWithNeighbours.set(`${i}${j}`, [
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j - 1],
        [i, j + 1],
        [i + 1, j - 1],
        [i + 1, j],
        [i + 1, j + 1],
      ]);
      for (let l = 0; l < mineCoords.length; l++) {
        if (mineCoords[l][0] === i && mineCoords[l][1] === j) {
          // box.setAttribute('mine', true);
          box.dataset.mine = true;
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
          // fieldWithNeighbours.set(`${i}${j}`, { mine: true });
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
  // const tempTarget = e.target;
  // console.log(tempTarget);
  // console.log(e.target.dataset.mine);
  if (e.target.dataset.mine === 'false') {
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
