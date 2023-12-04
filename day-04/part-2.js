const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-04/input'),
})

let winningNumbers = []
let cardNumbers = []
readInterface.on('line', function (line) {
    line = line.replaceAll('  ',' ')
    winningNumbers.push(line.split(': ')[1].split(' | ')[0].split(' '))
    cardNumbers.push(line.split(': ')[1].split(' | ')[1].split(' '))
}).on('close', function () {
    let cardCopies = {}
    winningNumbers.forEach((element,index) => cardCopies[index + 1] = 1)
    for (let i = 0; i < winningNumbers.length; i++) {
        let matches = 0
        cardNumbers[i].forEach((number) => {
            if (winningNumbers[i].includes(number)) matches++
        })
        for (let ii = i + 2; ii < i + 2 + matches; ii++) {
            cardCopies[ii] += cardCopies[i+1]
        }
        console.log(cardCopies)
    }
    console.log(Object.values(cardCopies).reduce((acc, value) => acc + value))
})