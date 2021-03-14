let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  // check if value is number or symbol
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  //refresh the calculator screen
  rerender(); 
}

function handleNumber(value) {
  //making input visible on screen
  if (buffer === "0") {
    buffer = value;
  } else {
    //buffer is a string so its just for showing input
    buffer += value;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    //performing calculations
    flushOperation(intBuffer);
  }

  previousOperator = value;
  //resetting buffer after every operation
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(value);
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  document.querySelector(".calc-buttons").addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
  });
}

init();
