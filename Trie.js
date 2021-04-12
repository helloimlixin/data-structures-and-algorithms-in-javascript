/** 
 * Trie
 * 
 * A Trie is a special form of a Nary tree, it's typically used to store
 * strings. Each Trie node represents a string (a prefix, hence Trie sometimes
 * is also called Prefix Tree). Each node might have several children nodes
 * while the paths to different children nodes represent different characters.
 */

let Node = function() {
    this.keys = new Map(); // ES6 Map
    this.end = false; // flag denoting if an end of a word is reached
    this.setEnd = function() {
        this.end = true;
    };
    this.isEnd = function() {
        return this.end;
    };
};

let Trie = function() {
    this.root = new Node();

    this.add = function(input, node = this.root) {
        if (input.length === 0) {
            node.setEnd();
            return;
        } else if (!node.keys.has(input[0])) {
            node.keys.set(input[0], new Node()); // create a new node
            // Recursively add the subsequent characters.
            return this.add(input.substr(1), node.keys.get(input[0]));
        } else {
            return this.add(input.substr(1), node.keys.get(input[0]));
        };
    };

    this.isWord = function(word) {
        let node = this.root;
        while (word.length > 1) {
            if (!node.keys.has(word[0])) {
                return false;
            } else {
                node = node.keys.get(word[0]);
                word = word.substr(1);
            };
        };
        return (node.keys.has(word) && node.keys.get(word).isEnd()) ? 
            true : false;
    };

    /**
     * Helper method that prints the words stored in the Trie.
     */
    this.print = function() {
        let words = new Array();
        let search = function (node, string) {
            if (node.keys.size != 0) {
                for (let letter of node.keys.keys()) {
                    search(node.keys.get(letter), string.concat(letter));
                };
                if (node.isEnd()) {
                    words.push(string);
                };
            } else {
                string.length > 0 ? words.push(string) : undefined;
            };
        };
        search(this.root, new String());
        return words.length > 0 ? words : null;
    };
};

myTrie = new Trie();
myTrie.add('ball');
myTrie.add('bat');
myTrie.add('doll');
myTrie.add('dork');
myTrie.add('do');
myTrie.add('dorm');
myTrie.add('send');
myTrie.add('sense');
console.log(myTrie.isWord('doll'));
console.log(myTrie.isWord('dor'));
console.log(myTrie.isWord('dorf'));
console.log(myTrie.print());