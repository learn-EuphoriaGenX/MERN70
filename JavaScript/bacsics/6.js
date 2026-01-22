// Loop


// let i = 1; // initialization
// while (i <= 10) { // condition check
//     console.log("Hello", i);
//     i++ // increment / decrement
// }


// let j = 0
// for (; j <= 10;) {
//     console.log("Hello", j);
//     j++
// }

// Nested For Loop
// for (let i = 1; i <= 5; i++) {
//     for (let j = 1; j <= i; j++) {
//         line += "* "
//     }
//     console.log(line);
//     line = "";
// }


let line = ""
let temp = 1;
let n = 6;
for (let i = 1; i <= n; i++) {
    // calculate gap
    for (let j = 1; j <= (n - i); j++) {
        line += "  "
    }
    // calculate star
    for (let k = 1; k <= temp; k++) {
        line += "* "
    }
    temp += 2
    console.log(line);
    line = "";
}






