let hello = (name, cb) => {
    console.log(`Hello ${name}`);
    cb(name)
}

let sayWelcome = (name) => {
    console.log(`Welcome ${name}`);
}

let name = "Raman"
hello(name, name => console.log(`Bye ${name}`))

