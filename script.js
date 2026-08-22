let currentNumber = "";
let previousNumber = "";
let operator = "";

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

function appendNumber(number) {
    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "0" && number !== ".") {
        currentNumber = "";
    }

    currentNumber += number;
    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }

    operator = selectedOperator;
    previousNumber = currentNumber;
    currentNumber = "";

    updateDisplay();
}

function calculate() {
    if (previousNumber === "" || currentNumber === "" || operator === "") {
        return;
    }

    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    let result;

    switch (operator) {
        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":
            if (current === 0) {
                currentNumber = "Error";
                previousNumber = "";
                operator = "";
                updateDisplay();
                return;
            }

            result = previous / current;
            break;

        case "%":
            result = previous % current;
            break;
    }

    currentNumber = String(
        Math.round(result * 100000000) / 100000000
    );

    previousNumber = "";
    operator = "";

    updateDisplay();
}

function clearDisplay() {
    currentNumber = "";
    previousNumber = "";
    operator = "";

    updateDisplay();
}

function deleteNumber() {
    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}

function updateDisplay() {
    currentDisplay.textContent = currentNumber || "0";

    if (previousNumber && operator) {
        previousDisplay.textContent =
            `${previousNumber} ${getOperatorSymbol(operator)}`;
    } else {
        previousDisplay.textContent = "";
    }
}

function getOperatorSymbol(operator) {
    switch (operator) {
        case "*":
            return "×";
        case "/":
            return "÷";
        case "-":
            return "−";
        default:
            return operator;
    }
}
