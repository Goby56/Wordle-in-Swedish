# -*- coding: UTF-8 -*-

def is_accepted(word):
    for char in word:
        if char not in "abcdefghijklmnopqrstuvwxyzåäö":
            return False
    return True

with open("svenska-ord.txt", "r", encoding="utf-8") as f:
    words = f.read().split("\n")

filtered_words = []
for word in words:
    word = word.strip().lower()
    if " " in word:
        continue
    if len(word) == 5:
        if is_accepted(word):
            filtered_words.append(word+"\n")

with open("valid-words.txt", "w", encoding="utf-8") as f:
    f.writelines(filtered_words)