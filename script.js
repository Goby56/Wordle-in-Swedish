async function getValidWords() {
    const response = await fetch("./words.txt");
    const validWords = (await response.text()).split("\n");
    for (let i = 0; i < validWords.length; i++) {
        validWords[i] = validWords[i].replace("\r", "");
    }
    return validWords;
}

// Run as soon as the page loads in
document.addEventListener("DOMContentLoaded", reset());

let randomWordID = randomNumberGenerator(0, 8190); // Hard coded number of available words
let guesses = [];
let numberOfGuesses = 0;
let position = 0;
let tileElements = document.getElementsByClassName("tile");
let gameRunning = true;

bgColor = "#121213";
borderColor = "#818384";
absentColor = "#3a3a3c";
textColor = "#ffffff";
presentColor = "#b59f3b";
correctColor = "#538d4e";

async function reset() {
    guesses = [];
    numberOfGuesses = 0;
    position = 0;

    for (let tile of tileElements) {
        tile.innerText = "";
        tile.style.backgroundColor = bgColor;
    }
}

async function showCorrectWord() {
    var validWords = await getValidWords();
    var correctWord = validWords[randomWordID];
    document.getElementById("display-correct-word").innerHTML = correctWord;
}

document.addEventListener("keydown", async (event) => {
    position %= 6;
    if ("abcdefghijklmnopqrstuvwxyzåäö".includes(event.key)) {
        if (position < 5) {
            addChar(event.key);
        }
    } else if (event.code === "Backspace") {
        if (position > 0) {
            delChar();
        }
    } else if (event.code == "Enter") {
        if (numberOfGuesses < 6 && position === 5) {
            let guess = "";
            for (let i = 0; i < 5; i++) {
                guess += tileElements[numberOfGuesses * 5 + i].innerHTML;
            }
            let validWords = await getValidWords();
            if (validWords.includes(guess)) {
                submitGuess(guess, validWords[randomWordID]);
            }
        }
    }
});

function addChar(key) {
    tileElements[numberOfGuesses * 5 + position].innerText = key;
    position++;
}

function delChar() {
    position--;
    tileElements[numberOfGuesses * 5 + position].innerText = "";
}

async function submitGuess(guess, correctWord) {
    for (let i = 0; i < 5; i++) {
        if (guess[i] === correctWord[i]) {
            tileElements[numberOfGuesses * 5 + i].style.backgroundColor = correctColor;
        } else if (correctWord.includes(guess[i])) {
            tileElements[numberOfGuesses * 5 + i].style.backgroundColor = presentColor;
        } else {
            tileElements[numberOfGuesses * 5 + i].style.backgroundColor = absentColor;
        }
    }
    numberOfGuesses++;
    position = 0;
    guesses.push(guess);
}

function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
