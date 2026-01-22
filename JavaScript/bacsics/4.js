// condition
let num = 85;
if (num > 500) {
    if (num > 750) {
        console.log("Num is greater than 500 & 750");
    } else {
        console.log("Num is only greater than 500");
    }
} else if (num > 100) {
    if (num > 250) {
        console.log("Num is greater than 100 & 250");
    } else {
        console.log("Num is only greater than 100");
    }
} else {
    console.log("Num is only less than 100");
}

// calculate fine

let helmet = true
let lic = false
let ins = false;

let fine = 0;
if (!helmet) fine += 500
if (!lic) fine += 500
if (!ins) fine += 500
console.log(`Your fine amount $${fine}`);


