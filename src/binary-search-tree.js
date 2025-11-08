const { NotImplementedError } = require("../lib/errors");
const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const insert = (node, value) => {
      if (!node) return new Node(value);
      if (value < node.data) {
        node.left = insert(node.left, value);
      } else if (value > node.data) {
        node.right = insert(node.right, value);
      }
      return node;
    };
    this._root = insert(this._root, data);
  }

  has(data) {
    let node = this._root;
    while (node) {
      if (data === node.data) return true;
      node = data < node.data ? node.left : node.right;
    }
    return false;
  }

  find(data) {
    let node = this._root;
    while (node) {
      if (data === node.data) return node;
      node = data < node.data ? node.left : node.right;
    }
    return null;
  }

  remove(data) {
    const removeNode = (node, value) => {
      if (!node) return null;
      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      }
      if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      }
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minRight = node.right;
      while (minRight.left) minRight = minRight.left;
      node.data = minRight.data;
      node.right = removeNode(node.right, minRight.data);
      return node;
    };
    this._root = removeNode(this._root, data);
  }

  min() {
    let node = this._root;
    if (!node) return null;
    while (node.left) node = node.left;
    return node.data;
  }

  max() {
    let node = this._root;
    if (!node) return null;
    while (node.right) node = node.right;
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
