/* URL: https://leetcode.com/problems/maximum-width-of-binary-tree/ */

/*********ITERATIVE BFS*********/

var widthOfBinaryTree = function (root) {
    if (!root) return 0;

    const queue = [[root, 0]];
    let head = 0;
    let maxWidth = 0;

    while (head < queue.length) {
        const size = queue.length - head;
        const firstIndex = queue[head][1];

        let first = 0;
        let last = 0;

        for (let i = 0; i < size; i++) {
            const [node, index] = queue[head++];

            const normalizedIndex = index - firstIndex;

            if (i === 0) first = normalizedIndex;
            if (i === size - 1) last = normalizedIndex;

            if (node.left) {
                queue.push([node.left, 2 * normalizedIndex + 1]);
            }

            if (node.right) {
                queue.push([node.right, 2 * normalizedIndex + 2]);
            }
        }

        maxWidth = Math.max(maxWidth, last - first + 1);
    }

    return maxWidth;
};

/*********RECURSIVE DFS*********/

var widthOfBinaryTreeDFS = function (root) {
    if (!root) return 0;

    const leftMost = [];
    let maxWidth = 0;

    function dfs(node, depth, index) {
        if (!node) return;

        if (leftMost[depth] === undefined) {
            leftMost[depth] = index;
        }

        const width = index - leftMost[depth] + 1;

        maxWidth = Math.max(maxWidth, width);

        dfs(node.left, depth + 1, 2 * index + 1);
        dfs(node.right, depth + 1, 2 * index + 2);
    }

    dfs(root, 0, 0);

    return maxWidth;
};

/*
There are two approaches to solve this problem: BFS (Breadth-First Search) and DFS (Depth-First Search). Both approaches use positional indexing, treating the binary tree as a complete binary tree, where for a node at index i, its left child gets index 2 * i + 1 and its right child gets index 2 * i + 2. This allows us to account for missing nodes between the leftmost and rightmost nodes when calculating the width.

Approach 1: BFS (Level Order Traversal)
In the BFS approach, I use a queue to traverse the tree level by level. Along with each node, I store its positional index in the queue. At the beginning of every level, I record the first node's index and normalize all indices at that level by subtracting this first index. This normalization preserves the relative positions of nodes while keeping the indices smaller. During traversal, I calculate the width using the first and last node indices of the current level: lastIndex - firstIndex + 1, and update the maximum width. In JavaScript, I prefer using a head pointer instead of queue.shift() because shift() requires reindexing the remaining array elements and can make the overall time complexity O(N²) in the worst case, whereas a head pointer keeps queue traversal O(N).

Approach 2: DFS (Depth-First Search)
In the DFS approach, I recursively traverse the tree while maintaining three parameters: the current node, its depth, and its positional index. I maintain an array called leftMost, where leftMost[depth] stores the index of the first node encountered at that depth. Since I traverse the left subtree before the right subtree, the first node encountered at each depth is the leftmost node. Whenever I visit a node, I calculate its width using currentIndex - leftMost[depth] + 1 and update the maximum width. I then recursively visit the left and right children using their respective positional indices.

Which approach is better?
I would prefer BFS for this problem because the problem specifically asks us to calculate the maximum width at each level, and BFS naturally processes nodes level by level. It makes tracking the first and last positions straightforward. DFS is equally valid and can be space-efficient for relatively narrow trees, but recursive DFS introduces a stack overflow risk for highly skewed or deeply nested trees. BFS avoids that recursion risk, although its queue can require O(N) space in the worst case.
Important JavaScript consideration
Both approaches use positional indices that can grow exponentially with tree depth. Index normalization helps reduce their magnitude, but does not guarantee that they will always remain within JavaScript's safe integer range. For strict precision in extreme cases, we can use BigInt for indices and width calculations.

Final interview conclusion: Both BFS and DFS achieve O(N) time complexity. I would choose BFS because level-order traversal makes the width calculation more intuitive and avoids recursion stack limitations.
*/
