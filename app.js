const add = (x, y) => x + y;
const subtract = (x, y) => y - x;
const multiply = (x, y) => x * y;
const divide = (x, y) => y / x;
const operate = (operator, x, y) => operator(x, y);
const clear = () => {
  updateDisplay([0]);
  arr = [];
  currentNum = [];
};

let displayValue;
const display = document.querySelector('.calc-display');
const numberBtns = document.querySelectorAll('.num-btn');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear-btn');
const equalBtn = document.querySelector('.equal-btn');
const obj = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
};

let arr = [];
let currentNum = [];
let currentOperator = '';
let prevOperator = currentOperator;
let currentResult;

const updateDisplay = (arr) => {
  display.value = arr.join('');
  displayValue = Number(arr.join(''));
};

clearBtn.addEventListener('click', clear);

numberBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let numClicked = parseInt(btn.dataset.num);
    currentNum.push(numClicked);
    updateDisplay(currentNum);
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    currentNum = Number(currentNum.join(''));
    arr.push(currentNum);
    currentOperator = operator.dataset.type;
    currentResult =
      arr.length > 1
        ? operate(obj[prevOperator], currentNum, arr[arr.length - 2])
        : currentNum;
    updateDisplay([currentResult]);
    currentNum = [];
    prevOperator = currentOperator;
    arr = [];
    arr.push(currentResult);
  });
});

equalBtn.addEventListener('click', (e) => {
  currentResult = operate(obj[currentOperator], ...currentNum, ...arr);
  updateDisplay([currentResult]);
});
