const express = require('express')
const ResultsController = require('../controllers/ResultsController')

const router = express.Router()

router.get('/', ResultsController.showAll)

module.exports = router