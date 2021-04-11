/**
 * Hash Table
 * 
 * A hash table is a data structure that is used to implement associative arrays
 * or mappings of key value pairs.
 */

/**
 * A simple Hash Function.
 * @param {str} string string element to hash
 * @param {int} max number of buckets we are using in hash table to store values
 * @returns hash code int
 */
var hash = (string, max) => {
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        hash += string.charCodeAt(i); // add the character code for each
                                      // character in the string
    }
    return hash % max; // return the hash code
};

let HashTable = function () {
    let storage = []; // storage array
    const storageLimit = 4; // number of buckets

    /**
     * Utility function to print out the storage elements.
     */
    this.print = function() {
        console.log(storage);
    }

    /**
     * Method that implements Hash Table insertion.
     * @param {int} key key in the hash table entry
     * @param {str} value value of the hash table entry
     */
    this.add = function(key, value) {
        var index = hash(key, storageLimit);
        // Bucket is empty.
        if (storage[index] === undefined) {
            storage[index] = [
                [key, value]
            ];
        } else {
            var inserted = false;
            // If the key exists
            for (var i = 0; i < storage[index].length; i++) {
                // If the key already exists, update the corresponding value.
                if (storage[index][i][0] === key) {
                    storage[index][i][1] = value;
                    inserted = true;
                }
            }
            // If the key doesn't exist, add a new entry.
            if (inserted === false) {
                storage[index].push([key, value]);
            }
        }
    };

    this.remove = function(key) {
        var index = hash(key, storageLimit);
        if (storage[index].length === 1 && storage[index][0][0] === key) {
            delete storage[index];
        } else {
            for (var i = 0; i < storage[index]; i++) {
                if (storage[index][i][0] === key) {
                    delete storage[index][i];
                }
            }
        }
    };

    this.lookup = function(key) {
        var index = hash(key, storageLimit);
        if (storage[index] === undefined) {
            return undefined;
        } else {
            for (var i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    return storage[index][i][1];
                }
            }
        }
    };
}

console.log(hash('hello', 10));

let hashTable = new HashTable();
hashTable.add("cherilyn", "wang");
hashTable.add("tux", "penguin");
hashTable.add("don", "julio");
console.log(hashTable.lookup('tux'));
hashTable.print();