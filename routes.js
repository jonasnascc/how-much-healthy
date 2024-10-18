const express = require("express")
const router = express.Router()

const resultsController = require("./controllers/HealthResultsController")

router.get('/', (req, res) => {
    res.render('home')
})

router.post('/results', (req, res) => {
    const {
        height,
        weight,
        age,
        gender,
        waist_circumference
    } = req.body

    const bmi = resultsController.calculateBMI(height, weight)
    
    const output = {
        bmi,
        absi: resultsController.calculateABSI(bmi, height, waist_circumference),
        bfp: resultsController.calculateBFP(bmi, age, gender)
    }

    console.log()

    res.render('results', output)
})

module.exports = router