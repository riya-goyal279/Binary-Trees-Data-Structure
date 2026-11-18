/* URL: https://leetcode.com/problems/binary-tree-inorder-traversal/description/ */

/*************** RECURSIVE SOLUTION ***************/
var inorderTraversal = function (root) {
    const inorder = [];

    if (!root) return inorder;

    const inorderLeft = inorderTraversal(root.left);
    const inorderRight = inorderTraversal(root.right);

    inorder.push(...inorderLeft, root.val, ...inorderRight);

    return inorder;
};

/************* Iterative solution using 1 stack ***********/
var inorderTraversal = function (root) {
    const inorder = [];

    if (!root) return inorder;

    const stack = [];

    let currentNode = root;

    while (stack.length || currentNode) {
        while (currentNode) {
            stack.push(currentNode);
            currentNode = currentNode.left;
        }

        currentNode = stack.pop();
        inorder.push(currentNode.val);

        currentNode = currentNode.right;
    }

    return inorder;
};

/* Morris Traversal */

var inorderTraversal = function (root) {
    const inorder = [];

    if (!root) return inorder;

    let current = root;

    while (current) {
        if (!current.left) {
            inorder.push(current.val);
            current = current.right;
        } else {
            let pre = current.left;

            while (pre.right && pre.right !== current) pre = pre.right;

            if (!pre.right) {
                pre.right = current;
                current = current.left;
            } else {
                pre.right = null;
                inorder.push(current.val);
                current = current.right;
            }
        }
    }

    return inorder;
};

/**************

Core Applications of Inorder Traversal

• Retrieving sorted data from a Binary Search Tree. In a valid BST, every left descendant is smaller than its parent, and every right descendant is larger. Running an inorder traversal automatically outputs all elements in ascending sorted order in O(N) time without needing an extra sorting step.
• Validating a Binary Search Tree. To check if a binary tree is a valid BST, you can perform an inorder traversal and verify that each visited node is strictly greater than the previous one. If any value is less than or equal to the previous node, the tree violates BST rules.
• Finding the kth smallest or largest element in a BST. Because inorder traversal visits nodes from smallest to largest, you can stop the traversal as soon as you hit the k-th node to find the k-th smallest value. Reversing the order (Right → Root → Left) similarly finds the k-th largest element.
• Generating infix mathematical expressions. In an expression tree where operators are internal nodes and operands are leaves, inorder traversal outputs the formula in standard infix notation (such as A + B * C), which is the format humans naturally read and write.
• Finding inorder predecessors and successors. Databases and indexing structures (like B-trees and BSTs) use inorder traversal logic to locate the immediate next or previous value for range queries and node deletion.
• Flattening a BST into a sorted doubly linked list. By keeping track of the previously visited node during an inorder walk, you can rewire pointers in-place to convert a BST into a sorted linked list.

******************/

/***********MORRIS TRAVERSAL ***************/
var inorderTraversal = function (root) {
    if (!root) return [];

    const inorder = [];

    let currentNode = root;

    while (currentNode) {
        if (currentNode.left) {
            //getting the rightmost node
            let rightmost = currentNode.left;
            while (rightmost.right && rightmost.right !== currentNode)
                rightmost = rightmost.right;

            if (rightmost.right) {
                //remove the thread
                rightmost.right = null;
                inorder.push(currentNode.val);
                currentNode = currentNode.right;
            } else {
                //create the thread
                rightmost.right = currentNode;
                currentNode = currentNode.left;
            }
        } else {
            inorder.push(currentNode.val);
            currentNode = currentNode.right;
        }
    }

    return inorder;
};
