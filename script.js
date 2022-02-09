let guessList = [];

function submitGuess() {
    guessList.push(document.getElementById("guessInput").value);
}

async function filterWords() {
    let data = await fetchFile("words.txt");
    data = data.split("\n");
    let number;
    for (i = 0; i < data.length; i++) {
        if (data[i] != 5) {
            number++;
        }
    }
    console.log(number);
}

async function fetchFile(filename) {
    const response = await fetch(filename);
    return response.text();
}
