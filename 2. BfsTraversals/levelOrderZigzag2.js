/* URL: https://www.geeksforgeeks.org/problems/zigzag-tree-traversal/1 */

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
    return result.flat();
};