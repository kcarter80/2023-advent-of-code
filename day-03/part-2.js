const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-03/input'),
})

let schematic = new Array

readInterface.on('line', function (line) {
    schematic.push(line.split(''))
}).on('close', function () {
    let runningNumber = ''
    let eligibleGears = {}
    let eligibleGear = null
    for (let i = 0; i < schematic.length; i++) {
        for (let ii = 0; ii < schematic[i].length; ii++) {
            if (isNaN(schematic[i][ii]) || ii == 0) { // . or symbol or new y
                if (runningNumber && eligibleGear) {
                    if (eligibleGear in eligibleGears)
                        eligibleGears[eligibleGear].push(runningNumber)
                    else
                        eligibleGears[eligibleGear] = [runningNumber]
                    eligibleGear = null
                }
                runningNumber = ''
            }
            if (!isNaN(schematic[i][ii])) {
                runningNumber += schematic[i][ii]
                for (let y = i - 1; y <= i + 1; y++) {
                    for (let x = ii - 1; x <= ii + 1; x++) {
                        if (y >= 0 && y < schematic.length && x >= 0 && x < schematic[0].length) {
                            if (schematic[y][x] == '*') {
                                eligibleGear = `${y},${x}`
                            }
                        }

                    }
                }
            }
        }
    }
    let sum = 0
    Object.values(eligibleGears).forEach((parts) => {
        if (parts.length == 2) {
            sum += parts[0] * parts[1]
        }
    })
    console.log(sum)
    
    //.forEach((number) => console.log(number));
})