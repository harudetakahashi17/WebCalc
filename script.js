//========================================
// Writer: Harude
//========================================

// Get Objects
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalSign = document.querySelector('.equal-sign');
const percent = document.querySelector('.percent');
const clr = document.querySelector('.all-clear');
const superops = document.querySelector('.super');
const calcScreen = document.querySelector('.calculator-screen');
const calcScreenInput = document.querySelector('.calculator-screen-input');

// Global variables
let inputs = [];
let nums = [];
let ops = [];
let currNum = '0';
let prevInput = '';

// Update screen function
const updateScreen = (number) => {
    calcScreen.value = number;
}

const updateScreenInput = (input) => {
    calcScreenInput.value = '';
    let calcStr = '';
    for (let i = 0; i < input.length; i++) {
        if (i + 1 == input.length) {
            calcStr += input[i];
        } else {
            calcStr += input[i] + ' ';
        }
    }
    calcScreenInput.value = calcStr;
}

const clearScreenInput = () => {
    calcScreenInput.value = '';
}

const allClear = () => {
    while (nums.length > 0) {
        nums.pop();
    }
    while (ops.length > 0) {
        ops.pop();
    }
    while (inputs.length > 0) {
        inputs.pop();
    }
}

// Get event on all button numbers
numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        let val = event.target.value;
        if (inputs[inputs.length - 1] === '=') {
            clearScreenInput();
            allClear();
        }
        if (currNum === '0') {
            currNum = val;
        } else {
            currNum += val;
        }
        updateScreen(currNum);
        prevInput = val;
    })
})

// Get event on all button operators
operators.forEach((opr) => {
    opr.addEventListener('click', (event) => {
        updateScreen(0);
        inputs.push(currNum);
        currNum = '0';
        let val = event.target.value;
        if (inputs.length > 0) {
            if (prevInput != '/' && prevInput != '*' && prevInput != '-' && prevInput != '+') {
                inputs.push(val);
                updateScreenInput(inputs);
            } else if (prevInput != val) {
                inputs.pop();
                inputs.pop();
                inputs.push(val);
            }
            else {
                inputs.pop();
            }
        }
        prevInput = val;
    })
})

// Get Event on equal sign
equalSign.addEventListener('click', () => {
    if (prevInput === '=') {
        clearScreenInput();
        allClear();
    }
    inputs.push(currNum);
    inputs.push('=');
    updateScreenInput(inputs);
    currNum = '0';

    // update with result
    updateScreen(0);

    prevInput = '=';
})

// Get event on AC button
clr.addEventListener('click', () => {
    allClear();
    clearScreenInput();
    updateScreen(0);
})