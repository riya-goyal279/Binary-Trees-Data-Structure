if (!root) return [];

const preorder = [],
    inorder = [],
    postorder = [];
const stack = [[root, 1]];

while (stack.length) {
    const [currentNode, currentState] = stack[stack.length - 1];

    if (currentState === 1) {
        stack[stack.length - 1][1] = 2;
        preorder.push(currentNode.val);
        if (currentNode.left) stack.push([currentNode.left, 1]);
    } else if (currentState === 2) {
        stack[stack.length - 1][1] = 3;
        inorder.push(currentNode.val);
        if (currentNode.right) stack.push([currentNode.right, 1]);
    } else {
        stack.pop();
        postorder.push(currentNode.val);
    }
}

return [preorder, inorder, postorder];

/*********************
This code finds Preorder, Inorder, and Postorder traversals in one single loop by saving each node on a stack along with a state number (1, 2, or 3) that tracks how many times it has been visited. 
On visit 1, the node is added to preorder, its state changes to 2, and its left child is pushed onto the stack to be processed next. 
Once the left child finishes, the loop returns to the same node on visit 2, adds it to inorder, changes its state to 3, and pushes its right child onto the stack. 
Finally, after the right child finishes, the loop returns to the node on visit 3, adds it to postorder, and removes it from the stack for good, running in O(N) time and O(N) space without any recursion.
**********************/