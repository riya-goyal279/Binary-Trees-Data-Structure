/* URL: https://leetcode.com/problems/maximum-depth-of-binary-tree/ */

/*********RECURSIVE SOLUTIONS *********/
/* O(n) time, O(H) space, where H is the height: O(log n) for a balanced tree, O(n) for a skewed one */

/* 1. Bottom-up (post-order): Children return their heights and the parent combines them. */
var maxDepth = function (root) {
  if (!root) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  const maxHeight = Math.max(leftDepth, rightDepth);

  return maxHeight + 1;
};

/* 2. Top-down (pre-order): pass depth down and track the max in an outer variable. */
var maxDepth = function (root) {
  let max = 0;
  const dfs = (node, depth) => {
    if (!node) return;
    max = Math.max(max, depth);
    dfs(node.left, depth + 1);
    dfs(node.right, depth + 1);
  };
  dfs(root, 1);
  return max;
};

/* 3. Top-down with a return value: This is a hybrid with no outer variable. The depth goes down as a parameter, and the answer comes back up */
var maxDepth = function(root, depth = 0) {
    if (!root) return depth;
    return Math.max(maxDepth(root.left, depth + 1),
                    maxDepth(root.right, depth + 1));
};

/********** Iterative DFS **********/

/* 4. with [node, depth] pairs: Explicit stack that stores the depth with each node. This is a pre-order simulation */
var maxDepth = function (root) {
  if (!root) return 0;
  const stack = [[root, 1]];
  let max = 0;
  while (stack.length) {
    const [node, d] = stack.pop();
    max = Math.max(max, d);
    if (node.right) stack.push([node.right, d + 1]);
    if (node.left) stack.push([node.left, d + 1]);
  }
  return max;
};

/* 5. stack size is the depth: In an iterative inorder or post-order traversal, the stack holds exactly the current root-to-node path. So stack.length is the depth of the current node. */
var maxDepth = function (root) {
  const stack = [];
  let curr = root,
    max = 0;
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    max = Math.max(max, stack.length); // stack = current path
    curr = stack.pop().right;
  }
  return max;
};

/*
Summary
#	Style	                            Order	Time	Space
1	Recursive, bottom-up	            Post	O(n)	O(H)
2	Recursive, top-down + variable	    Pre	    O(n)	O(H)
3	Recursive, top-down + return	    Pre     O(n)	O(H)
4	Iterative, [node, depth]	        Pre	    O(n)	O(H)
5	Iterative inorder, stack size	    In	    O(n)	O(H)
6	Iterative post-order, stack size	Post	O(n)	O(H)
7	Morris	                            In	    O(n)	O(1)
*/

/*Solution 1: level by level (most common)
javascript
var maxDepth = function(root) {
    if (!root) return 0;

    let level = [root];
    let depth = 0;

    while (level.length) {
        const next = [];
        for (const node of level) {
            if (node.left) next.push(node.left);
            if (node.right) next.push(node.right);
        }
        level = next;
        depth++;
    }
    return depth;
};

Each loop iteration handles exactly one level: level holds all nodes of the current level, next collects all nodes of the level below, and depth++ counts the level you just finished.

Simulation
Iteration	level (current)	next (children collected)	depth after
1	[1]	[2, 3]	1
2	[2, 3]	2 adds 4, 5; 3 adds nothing → [4, 5]	2
3	[4, 5]	4 adds nothing; 5 adds 6 → [6]	3
4	[6]	[]	4
end	[]	loop stops	4 ✓

The loop ends when level is empty, meaning there was no level below the last one.

Solution 2: single queue with levelSize
javascript
var maxDepth = function(root) {
    if (!root) return 0;

    const queue = [root];
    let head = 0;      // pointer instead of shift(), so dequeue is O(1)
    let depth = 0;

    while (head < queue.length) {
        const levelSize = queue.length - head;   // nodes in the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue[head++];
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        depth++;
    }
    return depth;
};

The queue contains the current level followed by the next level, so you freeze the size at the start of each round. Only the first levelSize nodes belong to the current level.

Simulation
Round	queue (full array)	head	levelSize	Nodes processed	depth
1	[1]	0	1	1 → pushes 2, 3	1
2	[1, 2, 3]	1	2	2 → pushes 4, 5; 3 → nothing	2
3	[1, 2, 3, 4, 5]	3	2	4 → nothing; 5 → pushes 6	3
4	[1, 2, 3, 4, 5, 6]	5	1	6 → nothing	4
end	head = 6 = length			loop stops	4 ✓
Solution 3: queue of [node, depth] pairs
javascript
var maxDepth = function(root) {
    if (!root) return 0;

    const queue = [[root, 1]];
    let head = 0, max = 0;

    while (head < queue.length) {
        const [node, d] = queue[head++];
        max = Math.max(max, d);
        if (node.left) queue.push([node.left, d + 1]);
        if (node.right) queue.push([node.right, d + 1]);
    }
    return max;
};

No level-size trick is needed because each node carries its own depth. Because BFS visits nodes in level order, the last node dequeued has the maximum depth, so max is just that final d.

Complexity
Time: O(n). Each node is enqueued and dequeued once.
Space: O(W), where W is the maximum width of the tree.
Complete or balanced tree: the last level has about n/2 nodes, so O(n).
Skewed tree: one node per level, so O(1).
This is the opposite of DFS, where space is O(H). Skewed trees are the best case for BFS and the worst case for DFS, and wide trees are the reverse.
One detail to remember

Using queue.shift() is correct and fine for interviews, but on large arrays it can be O(n) per call in some engines. The head pointer or the two-array approach avoids that.

To check your understanding, write the trace table for solution 2 on the tree 1(2(3(4))) (a left-skewed chain). You should see levelSize stay at 1 every round and the answer come out as 4. Then try the right-skewed one too. */