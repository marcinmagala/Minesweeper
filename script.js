'use strict';

const board = document.querySelector('.board');
// const win = document.querySelector('.win');
// const lose = document.querySelector('.lose');
const endOfGame = document.querySelector('.end_of_game');

const emoticonSad = document.querySelector('.emoticon_sad');
const emoticonSmile = document.querySelector('.emoticon_smile');

// Funkcja resetująca i odpalająca grę na nowo
const reset = function () {
  // Reset wskaźnika ilości pozostałych min do znalezienia
  manyOfFindingMine = 15;
  findMine.textContent = manyOfFindingMine;

  // Reset timera
  valueOfClock = 0;

  // Resetowanie pozycji min
  mineCoords = [];

  // Tworzenie nowych pozycji min
  setMine();

  // Resetowanie obiektu tworzącego planszę
  fieldWithNeighbours = {};

  // Usunięcie całej planszy
  const clearFields = document.querySelectorAll('.field');
  clearFields.forEach(field => field.remove());

  // Budowanie nowej planszy i nowego obiektu z danymi o polach
  buildBoard();

  // Zdjęcie blokady z planszy
  endOfGame.style.zIndex = '-1';
};

// manu bar

// Wskaźnik ilości pozostałych min do znalezienia

const findMine = document.querySelector('.mine');

let manyOfFindingMine = 15;

const createValueOfFindingMine = function (value) {
  // Ilośc min - ilość postawionych znaczniów przez gracza
  if (value < 0) {
    manyOfFindingMine--;
  } else {
    manyOfFindingMine++;
  }
  findMine.textContent = `${manyOfFindingMine}`;
};

findMine.textContent = manyOfFindingMine;

// Tworzenie timera
const clock = document.querySelector('.time');

let valueOfClock = 0;
const increaseClock = function () {
  valueOfClock++;
  if (valueOfClock.toString().length === 1) {
    clock.textContent = `00${valueOfClock}`;
  } else if (valueOfClock.toString().length === 2) {
    clock.textContent = `0${valueOfClock}`;
  } else if (valueOfClock.toString().length === 3) {
    clock.textContent = `${valueOfClock}`;
  }
  window.setTimeout(increaseClock, 1000);
};

increaseClock();

//
// Tworzenie planszy
const boxList = new Array(10);

for (let k = 0; k < boxList.length; k++) {
  boxList[k] = new Array(10);
}

// Tworzenie min

let mineCoords = [];

// Funkcja losuje wartości pozycji dla każdej z min i umieszcza je w array mineCoords
const setMineCoords = function () {
  const mineX = Math.floor(Math.random() * 10);
  const mineY = Math.floor(Math.random() * 10);

  mineCoords.push(`${mineX}${mineY}`);
};

// Funkcja tworząca Array z współrzędnymi min
const setMine = function () {
  for (let m = 0; m < 15; m++) {
    setMineCoords();
  }

  // Funkcja sprawdzająca czy wszystkie wartości w tablicy są różne (za pomocą funkcji set jest generowany nowy array tylko z różnymi wartościami - jeśli długości dwóch array są różne to funkcja jest wywoływana ponownie)
  const checkDifferent = new Set(mineCoords);
  if (mineCoords.length !== checkDifferent.size) {
    mineCoords = [];
    setMine();
  }
  console.log(mineCoords);
};

setMine();

let fieldWithNeighbours = {};
// key === coords (string) from clicked field
// value === Array(0-7 -> coords of neighbours of such field (string), 8 -> mine exist (boolean), 9 -> field clicked by user (boolean), 10 -> marked field as field with mine by user (boolean), 11 -> many of mines in neighbours of field )

