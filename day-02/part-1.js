const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-02/input'),
})

let games = new Array
let sum = 0
let gameNumber = 1
readInterface.on('line', function(line) {
    const splitGame = line.split(': ')[1].split('; ')
    let valid = true
    for (let i = 0; i < splitGame.length; i++) {
        let handful = splitGame[i].split(', ')
        console.log('handful',handful)
        for (let ii = 0; ii < handful.length; ii++) {
            const number = handful[ii].split(' ')[0]
            const color = handful[ii].split(' ')[1]
            
            if (color == 'red' && number > 12) { valid = false; break }
            if (color == 'green' && number > 13) { valid = false; break }
            if (color == 'blue' && number > 14) { valid = false; break }
        }
        if (!valid) break
    }
    if (valid) sum += gameNumber
    gameNumber++
}).on('close', function() {
    console.log(sum)    
})