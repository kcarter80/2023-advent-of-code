const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-01/input'),
})


let sum = 0
readInterface.on('line', function(line) {
    let digits = new Array
    for (let i = 0; i < line.length; i++) {
        if (!isNaN(+line[i])) digits.push(line[i])
    }
    //console.log(digits[0] + digits[digits.length - 1])
    sum += parseInt(digits[0] + digits[digits.length - 1])
}).on('close', function() {
    console.log(sum)
})