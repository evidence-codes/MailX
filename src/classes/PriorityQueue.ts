import { Reminder } from "../models/reminder.model";

export class PriorityQueue {
  private heap: Reminder[];

  constructor() {
    this.heap = [];
  }

  // Method to add a reminder to the queue
  enqueue(reminder: Reminder) {
    this.heap.push(reminder);
    this.bubbleUp();
  }

  // Method to remove the reminder with the earliest scheduledTime
  dequeue(): Reminder | undefined {
    if (this.heap.length === 0) return undefined;

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown();

    return root;
  }

  // Peek the reminder with the earliest scheduledTime without removing it
  peek(): Reminder | undefined {
    return this.heap[0];
  }

  contains(reminder: Reminder) {
    // Logic to check if the reminder is already in the queue
    return this.heap.some((r) => r.id === reminder.id);
  }

  // Helper method to maintain the min-heap property when adding a new reminder
  private bubbleUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (element.scheduledTime >= parent.scheduledTime) break;

      this.heap[index] = parent;
      index = parentIndex;
    }

    this.heap[index] = element;
  }

  // Helper method to maintain the min-heap property when removing the root reminder
  private bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swapIndex = -1;

      if (leftChildIndex < length) {
        if (this.heap[leftChildIndex].scheduledTime < element.scheduledTime) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        if (
          (swapIndex === -1 &&
            this.heap[rightChildIndex].scheduledTime < element.scheduledTime) ||
          (swapIndex !== -1 &&
            this.heap[rightChildIndex].scheduledTime <
              this.heap[leftChildIndex].scheduledTime)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === -1) break;

      this.heap[index] = this.heap[swapIndex];
      index = swapIndex;
    }

    this.heap[index] = element;
  }
}
