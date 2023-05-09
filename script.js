'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

const account1 = {
  owner: 'Rohit Deore',
  movements: [4300, 9000, 7900, 5090, 9760],
  interestRate: 1,
  pin: 1111,
};

const account2 = {
  owner: 'Vaishnav Bhosale',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 2222,
};

const account3 = {
  owner: 'Vinod Sonawane',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 3333,
};
4444;
const account4 = {
  owner: 'Arun Suryavanshi',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 4444,
};

const account5 = {
  owner: 'Sidhart Kasar',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

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

//Start bankist app
let calcDisplayBalance;
let calcDisplaySummary;

const displayMovements = function (movements) {
  calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce(function (acc, cur) {
      return acc + cur;
    }, 0);
    labelBalance.textContent = `${acc.balance} €`;
  };
  //calcDisplayBalance(account1.movements);

  calcDisplaySummary = function (acc) {
    const inComes = acc.movements
      .filter(mov => mov > 0)
      .reduce((curr, mov) => curr + mov, 0);
    // console.log(inComes);
    labelSumIn.textContent = `${inComes}€`;

    const outComes = acc.movements
      .filter(mov => mov < 0)
      .reduce((curr, mov) => curr + mov, 0);
    // console.log(outComes);
    labelSumOut.textContent = `${Math.abs(outComes)}€`;

    const totalInterest = acc.movements
      .filter(mov => mov > 0)
      .map(deposit => (deposit * acc.interestRate) / 100)
      .filter((interest, i, arr) => {
        //  console.log(arr);
        return interest >= 1;
      })
      .reduce((acc, interest) => acc + interest, 0);
    labelSumInterest.textContent = `${totalInterest}€`;
  };

  // console.log(containerMovements.innerHTML);
  containerMovements.innerHTML = '';
  // console.log(`----------
  // ${containerMovements.innerHTML}
  // -------------`);
  movements.forEach(function (mov, index) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = ` 
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type} </div>
      <div class="movements__value">${mov}€</div>
    </div> `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

const updateUI = function (currentAcc) {
  //Display Movements
  displayMovements(currentAcc.movements);
  //Display Balance
  calcDisplayBalance(currentAcc);
  //Display summary
  calcDisplaySummary(currentAcc);
};

createUserNames(accounts);
//console.log(accounts);
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(`LOGIN`);
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('Login---');
    //Display UI message
    labelWelcome.textContent = `Welcome back,${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // console.log(labelWelcome);
    updateUI(currentAccount);
    inputLoginUsername.value = inputLoginPin.value = '';
    // inputLoginPin.blur();
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number.parseInt(inputTransferAmount.value);
  // console.log(amount);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  console.log(receiverAcc, amount);
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    // console.log('Transfer valid');
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    //Add mov or amount
    currentAccount.movements.push(amount);
    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('delete valid');
  //const closePin = Number(inputClosePin.value);
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log('vld');
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );

    // console.log(index);
    //delete account
    accounts.splice(index, 1);
    //hide UI
    containerApp.style.opacity = 0;
    inputCloseUsername = inputClosePin = '';
  }
});
