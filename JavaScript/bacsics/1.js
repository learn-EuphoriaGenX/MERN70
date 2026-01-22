var x = 10;
var x = 89;
x = 56;
if (true) {
    var a = 23; // global scope
}
// console.log(a);

let y = "hello";
// let y = 19; ❌
y = 76;
if (true) {
    let b = 23; // local scope
}
// console.log(b);


const z = 12;
// const z = 34;
// z = 56;
if (true) {
    let c = 29; // local scope
}
console.log(c);
