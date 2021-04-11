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
    }


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
    }

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
    }

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

    }

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
    }

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

    // Method that checks if the BST is balanced.
    isBalanced() {
        // If the BST is balanced, then the difference bewteen minHeight
        // and maxHeight is at least 1.
        return (this.findMinHeight() >= this.findMaxHeight() - 1);
    }

    /** 
     * Method that finds the minHeight of a BST.
     * The minHeight of a BST is the number of nodes along the shortest path
     * from the root node to the nearest leaf node.
     * 
     * The minHeight the distance from the root node to the first leaf node
     * without two children.
     */
    findMinHeight(node = this.root) {
        if (node === null) {
            return -1;
        };
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);
        if (left < right) {
            return left + 1;
        } else {
            return right + 1;
        };
    }

    /**
     * Method that finds the maxHeight of a BST.
     * The maxHeight of a BST is the distance between the root node and the
     * furthest node.
     * @param {Node} node 
     * @returns maxHeight of the BST
     */
    findMaxHeight(node = this.root) {
        if (node === null) {
            return -1;
        };
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);
        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        };
    }

    /**============================================
     *               BST TRAVERSALS
     * 
     * The word "order" in in-order, pre-order, post-order traversals
     * refers to when we will traverse the root node.
     *=============================================**/
    
    /**
     * Method that performs the in-order traversal on a BST.
     * In-order traversal is to traverse the left subtree first. Then visit the
     * root. Finally, traverse the right subtree.
     * @returns an array containing the in-order traversal result
     */
    inOrder() {
        // Sanity check.
        if (this.root === null) {
            return null;
        } else {
            var result = new Array();
            function traverseInOrder(node) {
                // Recursion until there's no left child.
                node.left && traverseInOrder(node.left);
                // Traverse the root node next.
                result.push(node.data);
                // Travese the right subtree.
                node.right && traverseInOrder(node.right);
            }
            traverseInOrder(this.root);
            return result;
        };
    }

    /**
     * Method that performs the pre-order traversal on a BST.
     * Pre-order traversal is to traverse the root first, then the left subtree,
     * then the right subtree.
     * @returns an array containing the pre-order traversal result
     */
    preOrder() {
        // Sanity check.
        if (this.root === null) {
            return null;
        } else {
            var result = new Array();
            function traversePreOrder(node) {
                // Traverse root node first.
                result.push(node.data);
                // Travese the left subtree.
                node.left && traversePreOrder(node.left);
                // Traverse the right subtree.
                node.right && traversePreOrder(node.right);
            };
            traversePreOrder(this.root);
            return result;
        }
    }

    /**
     * Method that performs post-order traversal on a BST.
     * Post-order traversal is to traverse the left subtree first, then traverse
     * the right subtree, finally, visit the root.
     * @returns an array containing the result of post-order traversal on a BST
     */
    postOrder() {
        // Sanity check.
        if (this.root === null) {
            return null;
        } else {
            var result = new Array();
            function traversePostOrder(node) {
                // Traverse the left subtree first.
                node.left && traversePostOrder(node.left);
                // Traverse the right subtree.
                node.right && traversePostOrder(node.right);
                // Traverse the root node.
                result.push(node.data);
            };
            traversePostOrder(this.root);
            return result;
        }
    }

    /*================== Lever-Order Traversal =================*/
    
    /**
     * Method that performs level-order traversal on a BST.
     * Level-order traversal is to traverse the tree level by level.
     * Breadth-First Search is an algorithm to traverse or search in data
     * structures like a tree or a graph. The algorithm starts with a root node
     * and visit the node itself first. Then traverse its neighbors, traverse
     * its second level neighbors, ...
     * 
     * Here we are using a Queue implementation for the Breadth-First Search
     * Level-Order Tree Traversal procedure.
     * @returns an array containing the level-order traversal of the BST
     */
    levelOrder() {
        let result = [];
        let Q = [];
        if (this.root !== null) {
            Q.push(this.root);
            while (Q.length > 0) {
                let node = Q.shift();
                result.push(node.data);
                if (node.left !== null) {
                    Q.push(node.left);
                };
                if (node.right !== null) {
                    Q.push(node.right);
                };
            };
            return result;
        } else {
            return null;
        };
    }
}

/** Tests */

const bst = new BST();

// bst.add(4);
// bst.add(2);
// bst.add(6);
// bst.add(1);
// bst.add(3);
// bst.add(5);
// bst.add(7);
// bst.remove(4);
// console.log(bst.findMin());
// console.log(bst.findMax());
// bst.remove(7);
// console.log(bst.findMax());
// console.log(bst.isPresent(4));

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);

console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
bst.add(10);
console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
console.log('in-order: ' + bst.inOrder());
console.log('pre-order: ' + bst.preOrder());
console.log('post-order: ' + bst.postOrder());

console.log('level-order: ' + bst.levelOrder())