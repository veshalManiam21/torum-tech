// FIFO: First-in, first-out, LIFO: Last-in, first-out (stack)
type QueueType = 'FIFO' | 'LIFO';

export class QueueService<T> {
  private queue: T[];
  private queueType: QueueType;

  constructor(queueType: QueueType = 'FIFO') {
    this.queue = [];
    this.queueType = queueType;
  }

  get length() {
    return this.queue.length;
  }

  /**
   * Gets the first item in the queue for FIFO,
   * gets the last item in the queue for LIFO
   */
  get currentItem() {
    const currentIndex = this.queueType === 'FIFO' ? 0 : this.length - 1;
    return this.queue[currentIndex];
  }

  /**
   * Adds a new item at the end of the queue.
   */
  add(...items: T[]) {
    this.queue.push(...items);
  }

  /**
   * Removes the first item in the queue for FIFO,
   * removes the last item in the queue for LIFO
   */
  next() {
    if (this.queueType === 'FIFO') {
      this.queue.shift();
    } else {
      this.queue.pop();
    }
  }

  /**
   * Clears the queue.
   */
  clear() {
    this.queue.splice(0, this.length);
  }
}
