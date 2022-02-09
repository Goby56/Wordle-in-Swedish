with open("words.txt", "r") as f:
    words = f.read().split("\n")
    for i in range(len(words)):
        if words[i] != 5:
            words.pop(i)
    print(words)