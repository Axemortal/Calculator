const currentDisplayDOM = document.getElementById("display--current");
let currentDisplay = "0";
const prevDisplayDOM = document.getElementById("display--previous");
let prevDisplay = null;
const buttonArr = document.getElementsByClassName("number");
const operatorArr = document.getElementsByClassName("operator");
const clearAllBtn = document.getElementById("button--clear-all");
const deleteBtn = document.getElementById("button--delete");
const dotBtn = document.getElementById("button--dot");
const equalsBtn = document.getElementById("button--equals");
let setNewValue = false;

//Edits current display when a number is pressed
for (let i = 0; i < buttonArr.length; i++) {
  const numberButton = buttonArr[i];
  numberButton.addEventListener("click", () => {
    if (setNewValue || currentDisplay === "0") {
      setNewValue = false;
      currentDisplay = numberButton.innerText;
    } else {
      currentDisplay += numberButton.innerText;
    }
    currentDisplayDOM.innerText = currentDisplay;
  });
}

//Adds the ability to use operators
for (let i = 0; i < operatorArr.length; i++) {
  const operatorButton = operatorArr[i];
  operatorButton.addEventListener("click", () => {
    const operator = operatorButton.innerText;
    currentDisplay = eval(currentDisplay);
    if (!prevDisplay) {
      prevDisplay = `${currentDisplay} ${operator}`;
      prevDisplayDOM.innerText = prevDisplay;
    } else {
      replaceOperators();
      prevDisplay = eval(prevDisplay + currentDisplay) + " " + operator;
      prevDisplayDOM.innerText = prevDisplay;
    }
    currentDisplay = "0";
  });
}

//Clears everything
clearAllBtn.addEventListener("click", () => {
  currentDisplay = "0";
  currentDisplayDOM.innerText = currentDisplay;
  prevDisplay = null;
  prevDisplayDOM.innerText = prevDisplay;
});

//Add the function to delete the last number
deleteBtn.addEventListener("click", () => {
  setNewValue = false;
  if (currentDisplay !== "0") {
    if (currentDisplay.length === 1) {
      currentDisplay = "0";
    } else {
      currentDisplay = currentDisplay.slice(0, -1);
    }
  } else if (prevDisplay) {
    currentDisplay = prevDisplay.slice(0, -1);
    currentDisplay = currentDisplay.trim();
    prevDisplay = null;
    prevDisplayDOM.innerText = prevDisplay;
  }
  currentDisplayDOM.innerText = currentDisplay;
});

dotBtn.addEventListener("click", () => {
  if (setNewValue) {
    setNewValue = false;
    currentDisplay = "0.";
  } else if (
    currentDisplay === "0" ||
    (currentDisplay && currentDisplay.slice(-1) !== ".")
  ) {
    currentDisplay += ".";
  }
  currentDisplayDOM.innerText = currentDisplay;
});

equalsBtn.addEventListener("click", () => {
  if (prevDisplay) {
    replaceOperators();
    currentDisplay = eval(prevDisplay + currentDisplay);
    currentDisplay = currentDisplay.toString();
    currentDisplayDOM.innerText = currentDisplay;
    setNewValue = true;
    prevDisplay = null;
    prevDisplayDOM.innerText = prevDisplay;
  }
});

function replaceOperators() {
  prevDisplay = prevDisplay.replace("x", "*");
  prevDisplay = prevDisplay.replace("÷", "/");
}

/* 
1. Check functionality of all the buttons and the edge cases
3. Restyle CSS
*/
