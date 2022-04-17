function unique(array) {
    return [...new Set(array)]
    return array.filter((item, index, array) => {
        return array.indexOf(item) === index
    })
}

console.log(unique(['', '1', '', '1', 2, 2, 3, {}, {}, NaN, NaN]))