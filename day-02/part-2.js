const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-02/input'),
})

let power = 0
readInterface.on('line', function(line) {
    const splitGame = line.split(': ')[1].split('; ')
    let maxRed = 0
    let maxBlue = 0
    let maxGreen = 0
    for (let i = 0; i < splitGame.length; i++) {
        let handful = splitGame[i].split(', ')
        for (let ii = 0; ii < handful.length; ii++) {
            const number = parseInt(handful[ii].split(' ')[0])
            const color = handful[ii].split(' ')[1]  
            if (color == 'red' && number > maxRed) maxRed = number
            if (color == 'green' && number > maxGreen) maxGreen = number
            if (color == 'blue' && number > maxBlue) maxBlue = number
        }
    }
    power += maxRed * maxBlue * maxGreen
}).on('close', function() {
    console.log(power)
})