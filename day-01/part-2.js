const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-01/input'),
})

let numberWords = ['one','two','three','four','five','six','seven','eight','nine']
let sum = 0
readInterface.on('line', function (line) {
    let digits = new Array
    let i = 0
    while (i < line.length) {
        if (!isNaN(+line[i])) {
            digits.push(line[i])
        } else {
            for (let ii = 0; ii < numberWords.length; ii++) {
                let substring = line.substring(i,i + numberWords[ii].length)
                if (substring == numberWords[ii]) {
                    digits.push(String(ii+1))
                    break
                }  
            }
        }
        i++
    }
    //console.log(line,digits,digits[0] + digits[digits.length - 1])
    sum += parseInt(digits[0] + digits[digits.length - 1])
}).on('close', function () {
    console.log(sum)
})