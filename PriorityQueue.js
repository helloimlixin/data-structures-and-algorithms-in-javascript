/**
 * PriorityQueue: you not only pass the elements into the queue, you also pass 
 * the priority of the elements to the queue. If all the priorities are the
 * same number, then the PriorityQueue will just behave like a normal queue.
 * When you pass elements with different priorities, the elements with higher
 * priorities will be placed in the beginning of the queue.
 */

function PriorityQueue() {
    var collection = [];

    // Method that prints the elements of the queue.
    this.printCollection = function() {
        (console.log(collection));
    };

    // Method that performs the enqueue function for the priority queue.
    this.enqueue = function(element) {
        if (this.isEmpty()) {
            collection.push(element);
        } else {
            var added = false;
            for (var i = 0; i < collection.length; i++) {
                // Checking priorities.
                if (element[1] < collection[i][1]) {
                    // Insert the element (a 2-element array) to the collection 
                    // array using the splice function (remove 0 elements before
                    // index i, and insert element).
                    collection.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                collection.push(element);
            }
        }
    };

    // Method that performs the dequeue operation.
    this.dequeue = function() {
        var value = collection.shift();
        return value[0]; // you can also return the entire element with the 
                         // priority: value
    };

    // Method that returns the front element of the priority queue.
    this.front = function() {
        return collection[0];
    };

    // Method that returns the size of the priority queue.
    this.size = function() {
        return collection.length;
    };

    // Method that checks if the priority queue is empty.
    this.isEmpty = function() {
        return (collection.length === 0);
    };
}

/** Tests */
var pq = new PriorityQueue();
pq.enqueue(['Cherilyn Wang', 1]);
pq.enqueue(['Xin Li', 4]);
pq.enqueue(['Lego Shark', 3]);
pq.enqueue(['New Jersey Geese', 3]);
pq.enqueue(['Kagney Linn Karter', 5]);
pq.enqueue(['Little Baby Dragon', 2]);
pq.printCollection();
pq.dequeue();
pq.front();
pq.printCollection();