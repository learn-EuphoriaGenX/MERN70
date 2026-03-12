let express = require('express')
const dbConnection = require('./config/db.config')
let path = require('path')
let app = express() // object instanciate
let { postUploadLimitResetJob, subscriptionStatusCheckJob } = require('./utils/node.utils')
let cors = require('cors')

app.get('/', (req, res) => {
    res.redirect(`${process.env.URL}/health-check`)
})
app.get('/health-check', (req, res) => {
    res.send("Welcome To Thoughts Web Server. All Okk!")
})

postUploadLimitResetJob.start()
subscriptionStatusCheckJob.start()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) // Serve static files from uploads folder

app.use('/api/users', require('./routes/user.routes'))
app.use('/api/posts', require('./routes/posts.route'))
app.use('/api/subscription', require('./routes/subscription.route'))


dbConnection()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}`);
        })
    })