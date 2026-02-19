let express = require('express')
let app = express() // object instanciate

app.get('/', (req, res) => {
    res.redirect(`${process.env.URL}/health-check`)
})
app.get('/health-check', (req, res) => {
    res.send("Welcome To Thoughts Web Server. All Okk!")
})


app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})