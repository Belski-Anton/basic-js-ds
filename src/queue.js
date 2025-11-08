const { NotImplementedError } = require("../lib/errors");
const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  enqueue(value) {
    const node = new ListNode(value);
    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = this.tail = node;
    }
    this._size++;
  }

  dequeue() {
    if (!this.head) return undefined;
    const { value } = this.head;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this._size--;
    return value;
  }

  getUnderlyingList() {
    const toPlain = (node) =>
      node ? { value: node.value, next: toPlain(node.next) } : null;
    return toPlain(this.head);
  }

  get length() {
    return this._size;
  }
}

module.exports = {
  Queue,
};
