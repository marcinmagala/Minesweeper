'use strict';

const board = document.querySelector('.board');
const win = document.querySelector('.win');
const lose = document.querySelector('.lose');
const endOfGame = document.querySelector('.end_of_game');

// Tworzenie planszy
const boxList = new Array(10);

for (let k = 0; k < boxList.length; k++) {
  boxList[k] = new Array(10);
}

// Tworzenie min

let mineCoords = [];

const setMineCoords = function () {
  const mineX = Math.floor(Math.random() * 10);
  const mineY = Math.floor(Math.random() * 10);

  mineCoords.forEach(item => {
    console.log(item === `${mineX}${mineY}`);
    if (item === `${mineX}${mineY}`) {
      setMineCoords();
    }
  });
  mineCoords.push(`${mineX}${mineY}`);
};

const setMine = function () {
  for (let m = 0; m < 15; m++) {
    setMineCoords();
  }

  console.log(mineCoords);
};

setMine();

const fieldWithNeighbours = {};
// key === coords (string) from clicked field
// value === Array(0-7 -> coords of neighbours of such field (string), 8 -> mine exist (boolean), 9 -> field clicked by user (boolean), 10 -> marked field as field with mine by user (boolean), 11 -> many of mines in neighbours of field )

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
        0,
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

// Tworzenie sąsiadów

// Lewy przycisk myszy na dane pole - odsłonięcie pola
board.addEventListener('click', e => openField(e));

const openField = function (e) {
  // e.preventDefault();
  console.log(e);
  let field;
  e.pointerType === 'mouse' ? (field = e.target) : (field = e);

  // console.log(field);
  // Sprawdzenie czy e.target jest polem gry -> zabezpiecznie przed błędem jeśli po zakończeniu gry grać będzie dalej naciskał na pola gry
  if (field.classList.contains('field')) {
    if (!fieldWithNeighbours[`${field.dataset.coords}`][8]) {
      field.style.boxShadow = 'none';
      field.style.backgroundColor = '#ddd';
      fieldWithNeighbours[`${field.dataset.coords}`][10] = false;
      fieldWithNeighbours[field.dataset.coords][9] = true;
      console.log(fieldWithNeighbours);

      // Tworzenie cyfry na polu (liczby min w sąsiedztwie)
      let manyOfMine = 0;
      for (const mine of mineCoords) {
        for (let i = 0; i < 8; i++) {
          if (fieldWithNeighbours[field.dataset.coords][i] === mine) {
            manyOfMine++;
            console.log(manyOfMine);
          }
        }
      }

      fieldWithNeighbours[field.dataset.coords][11] = manyOfMine;

      if (manyOfMine !== 0) {
        const manyOfMineBox = document.createElement('p');
        manyOfMineBox.textContent = `${manyOfMine}`;

        field.appendChild(manyOfMineBox);
      }

      // Odsłanianie sąsiadów klikniętego pola
      if (fieldWithNeighbours[field.dataset.coords][11] === 0) {
        for (let i = 0; i < 8; i++) {
          if (
            // Sprawdza czy coords istnieje w obiekcie
            fieldWithNeighbours[
              fieldWithNeighbours[field.dataset.coords][i]
            ] !== undefined
          ) {
            if (
              // Sprawdza czy field został już kliknięty przez user, żeby nie nadpisywać danych
              !fieldWithNeighbours[
                fieldWithNeighbours[field.dataset.coords][i]
              ][9]
            ) {
              openField(
                document.querySelector(
                  `[data-coords="${
                    fieldWithNeighbours[field.dataset.coords][i]
                  }"]`
                )
              );
              // }
            }
          }
        }
      }
    } else {
      // End game

      // Change value "mark field as mine" in object from true to false
      fieldWithNeighbours[field.dataset.coords][10] = false;

      // Info do obiektu czy pole zostało kliknięte przez użytkownika
      fieldWithNeighbours[field.dataset.coords][9] = true;

      // Mark clicked field as mine
      field.style.backgroundColor = 'red';

      // Blocking clickable board
      endOfGame.style.zIndex = '99';

      // Show all mines
    }

    console.log(field);
    console.log(fieldWithNeighbours);
  }
};

// Prawy przycisk myszy na dane pole - oznaczenie pola z miną
board.addEventListener('contextmenu', e => markAsMine(e));

const markAsMine = function (e) {
  e.preventDefault();

  // Sprawdzenie czy e.target jest polem gry -> zabezpiecznie przed błędem jeśli po zakończeniu gry grać będzie dalej naciskał na pola gry
  if (e.target.classList.contains('field')) {
    e.target.style.backgroundColor = 'violet';
    fieldWithNeighbours[`${e.target.dataset.coords}`][9] = false;
    fieldWithNeighbours[`${e.target.dataset.coords}`][10] = true;
    console.log(fieldWithNeighbours);

    console.log(e.target);
  }
};

// //

// 1. Ogarnąć tworzenie min aby nie tworzyło dwóch min o tych samych współrzędnych

// 2. Po kliknięciu w minę wszystkie miny powinny zostać podświetlone, a plansza powinna zostać zablokowana

// 3. Dodać timet który liczy czas od momentu naciśnięcia na pierwsze pole, aż do momentu oznacznia wszystkich min lub do momentu naciśnięcia na minę

// 4. Przycisk do resetowania w miejscu przycisku check

// 5. Liczba pozostałych min do znalezienia obliczana na podstawie ilości znaczników mark as mine

// 6. Dorobić grafiki min i znaczników
