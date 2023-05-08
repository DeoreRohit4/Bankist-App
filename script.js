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

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('delete valid');
  //const closePin = Number(inputClosePin.value);
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
   // console.log('vld');
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
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
/*🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽
//-----Simple Array Methods-----

let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

//⏩1.SLICE method  ------------does not make changes in original array

//Returns a copy of a section of an array. For both start and end, a negative index can be used to indicate an offset from the end of the array. For example, -2 refers to the second to last element of the array.

// @param start
// The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0.

//@param end
// The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array.

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice()); //------using slice method
console.log([...arr]); //---------using spread operator

//⏩2.SPLICE Method ------------makes changes in original array

//Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

// @param start — The zero-based location in the array from which to start removing elements.

// @param deleteCount — The number of elements to remove.

// @returns — An array containing the elements that were

console.log(`Original Array:------------ ${arr}`);
console.log(arr.splice(4));
arr.splice(-1);
console.log(`Array after Splice method: ${arr}`);
console.log(arr.splice(1, 4));
console.log(`Array after Splice method: ${arr}`);

//⏩3.REVERSE Method-------
// Reverses the elements in an array in place. This method mutates the array and returns a reference to the same array.
arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
const arr2 = ['f', 'e', 'd', 'c', 'b', 'a'];
console.log(arr2.reverse());

//⏩4.CONCAT Method----

//-->concat(...items: ConcatArray<string>[]): string[]<--
// Additional arrays and/or items to add to the end of the array.
// Combines two or more arrays. This method returns a new array without modifying any existing arrays.

const letter = arr.concat(arr2);
console.log(letter);
console.log([...arr, ...arr2]);

//⏩5.JOIN Method
//--> (method) Array<string>.join(separator?: string | undefined): string<--
// Adds all the elements of an array into a string, separated by the specified separator string.

// @param separator — A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
console.log(letter.join('-'));

//------------------------------------------------------------------------------------------
const arr1 = [23, 11, 64];

//⏩6.AT Method

console.log(arr1[0]); //--our traditional way to get element at that particular index
console.log(arr1.at(0)); //--now using "at"  method

//----------getting the last element form array
console.log(arr1[arr1.length - 1]); //--traditional way
console.log(arr1.slice(-1)[0]); //--simpler one
console.log(arr1.at(-1)); //--Simplest one

//AT method also works om  strings
const str = 'RohitD';
console.log(str.at(0));
console.log(str.at(-1));*/

/*🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽
//Looping arrays: for each

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements)
for (const [index, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

//The break and continue statement does not work in the for each loop

console.log(`----For Each Method----`);
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
  // console.log(array);
});
*/
//🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽
//For Each with maps and sets
/*
//For map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}:${value}`);
});

//for Set
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'CON', 'INU']);
currenciesUnique.forEach(function (value, key, set) {
  console.log(`${key}=>${value}`);
});
*/

//🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽
//--Data Transformation Methods---
//=======> 1.Map Method <========
/*
number, array: number[]) => number, thisArg?: any): number[]
Calls a defined callback function on each element of an array, and returns an array that contains the results.

@param callbackfn — A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.

@param thisArg — An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUds = 1.1;
const movementsUsd = movements.map(function (mov) {
  return mov * eurToUds;
});

// const movementsUsd = movements.map(mov => mov * eurToUds); //arrow function
console.log(`${movements}
 ${movementsUsd}`);

//same above  map method implementation using for of loop

// const movementsUsdfor = [];
// for (const mov of movements) {
//   movementsUsdfor.push(mov * eurToUds);
// }
// console.log(movementsUsdfor);
*/

//🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽
/*----The Filter Method----
console.log(`------The Filter Method------`);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(mov => mov > 0);

console.log(`${movements}
${deposits}`);
// console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(`${withdrawals}`); */

//🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽

// //-------The Reduce Method--------
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // console.log(movements);
// // const balance = movements.reduce(function (acc, cur, i, arr) {
// //   console.log(`Iteration no ${i} :${acc}`);
// //   return acc + cur;
// // }, 0);
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// //MAximum value
// const maxValue = movements.reduce(
//   (acc, cur) => (acc > cur ? acc : cur),
//   movements[0]
// );
// console.log(maxValue);

// //Minimum value
// const minValue = movements.reduce(
//   (acc, cur) => (acc < cur ? acc : cur),
//   movements[0]
// );
// console.log(minValue);

//🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽
// //The Magic Chaining Methods---------
// const eurToUds = 1.1;
// const mov1 = movements
//   .filter(mov => mov > 0)
//   .map((mov, i, arr) => {
//     //  console.log(arr);
//     return mov * eurToUds;
//   })
//   .reduce((acc, mov) => acc + mov, 0);
// //console.log(mov1);

//🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽🗽
// //Find Method---------
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);

// console.log(accounts);
// const account = accounts.find(acc => acc.userName === 'jd');
// console.log(account);

// for (let account of accounts) {
//   if (account.userName === 'jd') {
//     console.log(account);
//   }
// }
