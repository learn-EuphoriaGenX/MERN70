// ARRAY
let fruits = ["Apple", "Banana", "Orange", "Mango"]
// let fruit1 = fruits[0]
// let fruit2 = fruits[1]
// let fruit3 = fruits[2]
// let fruit4 = fruits[3]

let [fruit1, fruit2, fruit3, fruit4] = fruits

// console.log(fruit1, fruit2, fruit3, fruit4);

console.log(fruits.length);
console.log(fruits.at(1)); // fruits[1]

// fruits.push("cherry")
// fruits.unshift("Orange")
// fruits.pop()
// fruits.shift()


// let newFruits = fruits.slice(1, 3)
fruits.splice(1, 2)

// console.log(fruits);




let users = {
    name: "Rahan",
    age: 34,
    dateOfBirth: '12-3-1989',
    aadhaar: "2345-1234-3434",
    pan: "CEU789098G"
}

// let name = users.name
// let age = users.age
// let dob = users.dateOfBirth
// let aadhaar = users.aadhaar
// let pan = users.pan

let { name, age, dateOfBirth: dob, aadhaar, pan } = users


// console.log(`My Name Is : ${name}\nMy Date-Of-Birth : ${dob} and Age is : ${age}\nAadhaar No: ${aadhaar}\nPan No: ${pan}`);

console.log(Object.keys(users));
console.log(Object.values(users));





