/**
 * Binary Search Tree: a tree data structure that is a binary tree (each node
 * has at most two branches) and ordered (each left subtree is less than or
 * equal to the parent node and each right subtree is greater than or equal to
 * the parent node).
 * 
 * On average, the runtime of the tree operations (lookup, insertion, and
 * deletion) is in proportional to the order of O(lgn) where n is the number of
 * items stored in the tree.
 * 
 * Glossary: root, parent, left-child, right-child, siblings, leaf
 * 
 * An example of Binary Search Tree:
 *                50
 *              /    \
 *           17        72
 *         /   \     /    \
 *        12   23   54    76
 *      /  \   /      \
 *     9   14 19      67
 */

/**
 * Auxiliary class to represent each node in the tree.
 */
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

/**
 * Class for the Binary Search Tree.
 */
class BST {

    constructor() {
        this.root = null;
    }

    // Method that adds the data/node to the BST.
    add(data) {
        const node = this.root; // get the reference to the first node
        // If this is the first node to add.
        if (node === null) {
            this.root = new Node(data);
            return;
        } else {
            const searchTree = function(node) {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data); // create a node with the 
                                                    // new data
                        return;
                    } else if (node.left !== null) {
                        return searchTree(node.left); // continue the search 
                                                      // recursively
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right !== null) {
                        return searchTree(node.right);
                    }
                } else {
                    return null; // if they are equal, nothing needs to be added
                }
            };
            return searchTree(node); // proceed the recursion
        }
    };


    /**
     * Method that returns the minimum of the tree.
     * For the Binary Search Tree, the minimum value locates all the way to the
     * left of the tree. For example,
     * An example of Binary Search Tree:
     *                50
     *              /    \
     *           17        72
     *         /   \     /    \
     *        12   23   54    76
     *      /  \   /      \
     *     9   14 19      67
     * The minimum is located at the leftmost node of the tree, which is 9.
     */
    findMin() {
        let current = this.root;
        // Loop until the leftmost node (no left subtree).
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    };

    /**
     * Method that returns the maximum of the tree.
     * For the Binary Search Tree, the maximum value locates all the way to the
     * right of the tree. For example,
     * An example of Binary Search Tree:
     *                50
     *              /    \
     *           17        72
     *         /   \     /    \
     *        12   23   54    76
     *      /  \   /      \
     *     9   14 19      67
     * The maximum is located at the rightmost node of the tree, which is 76.
     */
    findMax() {
        let current = this.root;
        // Loop until the rightmost node (no right subtree).
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    };

    // Method that returns the node that matches the input data.
    find(data) {
        let current = this.root;
        while (current.data !== data) {
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            if (current === null) {
                return null; // return null if no match is found
            }
        }

    };

    // Method that checks if the data is present in the tree.
    isPresent(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                return true; // return true if a matching node is found
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    };

    // Method that removes the node that contains the given data.
    remove(data) {
        // A recursive function to perform the node removal.
        const removeNode = function(node, data){
            // Check if we have an empty tree.
            if (node === null) {
                return null;
            }
            // If we find a node that matches the data.
            if (data === node.data) {
                // Base Case 1: node has no children, return null.
                if (node.left === null && node.right === null) {
                    return null; // set the reference to the node to null
                }
                // Node has no left child, replace the node reference with
                // whatever on the right.
                if (node.left === null) {
                    return node.right;
                }
                // Node has no right child, replace the node reference with
                // whatever on the left.
                if (node.right === null) {
                    return node.left;
                }
                // Node has two children.
                var tmpNode = node.right; // go to the right subnode
                // Go all the way left down to the left leaf node.
                while (tmpNode.left !== null) {
                    tmpNode = tmpNode.left;
                }
                node.data = tmpNode.data; // update the node data with the left
                                          // leaf node data
                node.right = removeNode(node.right, tmpNode.data); // recursion
                return node;
            } else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else {
                node.right = removeNode(node.right, data);
                return node;
            }
        }
        this.root = removeNode(this.root, data); // call the function at the end
    }
}

/** Tests */

const bst = new BST();

bst.add(4);
bst.add(2);
bst.add(6);
bst.add(1);
bst.add(3);
bst.add(5);
bst.add(7);
bst.remove(4);
console.log(bst.findMin());
console.log(bst.findMax());
bst.remove(7);
console.log(bst.findMax());
console.log(bst.isPresent(4));