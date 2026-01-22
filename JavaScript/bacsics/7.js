function print1(msg = "Default Message") { // parameter
    console.log(msg);
}

let print2 = (msg = "Default Message",) => {
    console.log(msg);
}


let sum = (...args) => { // rest operator
    let ans = 0;
    for (let i = 0; i < args.length; i++) {
        ans += args[i]
    }
    console.log(ans);
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
sum(...arr); // spread operator


// IIFE -> immediate invoked function expression
((msg) => { // arguments
    console.log(msg);
})("Hello from IIFE") // parameter





