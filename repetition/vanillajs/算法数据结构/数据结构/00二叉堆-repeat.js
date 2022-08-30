class PriorityQueue {
    constructor() {
        this.heap = [null]
    }
    get size() {
        return this.heap.length - 1
    }
    getLeft(parent) {
        return parent * 2
    }
    getRight(parent) {
        return parent * 2 + 1
    }

    getParent(child) {
        return child >> 1
    }

    swim(i) {
        let parent = this.getParent(i)
        while (i > 1 && this.heap[i] < this.heap[parent]) {
            this.swap(i, parent)
            i = parent
            parent = this.getParent(parent)
        }
    }

    sink(i) {
        let j = this.getLeft(i)
        while (j <= this.size) {
            if (j < this.size && this.heap[j + 1] < this.heap[j]) {
                j++
            }
            if (this.heap[i] < this.heap[j]) break
            this.swap(i, j)
            i = j
            j = this.getLeft(j)
        }
    }

    add(item) {
        this.heap.push(item)
        this.swim(this.size)
    }

    remove() {
        let r = this.heap[1]
        this.swap(1, this.size)
        this.heap.pop()
        this.sink(1)
        return r
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
    }
}

let pq = new PriorityQueue()
let arr = Array.from({ length: 10 }).map(() => Math.floor(Math.random() * 100) - 40)
// arr.sort(() => Math.random() - 0.5)
arr.forEach(item => pq.add(item))
console.log(pq.heap)
arr.forEach(() => console.log(pq.remove()))