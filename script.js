let guessList = [];

function submitGuess() {
    let guess = document.getElementById("guessInput").value;
    guessList.push(guess);
    document.getElementById("guessesDisplay").innerHTML = guessList;
}
