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

for (let i = 0; i < boxList.length; i++) {
  for (let j = 0; j < boxList[i].length; j++) {
    const box = document.createElement('div');
    mineCoords;

    box.classList.add('field');
    box.setAttribute('row', `${i}`);
    box.setAttribute('column', `${j}`);
    box.setAttribute('coords', `${i},${j}`);

    // for (let l = 0; l < mineCoords.length; l++) {
    //   // console.log(mineCoords[l]);
    //   // console.log([i, j]);
    //   if (mineCoords[l][0] === i && mineCoords[l][1] === j) {
    //     box.setAttribute('mine', true);
    //   } else {
    //     box.setAttribute('mine', false);
    //   }
    // }

    board.appendChild(box);
  }
}

for (let l = 0; l < mineCoords.length; l++) {
  console.log(mineCoords[l][0] === l && mineCoords[l][0] === 3);
  // if (mineCoords[l][0] === i && mineCoords[l][1] === j) {
  //   box.setAttribute('mine', true);
  // } else {
  //   box.setAttribute('mine', false);
  // }
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
