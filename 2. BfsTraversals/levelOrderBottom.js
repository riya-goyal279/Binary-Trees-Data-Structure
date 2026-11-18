/* URL: https://leetcode.com/problems/binary-tree-level-order-traversal-ii/ */

var levelOrderBottom = function (root) {
    if (!root) return [];

    const queue = [root];
    const reverseLevelOrder = [];

    while (queue.length) {
        let size = queue.length;
        const level = [];

        while (size--) {
            const currentNode = queue.shift();
            level.push(currentNode.val);

            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }

        reverseLevelOrder.unshift(level);
    }

    return reverseLevelOrder;
};
