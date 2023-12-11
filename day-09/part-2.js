const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-09/input')
})

let histories = new Array
readInterface.on('line', function (line) {  
    histories.push(line.split(' ').map(value => parseInt(value)))
}).on('close', function () {
    let sum = 0
    for (let i = 0; i < histories.length; i++) {
        let differencesSequence = [differences(histories[i])]
        while (!differencesSequence[differencesSequence.length-1].every(value => value === 0)) {
            differencesSequence.push(differences(differencesSequence[differencesSequence.length-1]))
        }
        let placeholder = 0
        for (let ii = differencesSequence.length - 2; ii >= 0; ii--) {
            placeholder = differencesSequence[ii][0] - placeholder
        }
        console.log(histories[i][0] - placeholder)
        sum += histories[i][0] - placeholder
    }
    console.log(sum)
})

function differences(input) {
    let result = new Array
    for (let i = 1; i < input.length; i++) {
        result.push(input[i] - input[i-1])
    }
    return result
}