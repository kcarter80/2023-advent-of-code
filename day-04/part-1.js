const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-04/input'),
})

let totalPoints = 0
readInterface.on('line', function (line) {
    line = line.replaceAll('  ',' ')
    let winningNumbers = line.split(': ')[1].split(' | ')[0].split(' ')
    let cardNumbers = line.split(': ')[1].split(' | ')[1].split(' ')
    let cardPoints = 0
    cardNumbers.forEach((number) => {
        if (winningNumbers.includes(number)) {
            if (cardPoints) cardPoints = cardPoints * 2
            else cardPoints = 1
        }
    })
    totalPoints += cardPoints
}).on('close', function () {
    console.log(totalPoints)
})