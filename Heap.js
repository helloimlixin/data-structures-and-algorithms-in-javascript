/**
 * Heaps
 * 
 * A binary heap is another type of tree data structure, where every node can
 * have at most two children. It is a partially ordered binary tree that satis-
 * fies the Heap-Property. Also it's a complete tree, meaining all levels are
 * completely filled until the last level and the last level is filled from
 * left to right.
 * 
 * A binary heap can be either a min heap or a max heap. In a max heap, the keys
 * of parent nodes are always greater than or equal to those of the children. In
 * a min heap, the keys of parent nodes are less than or equal to those of the
 * children.
 * 
 * The order between levels is important but the order of the nodes on the same
 * level is not important. For example,
 *            12                         1
 *          /    \                     /    \
 *       10       9                   5      9
 *      /   \    /                  /   \   /
 *     5    6   1                  10   6  12
 *         Max Heap                   Min Heap
 * 
 * Index formulas:
 * 
 * left child: i * 2
 * right child: i * 2 + 1
 * parent: i / 2
 * 
 * Example of index mappings:
 * 
 *                         20 (1)
 *                     /           \
 *                 19 (2)          17 (3)
 *                /     \         /      \
 *            13 (4)    15 (5)   8 (6)    5 (7)
 *         /       \    /
 *     11 (8)   9 (9)  10 (10)
 * 
 * ----------------------------------------------------------
 *  | 20 | 19 | 17 | 13 | 15 | 8  | 5  | 11 | 9  | 10 |    |
 * ----------------------------------------------------------
 *    1    2    3    4    5    6    7    8    9    10
 *   root                                         heapSize
 * 
 * Heap Visualization:
 * https://www.cs.usfca.edu/~galles/visualization/Heap.html
 */

let MinHeap = function () {
    let heap = [null];

    this.print = function() {
        console.log(heap);
    }

    /**
     * Method that inserts a number into the heap.
     */
    this.insert = function(num) {
        heap.push(num);
        if (heap.length > 2) {
            let idx = heap.length - 1;
            // Keep comparing the last item in the array with the parent node.
            while (heap[idx] < heap[Math.floor(idx/2)]) {
                if (idx >= 1) {
                    // ES6 destructuring syntax. meaning we'll swap the node
                    // that we just inserted with the parent node.
                    [heap[Math.floor(idx / 2)], heap[idx]] = [heap[idx],
                        heap[Math.floor(idx / 2)]];
                    // If the parent node is not the root node.
                    if (Math.floor(idx / 2) > 1) {
                        idx = Math.floor(idx / 2); // set the index back to the 
                                                   // parent node
                    } else {
                        break;
                    };
                };
            };
        };
    };

    /**
     * Method that performs removal operation, note that in a binary heap, we
     * always remove the minimum element.
     */
    this.remove = function() {
        let smallest = heap[1]; // locate the smallest element in the array
        if (heap.length > 2) {
            heap[1] = heap[heap.length - 1]; // set the first node in the array
                                             // to the last node
            heap.splice(heap.length - 1); // remove the last element
            if (heap.length === 3) {
                if (heap[1] > heap[2]) {
                    [heap[1], heap[2]] = [heap[2], heap[1]];
                };
                return smallest;
            };
            // When there are more elements.
            let i = 1;
            let left = 2 * i;
            let right = 2 * i + 1;
            while (heap[i] >= heap[left] || heap[i] >= heap[right]) {
                // Swap the parent with the smaller element.
                if (heap[left] < heap[right]) {
                    [heap[i], heap[left]] = [heap[left], heap[i]];
                    i = 2 * i;
                } else {
                    [heap[i], heap[right]] = [heap[right], heap[i]];
                    i = 2 * i + 1;
                };
                // Set the new left and right nodes.
                left = 2 * i;
                right = 2 * i + 1;
                // When hits the very bottom of the tree, break the while loop.
                if (heap[left] === undefined || heap[right] === undefined) {
                    break;
                };
            };
        } else if (heap.length === 2) {
            heap.splice(1, 1); // only one element in the array after removal
        } else {
            return null; // zero element in the array to begin with
        };
        return smallest;
    };

    /**
     * A common use of the max/min heap data structure is the heap sort.
     */
    this.sort = function() {
        let result = new Array();
        while (heap.length > 1) {
            result.push(this.remove()); // remove the smallest elements and push                          // to the result array
        };
        return result;
    };
};

