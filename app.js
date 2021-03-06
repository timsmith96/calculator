const add = (x, y) => Math.round(100 * (x + y)) / 100;
const subtract = (x, y) => Math.round(100 * (x - y)) / 100;
const multiply = (x = 1, y) => Math.round(100 * (x * y)) / 100;
const divide = (x, y) => {
  return y === 0 ? 'PROBLEMO!' : Math.round(100 * (x / y)) / 100;
};
const operate = (operator, x, y) => operator(x, y);

let displayValue;
const display = document.querySelector('.calc-display');
const numberBtns = document.querySelectorAll('.num-btn');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear-btn');
const equalBtn = document.querySelector('.equal-btn');
const decimalBtn = document.querySelector('.decimal-btn');
const deleteBtn = document.querySelector('.delete-btn');
let numsArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
numsArr = numsArr.map(String);
let operatorsArr = ['+', '-', '*', 'x', '/'];

const obj = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
};

let masterArr = [];
let currentNum = [];
let currentOperator = '';
let lastPressed = '';

const calculateResult = (arr) => {
  let result;
  let num1;
  let num2;
  let operation = arr.find((value) =>
    /(add|divide|multiply|subtract)/g.test(value)
  );
  if (operation == undefined) {
    result = Number(arr.slice(0).join(''));
  } else {
    if (!(arr.indexOf(operation) === arr.length - 1)) {
      num1 = Number(arr.slice(0, arr.indexOf(operation)).join(''));
      num2 = Number(arr.slice(arr.indexOf(operation) + 1).join(''));
      result = obj[operation](num1, num2);
    } else {
      result = arr[0];
    }
  }
  updateDisplay([result]);
  masterArr = [result];
  decimalBtn.disabled = false;
};

const updateDisplay = (arrayOfNum) => {
  arrayOfNum = arrayOfNum.map((x) => {
    if (x === 'multiply') return ' x ';
    if (x === 'add') return ' + ';
    if (x === 'divide') return ' ÷ ';
    if (x === 'subtract') return ' - ';
    return x;
  });
  display.value = arrayOfNum.join('');
};

const deleteSingle = () => {
  masterArr.pop();
  if (masterArr.length === 0) {
    masterArr = [0];
  }
  updateDisplay(masterArr);
};

const clear = () => {
  masterArr = [];
  currentNum = [];
  updateDisplay([0]);
  decimalBtn.disabled = false;
};

clearBtn.addEventListener('click', clear);

numberBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (lastPressed === 'equals') {
      masterArr = [];
      currentNum = [];
    }
    if (masterArr.includes('.')) {
      decimalBtn.disabled = true;
    }
    let numClicked = btn.dataset.num;
    masterArr.push(numClicked);
    currentNum.push(numClicked);
    updateDisplay(masterArr);
    lastPressed = 1;
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    calculateResult(masterArr);
    currentNum = [];
    let clickedOperator = operator.dataset.type;
    masterArr.push(clickedOperator);
    lastPressed = 1;
    updateDisplay(masterArr);
  });
});

equalBtn.addEventListener('click', (e) => {
  calculateResult(masterArr);
  currentNum = [];
  lastPressed = 'equals';
});

decimalBtn.addEventListener('click', (e) => {
  if (masterArr.includes('.')) {
    decimalBtn.disabled = true;
  }
});

deleteBtn.addEventListener('click', deleteSingle);

document.addEventListener('keypress', (e) => {
  e.preventDefault();
  let numClicked = e.key;
  if (numsArr.includes(numClicked)) {
    if (masterArr.includes('.') && e.key === '.') {
      return false;
    }
    if (lastPressed === 'equals') {
      masterArr = [];
      currentNum = [];
    }
    if (masterArr.includes('.')) {
      decimalBtn.disabled = true;
    }

    masterArr.push(numClicked);
    currentNum.push(numClicked);
    updateDisplay(masterArr);
    lastPressed = 1;
  } else if (operatorsArr.includes(numClicked)) {
    if (numClicked === '-') clickedOperator = 'subtract';
    if (numClicked === 'x' || numClicked === '*') clickedOperator = 'multiply';
    if (numClicked === '/') clickedOperator = 'divide';
    if (numClicked === '+') clickedOperator = 'add';
    calculateResult(masterArr);
    currentNum = [];
    masterArr.push(clickedOperator);
    lastPressed = 1;
    updateDisplay(masterArr);
  } else if (numClicked === 'Enter' || numClicked === '=') {
    calculateResult(masterArr);
    currentNum = [];
    lastPressed = 'equals';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace' || e.key === 'Delete') {
    console.log('found the bug');
    deleteSingle();
  }
});
