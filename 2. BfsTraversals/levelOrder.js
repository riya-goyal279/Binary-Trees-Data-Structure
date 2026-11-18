/******** 1. Using a Queue (BFS) - Standard Approach *********/
/*
- URL: https://www.geeksforgeeks.org/problems/level-order-traversal/1
- Time Complexity: O(n)
- Space Complexity: O(n)
- This returns a flat array.
*/
function levelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length) {
        const node = queue.shift();

        result.push(node.val);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return result;
}

/******** 2. Using Queue with Level Separation *********/
/*
- URL: https://leetcode.com/problems/binary-tree-level-order-traversal/
- Time Complexity: O(n)
- Space Complexity: O(n)
*/
function levelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length) {
        const size = queue.length;
        const level = [];

        for (let i = 0; i < size; i++) {
            const node = queue.shift();

            level.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(level);
    }

    return result;
}

/********* 3. Using Recursion (DFS) *********/
/*
Instead of using a queue, we use recursion and maintain the current depth/level.
- Maintains the level of each node.
- Time Complexity: O(n)
- Space Complexity: O(h) auxiliary recursion stack, excluding output.
*/
function levelOrder(root) {
    const result = [];

    function dfs(node, level) {
        if (!node) return;

        if (!result[level]) {
            result[level] = [];
        }

        result[level].push(node.val);

        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    }

    dfs(root, 0);

    return result;
}

/*
The DFS recursive approach can be more space-efficient than BFS for a balanced binary tree because DFS uses the recursion call stack, which requires O(h) auxiliary space, where h is the height of the tree (O(log n) for a balanced tree). 
In contrast, BFS uses a queue that can hold up to O(w) nodes, where w is the maximum width of the tree (O(n) in the worst case). 
However, for a skewed tree, DFS can require O(n) space due to recursion depth, whereas BFS may require only O(1) auxiliary space because the queue holds at most one node at a time. 
Therefore, neither approach is universally better; their space efficiency depends on the structure of the tree. 
When considering the output array, both approaches require O(n) total space because all n nodes must be stored.
*/
