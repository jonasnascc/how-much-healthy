const express = require("express")
const router = express.Router()

const path = require("path")
const basePath = path.join(__dirname, "templates")

router.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

module.exports = router