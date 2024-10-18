module.exports = class HealthResultsController {
    static calculateBMI (height, weight) {
        const bmi = (weight/((height/100)**2))

        let category = "Underweight";
    
        if(bmi>=18.5 && bmi < 25) category = "Normal weight"
        else if(bmi>=25 && bmi<30) category = "Overweight"
        else if(bmi>30) category = "Obesity"

        return {value:bmi.toFixed(2), category}
    }

    static calculateABSI (bmi, height, wc) {
        const absi = ((wc/100) / ((bmi.value**(2/3)) * ((height/100)**(1/2))))
    
        return absi;
    }

    static calculateBFP (bmi, age, sex) {
        let sexVal;
        if(sex == "male") sexVal = 0
        else if(sex == "female") sexVal = 1
        
        const bmiVal = bmi.value

        console.log({bmi, age, sexVal})
        
        const bf = -44.988 + (0.503 * age) + (10.689 * sexVal) + (3.172 * bmiVal) - (0.026 * (bmiVal**2)) + (0.181 * bmiVal * sexVal) - (0.02 * bmiVal * age) - (0.005 * (bmiVal**2) * sexVal) + (0.00021 * (bmiVal**2) * age)

        let fat;
        if(((sexVal==1) && (bf>=10 && bf<=13)) || ((sexVal==0) && (bf>=2 && bf<=5))) fat = "Essential fat"
        else if(((sexVal==1) && (bf>=14 && bf<=20)) || ((sexVal==0) && (bf>=6 && bf<=13))) fat = "Athlete"
        else if(((sexVal==1) && (bf>=21 && bf<=24)) || ((sexVal==0) && (bf>=14 && bf<=17))) fat = "Fitness"
        else if(((sexVal==1) && (bf>=25 && bf<=31)) || ((sexVal==0) && (bf>=18 && bf<=24))) fat = "Average"
        else if(((sexVal==1) && bf>=32) || ((sexVal==0) && bf>=25)) fat = "Obese"

        return {
            value: bf.toFixed(2),
            error: {min: (bf * (1 - 0.0466)).toFixed(2), max: (bf * (1 + 0.0466)).toFixed(2)},
            category: fat
        }
    }
}