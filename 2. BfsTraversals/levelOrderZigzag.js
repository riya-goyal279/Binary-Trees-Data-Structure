/* URL: https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/ */

var zigzagLevelOrder = function (root) {
    if (!root) return [];
    const queue = [root];
    let level = 0;
    let head = 0;
    const result = [];

    while (head < queue.length) {
        let size = queue.length - head;
        const levelArr = [];
        while (size--) {
            const currentNode = queue[head];
            head++;
            levelArr.push(currentNode.val);
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
        if (level % 2 === 1) levelArr.reverse();
        result.push(levelArr);
        level++;
    }
    return result;
};

/* 
I have used Breadth First Search (BFS) to perform level-order traversal. I maintain a queue and use a head pointer to process nodes without using the shift operation, which would take O(N) time per operation in JavaScript.

For every iteration, I calculate the number of nodes belonging to the current level using the difference between the queue length and the head pointer. I process exactly those nodes, store their values in a separate array, and add their left and right children to the queue.

To achieve zigzag traversal, I maintain a level counter starting from zero. For even-numbered levels, I keep the natural left-to-right order, whereas for odd-numbered levels, I reverse the level array before adding it to the final result.

Since every node is visited exactly once and the total cost of reversing all level arrays is O(N), the overall time complexity is O(N), and the auxiliary space complexity is O(N). 
*/