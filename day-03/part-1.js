const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-03/input'),
})

let schematic = new Array

readInterface.on('line', function (line) {
    schematic.push(line.split(''))
}).on('close', function () {
    let sum = 0
    let runningNumber = ''
    let validNumber = false
    for (let i = 0; i < schematic.length; i++) {
        for (let ii = 0; ii < schematic[i].length; ii++) {
            if (isNaN(schematic[i][ii]) || ii == 0) { // . or symbol
                if (runningNumber) {
                    if (validNumber) sum += parseInt(runningNumber)
                    runningNumber = ''
                    validNumber = false
                }
            }
            if (!isNaN(schematic[i][ii])) {
                runningNumber += schematic[i][ii]
                for (let y = i - 1; y <= i + 1; y++) {
                    for (let x = ii - 1; x <= ii + 1; x++) {
                        if (y >= 0 && y < schematic.length && x >= 0 && x < schematic[0].length) {
                            if (isNaN(schematic[y][x]) && schematic[y][x] != '.') {
                                validNumber = true
                            }
                        }

                    }
                }
            }
        }
    }
    console.log(sum)
})