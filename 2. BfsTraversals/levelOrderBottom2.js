/* URL: https://www.geeksforgeeks.org/problems/reverse-level-order-traversal/1 */

function reverseLevelOrder(root) {
    const queue = [root];
    let result = [];

    while (queue.length) {
        let size = queue.length;
        const level = [];
        while (size--) {
            const currentNode = queue.shift();
            level.push(currentNode.data);
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
        result = [...level, ...result];
    }
    return result;
}

/* One more optimization: In JavaScript, queue.shift() can be expensive because it shifts the remaining array elements. 
You can use a head pointer instead: */
function reverseLevelOrder(root) {
    if (!root) return [];

    const queue = [root];
    const result = [];
    let head = 0;

    while (head < queue.length) {
        const size = queue.length - head;
        const level = [];

        for (let i = 0; i < size; i++) {
            const currentNode = queue[head++];

            level.push(currentNode.data);

            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }

        result.push(level);
    }

    return result.reverse().flat();
}