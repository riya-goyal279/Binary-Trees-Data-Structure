/* URL: https://leetcode.com/problems/reverse-odd-levels-of-binary-tree/ */

/*********ITERATIVE BFS*********/
const reverseOddLevels = function (root) {
    if (!root) return root;

    const queue = [root];
    let level = 0;
    let head = 0;

    while (head < queue.length) {
        const size = queue.length - head;
        const nodes = [];

        for (let i = 0; i < size; i++) {
            const node = queue[head++];
            nodes.push(node);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        if (level % 2 === 1) {
            let left = 0;
            let right = nodes.length - 1;

            while (left < right) {
                [nodes[left].val, nodes[right].val] = [
                    nodes[right].val,
                    nodes[left].val,
                ];

                left++;
                right--;
            }
        }

        level++;
    }

    return root;
};

/*********RECURSIVE DFS*********/
/**** More interesting approach ****/
/* 
    This approach uses a special property of perfect binary trees: every node has a corresponding mirror node on the opposite side of the tree.
    Instead of collecting all nodes at a level, we directly access pairs of mirror nodes and swap their values.
*/
var reverseOddLevelsDFS = function (root) {
    function dfs(left, right, level) {
        if (!left || !right) return;

        if (level % 2 === 1) {
            [left.val, right.val] = [right.val, left.val];
        }

        dfs(left.left, right.right, level + 1);
        dfs(left.right, right.left, level + 1);
    }

    if (!root) return root;

    dfs(root.left, root.right, 1);

    return root;
};

/* 
1. BFS Approach (Level Order Traversal): In the BFS approach, we use a queue to traverse the binary tree level by level. We maintain the current level's nodes in a temporary array. Whenever we encounter an odd-numbered level, we use the two-pointer technique to swap the values from both ends of that level until the pointers meet. Since we process every node exactly once, the time complexity is O(n). The auxiliary space complexity is O(w), where w is the maximum width of the tree, because we need to maintain the queue and current-level nodes. In the worst case, this can be O(n).
2. DFS Approach (Recursive Mirror Traversal): In the DFS approach, we take advantage of the fact that the given tree is a perfect binary tree. Instead of traversing and storing an entire level, we recursively process pairs of mirror nodes. We start with the root's left and right children and recursively pair their children in opposite directions: left-left with right-right, and left-right with right-left. Whenever we reach an odd-numbered level, we swap the values of the corresponding mirror nodes. Since every node is visited exactly once, the time complexity is O(n). The auxiliary space complexity is O(h), where h is the height of the tree, because of the recursion call stack. Since the tree is perfect, its height is O(log n), making the auxiliary space complexity O(log n).
3. Which approach is better? Both approaches have the same O(n) time complexity, but DFS is more space-efficient for this particular problem. BFS requires O(w) auxiliary space, which can be O(n) in the worst case, whereas DFS requires O(h) space, which is O(log n) for a perfect binary tree.
4. Therefore, I would prefer the DFS approach for this problem because it utilizes the perfect binary tree property to process mirror nodes directly without maintaining an additional queue or storing entire levels.
5. Interview takeaway: BFS is preferable when the problem requires explicit level-wise processing, whereas DFS can be more space-efficient when we can exploit relationships between corresponding nodes, as we do with mirror nodes in this problem.
*/