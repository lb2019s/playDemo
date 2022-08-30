class PriorityQueue {
    constructor(fn) {
        this.heap = [undefined]
        this.compareFn = fn ? fn : (a, b) => a - b
    }
    get size() {
        return this.heap.length - 1
    }
    swim(index) {
        let parentIndex = this.getParentIndex(index)
        while (index > 1 && this.compare(index, parentIndex) < 0) {
            this.swap(index, parentIndex)
            index = parentIndex
            parentIndex = this.getParentIndex(index)
        }
    }
    sink(index) {
        let leftIndex = this.getLeftIndex(index)
        let rightIndex = leftIndex + 1
        let selectIndex = this.compare(leftIndex, rightIndex) < 0 ? leftIndex : rightIndex
        while (index < this.size && this.compare(selectIndex, index) < 0) {
            this.swap(index, selectIndex)
            index = selectIndex
            leftIndex = this.getLeftIndex(index)
            rightIndex = leftIndex + 1
            selectIndex = this.compare(leftIndex, rightIndex) < 0 ? leftIndex : rightIndex
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
    peek() {
        return this.heap[1]
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
        let a = this.heap[i]
        let b = this.heap[j]
        if (a === undefined) {
            return 1
        }
        if (b === undefined) {
            return -1
        }
        return this.compareFn(a, b)
    }
}


const median = new MedianFinder()
// median.addNum(-1)
// console.log(median.min_pq.heap, median.max_pq.heap)
// console.log('', median.findMedian())
// median.addNum(-2)
// console.log(median.min_pq.heap, median.max_pq.heap)
// console.log('', median.findMedian())
// median.addNum(-3)
// console.log(median.min_pq.heap, median.max_pq.heap)
// console.log('', median.findMedian())
// median.addNum(-4)
// console.log(median.min_pq.heap, median.max_pq.heap)
// console.log('', median.findMedian())
// median.addNum(-5)
// console.log(median.min_pq.heap, median.max_pq.heap)
// console.log('', median.findMedian())

let max_pq = new PriorityQueue((a, b) => b - a)

max_pq.add(-2)
console.log(max_pq.heap)
max_pq.add(-3)
console.log(max_pq.heap)
max_pq.add(-4)
console.log(max_pq.heap)
max_pq.remove()
console.log(max_pq.heap)