let express = require('express')
const dbConnection = require('./config/db.config')
let path = require('path')
let app = express() // object instanciate

app.get('/', (req, res) => {
    res.redirect(`${process.env.URL}/health-check`)
})
app.get('/health-check', (req, res) => {
    res.send("Welcome To Thoughts Web Server. All Okk!")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) // Serve static files from uploads folder

app.use('/api/users', require('./routes/user.routes'))


dbConnection()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}`);
        })
    })