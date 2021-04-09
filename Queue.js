/**
 * Queues: FIFO, also a data structure to hold data like the Stack.
 * 
 * In JavaScript, a Queue can be implemented using an array.
 * 
 * Common Queue operations include: enqueue, dequeue, size, isEmpty, etc.
 */

function Queue () {
    collection = [];

    // Helper method that prints out the elements in the queue.
    this.print = function () {
        console.log(collection);
    };

    // Method that pushes the element in front of the queue.
    this.enqueue = function (element) {
        collection.push(element); // items are going at the end of the array
    };

    // Method that takes an item off the queue.
    this.dequeue = function() {
        return collection.shift(); // items are taken off at the beginning of the array
    };

    // Method that returns the front element of the queue without removing it.
    this.front = function () {
        return collection[0];
    };

    // Method that returns the size of the queue.
    this.size = function () {
        return collection.length;
    };

    // Method that checks if the queue is empty.
    this.isEmpty = function () {
        return (collection.length === 0);
    };
}

/** Tests */

var q = new Queue();
q.enqueue('a');
q.enqueue('b');
q.enqueue('c');
q.print(); // returns ['a', 'b', 'c']
q.dequeue();
console.log(q.front()); // returns b
q.print(); // returns ['a', 'b', 'c']