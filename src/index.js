const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// your code goes here
function getErrMessage(errMessage) {
    return {
        status: 'error',
        message: `${errMessage}`
    }
}

function successMessage(msg, operation) {
    return {
        status: 'success',
        message: `the ${msg} of given two numbers`,
        operation
    }
}

function isRange(output) {
    if (output > 1000000) {
        return getErrMessage('overflow')
    }    
    if (output < -1000000) {
        return getErrMessage('underflow')
    }
    return null;
}

function calculate(page, num1, num2) {
    if (num1 > 1000000 || num2 > 1000000) {
        return getErrMessage('overflow')
    }    
    
    if (num1 < -1000000 || num2 < -1000000) {
        return getErrMessage('underflow')
    }
    if (isNaN(num1) || isNaN(num2)) {
        return getErrMessage('Invalid data types')
    }
    if (page == '/add') {
        return isRange(num1+num2) ?  isRange(num1 + num2) :  successMessage('sum', {sum: num1 + num2})
    }
    else if (page == '/sub') {
        return isRange(num1-num2) ?  isRange(num1 - num2) : successMessage('difference ', {difference: num1-num2})
    }
    else if (page == '/multiply') {
        return isRange(num1*num2) ?  isRange(num1 * num2) :  successMessage('product ', {result: num1*num2})
    }
    else if (page == '/divide') {
        if (num2 == 0) {
            return getErrMessage('Cannot divide by zero')
        }
        else {
            return isRange(num1/num2) ?  isRange(num1 / num2) :  successMessage('division', {result: num1/num2})
        }
    }
}


app.get('/', (req, res) => {
    res.status(200).send('Hello world!')
})

app.post('/add', (req, res) => {
    const num1 = req.body.num1;
    const num2 = req.body.num2;
    const output = calculate(req.url, Number(num1), Number(num2))
    res.json(output)
})

app.post('/sub', (req, res) => {
    const num1 = req.body.num1
    const num2 = req.body.num2;
    const output = calculate(req.url,Number(num1), Number(num2))
    res.json(output)
})

app.post('/multiply', (req, res) => {
    const num1 = req.body.num1
    const num2 = req.body.num2;
    const output = calculate(req.url, Number(num1), Number(num2))
    res.json(output)
})

app.post('/divide', (req, res) => {
    const num1 = req.body.num1
    const num2 = req.body.num2;
    const output = calculate(req.url, Number(num1), Number(num2))
    res.json(output)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;