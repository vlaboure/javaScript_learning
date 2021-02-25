'use strict';
//const sorting = () => Math.trunc(Math.random() * 20) + 1;
const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};
const uWon = () => {
  displayMessage('YOU WON 😁');
  document.querySelector('body').style.backgroundColor = '#41c94a';
  document.querySelector('.number').textContent = secretNumber;
};
const init = () => {
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = 'black';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  highScore = 0;
  document.querySelector('.guess').value = '';
  displayMessage('Prêt pour un nouveau jeu');
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
};

const check = () => {
  const guess = Number(document.querySelector('.guess').value);
  console.log('clickcheck');
  if (!guess) {
    displayMessage('Entrez un chiffre');
    //document.querySelector('.guess').style.backgroundColor = 'red';
    document.querySelector('.guess').focus();
  } else {
    score--;
    if (guess === secretNumber) {
      if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = score;
      }
      document.querySelector('.number').textContent = secretNumber;
      uWon();
    } else if (guess > secretNumber) {
      displayMessage('Trop haut !!');
    } else {
      displayMessage('Trop bas !!');
    }
    if (score < 1) {
      displayMessage('PERDU!!!');
      document.querySelector('body').style.backgroundColor = 'red';
      document.querySelector('.score').textContent = '0';
    } else document.querySelector('.score').textContent = score;
  }
};

let score;
let sorting;
let highScore;
let secretNumber;
init();

document.querySelector('.again').addEventListener('click',  init());

document.querySelector('.check').addEventListener('click', check);

document.addEventListener('keydown', function(event) {
  switch (event.keyCode){
    case 13:
      check();
      break;
    case 27:
      init();
      break;
  }
});
