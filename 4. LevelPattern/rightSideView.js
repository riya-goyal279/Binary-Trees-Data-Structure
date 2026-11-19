/* URL: https://leetcode.com/problems/binary-tree-right-side-view/description/ */

var rightSideView = function (root) {
    if (!root) return [];

    const queue = [root];
    let head = 0;
    const rightView = [];

    while (head < queue.length) {
        let size = queue.length - head;

        while (size--) {
            const currentNode = queue[head++];

            if (size === 0) rightView.push(currentNode.val);

            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
    }
    return rightView;
};

/*
have used Breadth First Search (BFS) to traverse the binary tree level by level. I maintain a queue and use a head pointer to avoid the overhead of the shift operation.

For every level, I calculate its size using the difference between the queue length and the head pointer. I then process exactly that many nodes.

Since BFS processes nodes from left to right at each level, the last node processed at every level represents the rightmost node visible from the right side. I identify this node using the size counter and add its value to the result.

I continue this process until all nodes have been visited.

The overall time complexity is O(N), since every node is visited exactly once, and the auxiliary space complexity is O(N) for the queue.
*/