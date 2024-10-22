const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()
const port = 3000

const conn = require('./db/conn')

const Result = require('./models/Result')
const User = require('./models/User')

const resultsRoutes = require('./routes/resultsRoutes')
const authRoutes = require('./routes/authRoutes')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const routes = require("./routes")

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(
    session({
        name:"session",
        secret:"my_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: () => {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure:false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

app.use(flash())

app.use(express.static("public"))

app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

app.use(express.json())


app.use('/', routes)
app.use('/results', resultsRoutes)
app.use('/', authRoutes)

conn
    .sync()
    // .sync({force:true})
    .then(() => {
        app.listen(port, () => {
            console.log("Started server at port:", port)
        })
    })
    .catch((err) => console.log(err))
