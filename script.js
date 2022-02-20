let guesses = 0;
let position = 0;
let tileElements = document.getElementsByClassName("tile");

document.addEventListener("keydown", (event) => {
    position %= 6;
    if ("abcdefghijklmnopqrstuvwxyzåäö".includes(event.key)) {
        if (position < 5) {
            addChar(event.key);
            position++;
        }
    } else if (event.code === "Backspace") {
        if (position > 0) {
            position--;
            delChar();
        }
    } else if (event.code == "Enter") {
        if (guesses < 5 && position === 5) {
            let word = "";
            for (let i = 0; i < 5; i++) {
                word += tileElements[guesses * 5 + i].innerHTML;
            }
            submitWord(word);
        }
    }
    /*console.log(`Guess : ${guesses}, Posistion : ${position}`);*/
});

function addChar(key) {
    tileElements[guesses * 5 + position].innerText = key;
}

function delChar() {
    tileElements[guesses * 5 + position].innerText = "";
}

function submitWord(word) {
    fetch("./words.txt")
        .then((response) => response.text())
        .then(function (textTile) {
            if (textTile.includes(word)) {
                alert("Word in list");
                guesses++;
                position = 0;
            } else {
                alert("Word not found");
            }
        });
}
