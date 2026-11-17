/* URL: https://leetcode.com/problems/binary-tree-preorder-traversal/description/ */

/*************** RECURSIVE SOLUTION ***************/
var preorderTraversal = function(root) {
    const preOrder = [];

    if(!root)
        return preOrder;
    
    preOrder.push(root.val);
    const preOrderLeft = preorderTraversal(root.left);
    const preOrderRight = preorderTraversal(root.right);

    preOrder.push(...preOrderLeft, ...preOrderRight);

    return preOrder;
};


/************* Iteraive solution using 1 stack ***********/
var preorderTraversal = function(root) {
    const preOrder = [];

    if(!root)
        return preOrder;
        
    const stack = [root];
    
    while(stack.length) {
        const currentNode = stack.pop();
        preOrder.push(currentNode.val);

        if(currentNode.right) stack.push(currentNode.right);
        if(currentNode.left) stack.push(currentNode.left);
    }

    return preOrder;
};

/**********************
 
1. recursion can lead to stack overflow for very deep trees. 
2. An iterative approach using a stack avoids this and is often preferred in interviews for its space efficiency.
3. In iteration, stack lets us simulate the call stack of recursion, but with more control and less risk of stack overflow. 
4. Preorder traversal visits every node once, so the time complexity is O(n) where n is the number of nodes.
5. In the worst case (like a skewed tree), the space complexity is O(n) because the recursion stack can go as deep as the number of nodes.
6. For a perfectly balanced binary tree, the recursion stack goes as deep as the tree’s height, which is O(logn). Less memory, more efficiency!

***********************/

/**************************

Core Applications of Preorder Traversal

1. Cloning or copying a tree. To create an exact duplicate of a tree, you must create the parent node before you can attach its children. Preorder traversal visits the root first, allowing you to instantiate each node and recursively build its left and right subtrees in the exact same structure.
2. Tree serialization and deserialization. Saving a tree to a file or sending it over a network requires converting it into a linear format like an array or string. Recording nodes in preorder preserves the exact shape of the tree, making it straightforward to reconstruct later (especially when null pointers are included).
3. Generating prefix expressions (Polish notation). In an expression tree where operators are internal nodes and operands are leaves, preorder traversal outputs the mathematical expression in prefix format. Compilers and calculators use prefix notation because it eliminates the need for parentheses to define operator precedence.
4. Directory and file system listing. Navigating a folder structure from the top-level directory down into nested subdirectories is a natural preorder operation. Tools like the Unix tree command display the parent folder first, followed immediately by its contents.
5. Building a Document Object Model (DOM) or XML/HTML parser. Rendering engines read HTML or XML documents from top to bottom. They process the outer container tag (root) first before parsing and rendering the inner nested elements (children).
6. Validating binary search tree (BST) bounds. When checking if a tree is a valid BST from top to bottom, preorder traversal allows you to pass down valid minimum and maximum value ranges from each parent node to its children.

**************************/


/************** MORRIS TRAVERSAL ***************/
var preorderTraversal = function(root) {
    const preorder = [];
    
    if(!root)
        return preorder;

    let currentNode = root;

    while(currentNode) {
        if(currentNode.left) {
            //get rightmost node
            let rightmostNode = currentNode.left;
            while(rightmostNode.right && rightmostNode.right!==currentNode) {
                rightmostNode = rightmostNode.right;
            }

            //checking if thread already exist
            if(rightmostNode.right) {
                //remove the thread
                rightmostNode.right = null;
                currentNode = currentNode.right;
            } else {
                //creating the thread
                rightmostNode.right = currentNode;
                preOrder.push(currentNode.val);
                currentNode = currentNode.left;
            }

        } else {
            preOrder.push(currentNode.val);
            currentNode = currentNode.right;
        }
    }

    return preorder;
}

/**********************
Morris Traversal is a binary tree traversal algorithm that visits every node using O(1) constant auxiliary space—meaning it requires neither recursion nor an explicit stack. It is named after computer scientist Joseph M. Morris.

How It Works:
Normally, traversing down a left subtree requires a stack to remember how to return to the parent node. Morris Traversal solves this by temporarily using the concept of a threaded binary tree:
• Creating a thread. Before moving down to a node's left child, the algorithm finds that node's inorder predecessor (the rightmost node in its left subtree). It points that predecessor's empty right pointer back up to the current node, creating a temporary bridge.
• Removing the thread. Once the left subtree is finished, the traversal naturally follows this temporary bridge back up to the parent node. Upon returning, the algorithm deletes the bridge to restore the tree's original structure and moves on to the right subtree.

Key Benefits of Morris Traversal:
• Constant O(1) extra memory. Standard recursive and iterative traversals require O(H) auxiliary space (where H is the height of the tree, up to O(N) for skewed trees). Morris Traversal uses only a couple of pointer variables, making its memory footprint flat regardless of tree size.
• Zero risk of stack overflow. Because it avoids the call stack entirely, it can safely traverse deeply skewed trees with millions of nodes without crashing.
• Linear O(N) time complexity. Even though it searches for predecessors along the way, each edge in the tree is traversed at most two to three times. This keeps the overall runtime strictly linear.
• Non-destructive restoration. Although it modifies node pointers during execution, it cleans up every temporary link before finishing, leaving the original tree intact
*************************/