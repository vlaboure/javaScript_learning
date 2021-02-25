'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount;
let sorted = false;
// on crée un user name avec la 1er lettre de prénom nom
const createUserName = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ') // création tableau ['nom','prénom']
      .map(name => name[0]) //récup de n de nom et p de prénom
      .join(''); //création string 'np'
  });
};
// appel de la fonction
createUserName(accounts);

const displayMvt = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  //.reverse ou .sort les 2 fonctionnent
  const movs = sort ? movements.slice().reverse() : movements;
  // .sort((a , b) => a - b): movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;
    // afterbegin permet d'afficher du dernier au premier
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const initAccount = function (acc) {
  displayMvt(acc.movements, false);
  calcBalance(acc);
  calcDisplaySummary(acc);
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputLoanAmount.value = '';
};

const calcDisplaySummary = function (acc) {
  //acc = account
  // filtre des > 0 et addition
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((prev, cur) => prev + cur, 0);
  labelSumIn.textContent = `${income}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((prev, cur) => prev + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(depot => (depot * acc.interestRate) / 100)
    .filter((val, i, arr) => {
      return val >= 1;
    })
    .reduce((prev, cur) => prev + cur, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const calcBalance = function (acc) {
  // on crée une propriété balance dans l'objet account
  acc.balance = acc.movements.reduce((prev, cur) => prev + cur, 0);
  labelBalance.textContent = `${acc.balance}`;
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // comme c'est un form on doit empêcher le traitement par defaut
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  // currentAccount? evite le undefined
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Bienvenue Mr ${currentAccount.owner.split(
      ' '
    )}`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = '';
    inputLoginPin.blur();
    inputLoginPin.value = '';
    initAccount(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transAccount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  let credDeb;
  const transfert = Number(inputTransferAmount.value);
  if (transfert > 0 && transAccount) {
    if (
      transAccount?.userName !== currentAccount.userName &&
      currentAccount.balance >= transfert
    ) {
      transAccount.movements.push(transfert);
      currentAccount.movements.push(-transfert);
    } else {
      currentAccount.movements.push(transfert);
    }
    initAccount(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(val => val >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    initAccount(currentAccount);
  }
});

btnSort.addEventListener('click', function () {
  displayMvt(currentAccount.movements, !sorted);
  sorted = !sorted;
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    accounts.splice(index, 1);
    console.log(accounts);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
    inputCloseUsername = inputClosePin = '';
  }
});
// flat
const overalBalance = accounts
  .map(acc => acc.movements)//les tableaux sont insérés dans un tableau de tableaux
  .flat()// le données des tabeaux sont ensuite placées dans un tableau
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//on ajoute un event pour créer un tableau d'après les mouvements du dom
labelBalance.addEventListener('click', function(){
  const movt = Array.from(document.querySelectorAll('.movements__value'),
  el => Number(el.textContent.replace('€',''))).reduce((prev, cur) => prev + cur, 0);
  console.log(movt);
})