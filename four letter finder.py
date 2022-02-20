with open("words.txt", "r") as f:
    letters = dict()
    words = f.read().split("\n")
    n_letter_word = []
    for word in words:
        letters = dict()
        for char in word:
            letters[char] = 0
        for char in word:
            letters[char] += 1
        if any([occurence==4 for occurence in letters.values()]):
            n_letter_word.append(word)
    print(n_letter_word)
    
