// repeat 2
class PriorityQueue {
    constructor() {
        this.heap = [null]
    }
    get size() {
        return this.heap.length - 1
    }
    swim(index) {
        let parentIndex = this.getParentIndex(index)
        while (index > 1 && this.compare(index, parentIndex)) {
            this.swap(index, parentIndex)
            index = parentIndex
            parentIndex = this.getParentIndex(index)
        }
    }
    sink(index) {
        let leftIndex = this.getLeftIndex(index)
        let rightIndex = leftIndex + 1
        let selectChild = this.compare(leftIndex, rightIndex) ? leftIndex : rightIndex
        while (index < this.heap.length && this.compare(selectChild, index)) {
            this.swap(index, selectChild)
            index = selectChild
            leftIndex = this.getLeftIndex(index)
            rightIndex = leftIndex + 1
            selectChild = this.compare(leftIndex, rightIndex) ? leftIndex : rightIndex
        }
    }
    add(item) {
        this.heap.push(item)
        this.swim(this.size)
    }
    remove() {
        const first = this.heap[1]
        this.swap(1, this.size)
        this.heap.pop()
        this.sink(1)
        return first
    }
    getParentIndex(index) {
        return index >> 1
    }
    getLeftIndex(index) {
        return index * 2
    }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
    }
    compare(i, j) {
        return this.heap[i] < this.heap[j]
    }
}

let pq = new PriorityQueue()
let arr = [1, 4, 3, 4, 7, 2, 9]
arr.forEach(item => pq.add(item))
console.log(pq.heap)
arr.forEach(() => console.log(pq.remove()))