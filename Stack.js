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

/**
 * Custom-created stack.
 */
 var Stack = function() {
    this.count = 0; // keep track of how many items are there in the stack
    this.storage = {};

    // Adds a value onto the top of the stack.
    this.push = function(value) {
        this.storage[this.count] = value;
        this.count++;
    }

    // Removes and returns the value on top of the stack.
    this.pop = function() {
        // If the stack is empty.
        if (this.count === 0) {
            return undefined;
        }

        this.count--; // decrement the count
        // Retrieve the top item in the stack, note here we 
        // don't need to do count - 1 as it has already been decremented!
        var result = this.storage[this.count];
        delete this.storage[this.count]; // remove the top item
        return result;
    }

    // Returns the number of stack elements.
    this.size = function() {
        return this.count; 
    }

    // Returns the value on top of the stack.
    this.peek = function(value) {
        return this.storage[this.count - 1];
    }
}

var myStack = new Stack();
myStack.push(1);
myStack.push(2);
console.log(myStack.peek()); // return 2
console.log(myStack.pop()); // return 2
console.log(myStack.peek()); // return 1
// You can also add some other data types.
myStack.push("helloimlixin");
console.log(myStack.size());
console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.peek());