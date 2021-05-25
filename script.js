var started = false;

//Selecting Elements

var numberButtons = document.querySelectorAll(".number");

var operatorButtons = document.querySelectorAll(".operator");

var prevTakenValue = document.querySelector(".prevValue");

var currentTakenValue = document.querySelector(".currentValue");

var clearButton = document.querySelector(".clear");

var deleteButton = document.querySelector(".backspace");

var resultButton = document.querySelector(".result");

if (started === false) {
  var currentOperand = "";
  var prevOperand = "";
  var operator = undefined;
  document.querySelector(".container").addEventListener("click", function() {
    started = true;
  });
}


//numberButtons

for (var i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", storeOperand);
}

function storeOperand() {
  var operandValue = this.innerText;
  if (operandValue === "." && currentOperand.includes(".") === true) {
    operandValue = "";
  }
  currentOperand = currentOperand + operandValue.toString();
  displayOutput();
}

//operatorButtons

for (var j = 0; j < operatorButtons.length; j++) {
  operatorButtons[j].addEventListener("click", storeOperator);
}

function storeOperator() {
  var operatorValue = this.innerText;
  operator = operatorValue;
  if (currentOperand === "") {
    operatorValue = "";
  } else if (prevOperand !== "") {
    computation(operator);
    operator = undefined;
  } else {
    currentOperand = currentOperand + " " + operatorValue.toString();
    prevOperand = currentOperand;
    currentOperand = "";
  }
  displayOutput();
}




//Computation
function computation(operatorValue) {
  var calculatedValue = undefined;
  const prevNumber = parseFloat(prevOperand);
  const currentNumber = parseFloat(currentOperand);
  switch (operatorValue) {
    case "+":
      calculatedValue = prevNumber + currentNumber;
      break;
    case "-":
      calculatedValue = prevNumber - currentNumber;
      break;
    case "×":
      calculatedValue = prevNumber * currentNumber;
      break;
    case "÷":
      calculatedValue = prevNumber / currentNumber;
      break;
    default:
      calculatedValue = "";
  }
  currentOperand = calculatedValue;
  prevOperand = "";
}


//clear

clearButton.addEventListener("click", clearData);

function clearData() {
  currentOperand = "";
  prevOperand = "";
  displayOutput();
}

//backspace

deleteButton.addEventListener("click", deleteData);

function deleteData() {
  currentOperand = currentOperand.toString().slice(0, -1);
  displayOutput();
}

//resultButton

resultButton.addEventListener("click", showResult);

function showResult() {
  computation(operator);
  displayOutput();
}


//display

function displayOutput() {
  prevTakenValue.innerText = prevOperand;
  currentTakenValue.innerText = currentOperand;
}