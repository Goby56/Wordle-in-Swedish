async function getWords(type) {
    const response = await fetch(`./${type}-words.txt`);
    const words = (await response.text()).split("\n");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace("\r", "");
    }
    return words;
}

// Run as soon as the page loads in
document.addEventListener("DOMContentLoaded", reset());

let randomWordID = randomNumberGenerator(0, 4642); // Hard coded number of available words
let guesses = [];
let numberOfGuesses = 0;
let position = 0;
let tileElements = document.getElementsByClassName("tile");
let keyeElements = document.getElementsByClassName("key");
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
    var validWords = await getWords("valid");
    var correctWord = validWords[randomWordID];
    document.getElementById("display-correct-word").innerHTML = correctWord;
}

document.addEventListener("keydown", async (event) => {
    position %= 6;

    for (let element of keyeElements) {
        if (element.innerHTML === event.key) {
            element.style.animation = "depress 100ms";
        }
    }

    if ("abcdefghijklmnopqrstuvwxyzåäö".includes(event.key)) {
        if (position < 5) {
            tileElements[numberOfGuesses * 5 + position].innerText = event.key;
            position++;
        }
    } else if (event.code === "Backspace") {
        if (position > 0) {
            position--;
            tileElements[numberOfGuesses * 5 + position].innerText = "";
        }
    } else if (event.code == "Enter") {
        if (numberOfGuesses < 6 && position === 5) {
            let guess = "";
            for (let i = 0; i < 5; i++) {
                guess += tileElements[numberOfGuesses * 5 + i].innerHTML;
            }
            let decoyWords = await getWords("decoy");
            let validWords = await getWords("valid");
            if (decoyWords.includes(guess)) {
                submitGuess(guess, validWords[randomWordID]);
            }
        }
    }
});

async function submitGuess(guess, correctWord) {
    let charsOfCorrectWord = {};

    console.log(correctWord);

    let revealInstructions = ["a", "a", "a", "a", "a"];

    for (let i = 0; i < 15; i++) {
        if (i / 5 < 1) {
            if (typeof charsOfCorrectWord[correctWord[i]] === "undefined") {
                charsOfCorrectWord[correctWord[i]] = 0;
            }
            charsOfCorrectWord[correctWord[i]]++;
        } else if (i / 5 < 2) {
            if (guess[i % 5] === correctWord[i % 5]) {
                revealInstructions[i % 5] = "c";
                charsOfCorrectWord[guess[i % 5]]--;
            }
        } else {
            if (correctWord.includes(guess[i % 5]) && charsOfCorrectWord[guess[i % 5]] > 0) {
                revealInstructions[i % 5] = "p";
                charsOfCorrectWord[guess[i % 5]]--;
            }
        }
    }

    console.log(revealInstructions);

    revealResult(revealInstructions, numberOfGuesses);

    numberOfGuesses++;
    position = 0;
    guesses.push(guess);
}

function revealResult(instuctions, nthGuess) {
    for (let i = 0; i < 5; i++) {
        if (instuctions[i] === "c") {
            setTimeout(function () {
                revealLetter(nthGuess, i, correctColor);
            }, i * 250);
        } else if (instuctions[i] === "p") {
            setTimeout(function () {
                revealLetter(nthGuess, i, presentColor);
            }, i * 250);
        } else {
            setTimeout(function () {
                revealLetter(nthGuess, i, absentColor);
            }, i * 250);
        }
    }
}

function revealLetter(nthGuess, n, color) {
    tileElements[nthGuess * 5 + n].style.backgroundColor = color;
    //tileElements[nthGuess * 5 + n].style.transform = "rotateX(180deg)";
    tileElements[nthGuess * 5 + n].style.animation = "flip 500ms";
}

function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
