/**
 * Stacks: LIFO
 * Functions: push, pop, peek, length/size
 * JS array has all the function we need for a stack implementation!
 * This code snippet is dedicated to implement a palindrome checker.
 */

var letters = []; // this is our stack
var word = "hello"
var rword = ""; // reverse of the word

// Put letters of the word onto the letter stack.
for (var i = 0; i < word.length; i++) {
    letters.push(word[i]);
}

// Pop off the stack in reverse order to construct
// the reverse word variable rword.
for (var i = 0; i < word.length; i++) {
    rword += letters.pop();
}

if (rword === word) {
    console.log(word + " is a palindrome.");
} else {
    console.log(word + " is not a palindrome.");
}

