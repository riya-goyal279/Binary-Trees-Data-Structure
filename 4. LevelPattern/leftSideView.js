/* URL: https://www.geeksforgeeks.org/problems/left-view-of-binary-tree/1 */

var leftSideView = function (root) {
    if (!root) return [];

    const queue = [root];
    let head = 0;
    const leftView = [];

    while (head < queue.length) {
        let size = queue.length - head;

        for (let i = 0; i < size; i++) {
            const currentNode = queue[head++];

            if (i === 0) leftView.push(currentNode.data);

            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
    }
    return leftView;
};