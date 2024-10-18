const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const routes = require("./routes")

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

app.use(express.static("public"))

app.use('/', routes)

app.listen(port, () => {
    console.log("Started server at port:", port)
})