const buildBoard = function () {
  for (let i = 0; i < boxList.length; i++) {
    for (let j = 0; j < boxList[i].length; j++) {
      const box = document.createElement('div');

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
  console.log(fieldWithNeighbours);
};

buildBoard();

// console.log(fieldWithNeighbours);

// Tworzenie sąsiadów

// Lewy przycisk myszy na dane pole - odsłonięcie pola
board.addEventListener('click', e => openField(e));

const openField = function (e) {
  let field;
  e.pointerType === 'mouse' ? (field = e.target) : (field = e);

  // Sprawdzenie czy e.target jest polem gry -> zabezpiecznie przed błędem jeśli po zakończeniu gry grać będzie dalej naciskał na pola gry
  if (field.classList.contains('field'))
    if (fieldWithNeighbours[`${field.dataset.coords}`][10] === false) {
      if (!fieldWithNeighbours[`${field.dataset.coords}`][8]) {
        // Zmiana stylu pola jeśli na polu nie występuje mina
        field.style.boxShadow = 'none';
        field.style.backgroundColor = '#ddd';
        // Zmiana wartości ilości pól oznaczonych jako pole z miną
        if (fieldWithNeighbours[`${field.dataset.coords}`][10]) {
          createValueOfFindingMine(1);
        }
        //Zmiana informacji w obiekcie infomacji o danym polu, że pole nie zostało oznaczone jako pole z miną
        fieldWithNeighbours[`${field.dataset.coords}`][10] = false;
        // Zmiana informacji w obiekcie -> informacji o danym polu, że zostało kliknięte przez użytkowanika
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
              ] !== undefined &&
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
            }
          }
        }
      } else {
        // End game

        // Change value "mark field as mine" in object from true to false
        fieldWithNeighbours[field.dataset.coords][10] = false;

        // Info do obiektu czy pole zostało kliknięte przez użytkownika
        fieldWithNeighbours[field.dataset.coords][9] = true;

        // Blocking clickable board
        endOfGame.style.zIndex = '99';

        // Show all mines when clocked in one of them
        mineCoords.forEach(coord => {
          document.querySelector(`[data-coords="${coord}"]`).style.boxShadow =
            'none';
          document.querySelector(
            `[data-coords="${coord}"]`
          ).style.backgroundColor = 'red';
        });

        // Change emoticon
        emoticonSmile.classList.add('hidden');
        emoticonSad.classList.remove('hidden');

        // Stop Timer
      }

      console.log(field);
      console.log(fieldWithNeighbours);
    }
};

// Prawy przycisk myszy na dane pole - oznaczenie pola z miną
board.addEventListener('contextmenu', e => markAsMine(e));

const markAsMine = function (e) {
  e.preventDefault();

  // Sprawdzenie czy e.target jest polem gry -> zabezpiecznie przed błędem jeśli po zakończeniu gry grać będzie dalej naciskał na pola gry, oraz czy pole nie zostało już odsłonięte
  if (
    e.target.classList.contains('field') &&
    fieldWithNeighbours[`${e.target.dataset.coords}`][9] === false
  ) {
    if (fieldWithNeighbours[`${e.target.dataset.coords}`][10] === false) {
      e.target.style.backgroundColor = 'violet';

      // Zmiana wyświetlanej liczby min pozostałych do znalezienia

      createValueOfFindingMine(-1);

      fieldWithNeighbours[`${e.target.dataset.coords}`][10] = true;

      console.log(fieldWithNeighbours);

      console.log(e.target);
    } else {
      e.target.style.backgroundColor = '#ddd';

      createValueOfFindingMine(1);

      fieldWithNeighbours[`${e.target.dataset.coords}`][10] = false;
    }
  }
};

emoticonSmile.addEventListener('click', function () {
  emoticonSmile.classList.add('hidden');
  emoticonSad.classList.remove('hidden');

  // Show all mines when clicked reset button
  mineCoords.forEach(coord => {
    document.querySelector(`[data-coords="${coord}"]`).style.boxShadow = 'none';
    document.querySelector(`[data-coords="${coord}"]`).style.backgroundColor =
      'red';
  });

  // Blocking clickable board
  endOfGame.style.zIndex = '99';
});

emoticonSad.addEventListener('click', function () {
  emoticonSmile.classList.remove('hidden');
  emoticonSad.classList.add('hidden');

  reset();
});

// //

// 1. Komunikat po wygraniu i przegraniu

// 2. reset function która odpali wszystko na początku gry i przy jej zresetowaniu

// 3. Dodać timer który liczy czas od momentu naciśnięcia na pierwsze pole, aż do momentu oznacznia wszystkich min lub do momentu naciśnięcia na minę

// 4. Przycisk do resetowania w miejscu przycisku check - emoticon smile i emoticon sad kiedy gra jest przegrana

// 6. Dorobić grafiki min i znaczników

// 7. Ogarnąć jak dokładnie działa event.preventDefault()

// 8. Stop timer when lost the game
