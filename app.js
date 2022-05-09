const add = (x, y) => Math.round(100 * (x + y)) / 100;
const subtract = (x, y) => Math.round(100 * (x - y)) / 100;
const multiply = (x, y) => Math.round(100 * (x * y)) / 100;
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
  let operation = arr.find((value) =>
    /(add|divide|multiply|subtract)/g.test(value)
  );
  if (operation == undefined) {
    result = Number(arr.slice(0).join(''));
  } else {
    let num1 = Number(arr.slice(0, arr.indexOf(operation)).join(''));
    let num2 = Number(arr.slice(arr.indexOf(operation) + 1).join(''));
    result = obj[operation](num1, num2);
  }
  updateDisplay([result]);
  masterArr = [result];
  decimalBtn.disabled = false;
};

const updateDisplay = (arrayOfNum) => {
  display.value = arrayOfNum.join('');
};

const clear = () => {
  updateDisplay([0]);
  masterArr = [];
  currentNum = [];
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
    updateDisplay(currentNum);
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