/** Tests */

minHeap = new MinHeap();

minHeap.insert(1);
minHeap.insert(5);
minHeap.insert(9);
minHeap.insert(10);
minHeap.insert(6);
minHeap.insert(12);
minHeap.insert(2);

// minHeap.print();
console.log(minHeap.sort());

minHeap.insert(1);
minHeap.insert(5);
minHeap.insert(9);
minHeap.insert(10);
minHeap.insert(6);
minHeap.insert(12);
minHeap.insert(2);

minHeap.remove();
// minHeap.print();
console.log(minHeap.sort());

let MaxHeap = function () {
    let heap = [null];

    this.print = function() {
        console.log(heap);
    }

    /**
     * Method that inserts a number into the heap.
     */
    this.insert = function(num) {
        heap.push(num);
        if (heap.length > 2) {
            let idx = heap.length - 1;
            // Keep comparing the last item in the array with the parent node.
            while (heap[idx] > heap[Math.floor(idx / 2)]) {
                if (idx >= 1) {
                    // ES6 destructuring syntax. meaning we'll swap the node
                    // that we just inserted with the parent node.
                    [heap[Math.floor(idx / 2)], heap[idx]] = [heap[idx],
                        heap[Math.floor(idx / 2)]];
                    // If the parent node is not the root node.
                    if (Math.floor(idx / 2) > 1) {
                        idx = Math.floor(idx / 2); // set the index back to the 
                                                   // parent node
                    } else {
                        break;
                    };
                };
            };
        };
    };

    /**
     * Method that performs removal operation, note that in a binary heap, we
     * always remove the maximum element.
     */
    this.remove = function() {
        let largest = heap[1]; // locate the largest element in the array
        if (heap.length > 2) {
            heap[1] = heap[heap.length - 1]; // set the first node in the array
                                             // to the last node
            heap.splice(heap.length - 1); // remove the last element
            if (heap.length === 3) {
                if (heap[1] < heap[2]) {
                    [heap[1], heap[2]] = [heap[2], heap[1]];
                };
                return largest;
            };
            // When there are more elements.
            let i = 1;
            let left = 2 * i;
            let right = 2 * i + 1;
            while (heap[i] <= heap[left] || heap[i] <= heap[right]) {
                // Swap the parent with the largest element.
                if (heap[left] > heap[right]) {
                    [heap[i], heap[left]] = [heap[left], heap[i]];
                    i = 2 * i;
                } else {
                    [heap[i], heap[right]] = [heap[right], heap[i]];
                    i = 2 * i + 1;
                };
                // Set the new left and right nodes.
                left = 2 * i;
                right = 2 * i + 1;
                // When hits the very bottom of the tree, break the while loop.
                if (heap[left] === undefined || heap[right] === undefined) {
                    break;
                };
            };
        } else if (heap.length === 2) {
            heap.splice(1, 1); // only one element in the array after removal
        } else {
            return null; // zero element in the array to begin with
        };
        return largest;
    };

    /**
     * A common use of the max/min heap data structure is the heap sort.
     */
    this.sort = function() {
        let result = new Array();
        while (heap.length > 1) {
            result.push(this.remove()); // remove the smallest elements and push                          // to the result array
        };
        return result;
    };
};

/** Tests */

maxHeap = new MaxHeap();

maxHeap.insert(12);
maxHeap.insert(10);
maxHeap.insert(9);
maxHeap.insert(5);
maxHeap.insert(6);
maxHeap.insert(1);
maxHeap.insert(2);

// maxHeap.print();
console.log(maxHeap.sort());

maxHeap.insert(12);
maxHeap.insert(10);
maxHeap.insert(9);
maxHeap.insert(5);
maxHeap.insert(6);
maxHeap.insert(1);
maxHeap.insert(2);

maxHeap.remove();
// maxHeap.print();
console.log(maxHeap.sort());