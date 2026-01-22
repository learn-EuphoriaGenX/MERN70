
let login = (username, password) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (username === "admin" && password === "admin") {
                res("Login done.")
            } else {
                rej("Invalid Email or Password.")
            }
        }, 3000);
    })
}
let scrollingReels = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("Reels Scroll done.")
        }, 5000);
    })
}
let logout = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("logout done.")
        }, 7000);
    })
}


let openInsta = async () => {
    try {
        let response = await login("admin", "admin")
        console.log(response);
        response = await scrollingReels()
        console.log(response);
        response = await logout()
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}
openInsta()






