'use strict';

const board = document.querySelector('.board');
const win = document.querySelector('.win');
const lose = document.querySelector('.lose');

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

    mineCoords.push(`${mineX}${mineY}`);
  }

  console.log(mineCoords);
};

setMine();

const test = function () {
  console.log('test');
};

// objekt zamiast mapy
// const objekt = {
//   '00': [[1, 2], [3, 4], true, false],
//   '01': [[5, 6], [7, 8], true, false],
// };

// console.log(objekt);

// console.log((objekt['00'][3] = true));

// objekt['02'] = [[1, 2], [5, 4], true, false];

// console.log(objekt['02']);
// console.log(objekt);

const fieldWithNeighbours = {};
// key === coords (string) from clicked field
// value === Array(0-7 -> coords of neighbours of such field (string), 8 -> mine exist (boolean), 9 -> field clicked by user (boolean), 10 -> marked field as field with mine by user (boolean) )

const buildBoard = function () {
  for (let i = 0; i < boxList.length; i++) {
    for (let j = 0; j < boxList[i].length; j++) {
      const box = document.createElement('div');
      mineCoords;

      box.classList.add('field');

      box.dataset.coords = `${i}${j}`;

      fieldWithNeighbours[`${i}${j}`] = [
        `${i - 1}${j - 1}`,
        `${i - 1}${j}`,
        `${i - 1}${j + 1}`,
        `${i}${j - 1}`,
        `${i}${j + 1}`,
        `${i + 1}${j - 1}`,
        `${i + 1}${j}`,
        `${i + 1}${j + 1}`,
        false,
        false,
        false,
      ];

      for (let l = 0; l < mineCoords.length; l++) {
        if (mineCoords[l] === `${i}${j}`) {
          fieldWithNeighbours[`${i}${j}`][8] = true;
        }
      }

      board.appendChild(box);
    }
  }
};

buildBoard();

console.log(fieldWithNeighbours);

// console.log(fieldWithNeighbours.get(`${fieldWithNeighbours.get('11')[1]}`));

// Tworzenie sąsiadów

// Lewy przycisk myszy na dane pole - odsłonięcie pola
board.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target.dataset.coords);
  // console.log(fieldWithNeighbours.get(`${e.target.dataset.coords}`)[8]);
  if (!fieldWithNeighbours[`${e.target.dataset.coords}`][8]) {
    e.target.style.boxShadow = 'none';
    e.target.style.backgroundColor = '#ddd';
    fieldWithNeighbours[`${e.target.dataset.coords}`][10] = false;
    fieldWithNeighbours[e.target.dataset.coords][9] = true;
    console.log(fieldWithNeighbours);

    // Tworzenie cyfry na polu (liczby min w sąsiedztwie)
    let manyOfMine = 0;
    for (const mine of mineCoords) {
      for (let i = 0; i < 8; i++) {
        if (fieldWithNeighbours[e.target.dataset.coords][i] === mine) {
          manyOfMine++;
          console.log(manyOfMine);
        }
      }
    }
    // e.target.textContent = `${manyOfMine}`;
    if (manyOfMine !== 0) {
      const manyOfMineBox = document.createElement('p');
      manyOfMineBox.textContent = `${manyOfMine}`;

      e.target.appendChild(manyOfMineBox);
    }
  } else {
    // end game
    fieldWithNeighbours[e.target.dataset.coords][10] = false;
    e.target.style.backgroundColor = 'red';
  }
  console.log(e.target);
  console.log(fieldWithNeighbours);
});

// Prawy przycisk myszy na dane pole - oznaczenie pola z miną
board.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  e.target.style.backgroundColor = 'violet';
  fieldWithNeighbours[`${e.target.dataset.coords}`][9] = false;
  fieldWithNeighbours[`${e.target.dataset.coords}`][10] = true;
  console.log(fieldWithNeighbours);

  console.log(e.target);
});

console.log(fieldWithNeighbours[11]);
