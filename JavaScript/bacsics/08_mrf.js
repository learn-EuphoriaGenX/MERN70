// map - filter - reduce


let sqNums = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => n * n)
let gt50Nums = [10, 12, 31, 14, 51, 16, 77, 68, 59].filter(n => n > 50)
let additionOfNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((a, b) => a + b, 5)