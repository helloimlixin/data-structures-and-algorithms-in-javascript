/**
 * Sets: like an array, except there are no duplicate items and
 * particular orders of the set elements.
 * 
 * Major usage: check the presence of an item.
 * 
 * ES6 has a built-in set object, but lacks some operations that
 * are common to sets.
 * 
 * Operations contained in ES6 Set: has, values, add, delete (remove),
 * and size.
 */

/**
 * Custom implementation of a Set.
 */
function mySet() {
    // The var collection that will hold the set items.
    var collection = [];

    // Method that checks the presence of an element and return true of false.
    this.has = function(element) {
        return (collection.indexOf(element) !== -1);
    };

    // Method that returns all values in the set.
    this.values = function() {
        return collection;
    };

    // Method that adds an element to the set.
    this.add = function(element) {
        if (!this.has(element)) {
            collection.push(element);    
            return true;
        }
        return false;
    };

    // Method that removes an element from the set.
    this.remove = function(element) {
        if (this.has(element)) {
            index = collection.indexOf(element); // get the index of the target element
            // splice: take out elements from the array starting from the index 
            // and going for 1 element
            collection.splice(index, 1);
            return true;
        }
        return false;
    };

    // Method that returns the size of the set.
    this.size = function() {
        return collection.length;
    };

    /** Methods that are not in the ES6 Set implementation */
    
    // Method that returns the union set of two sets.
    // This method will combine the sets and drop duplicates.
    this.union = function(otherSet) {
        var unionSet = new mySet();
        var firstSet = this.values();
        var secondSet = otherSet.values();
        firstSet.forEach(function(e) {
            unionSet.add(e);
        });
        secondSet.forEach(function(e) {
            unionSet.add(e);
        });
        return unionSet;
    };

    // Method that returns the intersection set of two sets.
    this.intersection = function(otherSet) {
        var intersectioSet = new mySet();
        var firstSet = this.values();
        firstSet.forEach(function(e) {
            if (otherSet.has(e)) {
                intersectioSet.add(e);
            }
        });
        return intersectioSet;
    };

    // Method that returns the difference set between two sets.
    this.difference = function(otherSet) {
        var differenceSet = new mySet();
        var firstSet = this.values();
        firstSet.forEach(function(e) {
            if (!otherSet.has(e)) {
                differenceSet.add(e);
            }
        });
        return differenceSet;
    };

    // Method that checks if a set is a subset of current set.
    this.subset = function(otherSet) {
        var firstSet = this.values();
        return firstSet.every(function(value) {
            return otherSet.has(value); // test case for each element
        });
    };
}

var setA = new mySet();
var setB = new mySet();
setA.add("a");
setA.add("a");
setA.add("c");
setB.add("b");
setB.add("c");
setB.add("c");
setB.add("a");
setB.add("d");
console.log(setA.subset(setB)); // returns true
console.log(setA.intersection(setB).values()); // returns ['a', 'c']

/** Using ES6 Set Implementation */
var setC = new Set();
var setD = new Set();
setC.add("a");
setC.add("b");
setC.add("a");
setD.add("b");
setD.add("c");
setD.add("a");
setD.add("d");
setD.add("c");
console.log(setD.values()); // returns an object Set Iterator
setD.delete("a");
console.log(setD.has("a")); // returns false
console.log(setD.add("d").values()); // ES6 Set.add returns the full set object after addition