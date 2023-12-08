const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-07/input')
})

// Define the rank order
const cardRank = ['J','2','3','4','5','6','7','8','9','T','Q','K','A']

let lines = new Array
readInterface.on('line', function (line) {  
    lines.push(line)
}).on('close', function () {


    lines.sort((a, b) => handScore(a) - handScore(b))
    let winnings = 0
    for (let i = 0; i < lines.length; i++) {
        winnings += (i + 1) * parseInt(lines[i].split(' ')[1])
    }
    console.log(winnings)
})

function countCharacter(str, char) {
    return str.split(char).length - 1;
}

function handScore(line) {
    let sortedLine = line.split(' ')[0].split('').sort().join('')
    let handScore
    const jokerCount = countCharacter(sortedLine,'J')
    if (sortedLine[0] == sortedLine[1] && sortedLine[1] == sortedLine[2] && sortedLine[2] == sortedLine[3] && sortedLine[3] == sortedLine[4])
        handScore = '7' // five of a kind
    else if (
        sortedLine[0] == sortedLine[1] && sortedLine[1] == sortedLine[2] && sortedLine[2] == sortedLine[3] ||
        sortedLine[1] == sortedLine[2] && sortedLine[2] == sortedLine[3] && sortedLine[3] == sortedLine[4]
    ) {
        if (jokerCount > 0) handScore = '7' // five of a kind
        else handScore = '6' // four of a kind
    }
    else if (
        sortedLine[0] == sortedLine[1] && sortedLine[1] == sortedLine[2] && sortedLine[3] == sortedLine[4] ||
        sortedLine[2] == sortedLine[3] && sortedLine[3] == sortedLine[4] && sortedLine[0] == sortedLine[1]
    ) {
        if (jokerCount > 0) handScore = '7' // five of a kind
        else handScore = '5' // full house
    } 
    else if (
        sortedLine[0] == sortedLine[1] && sortedLine[1] == sortedLine[2] ||
        sortedLine[1] == sortedLine[2] && sortedLine[2] == sortedLine[3] ||
        sortedLine[2] == sortedLine[3] && sortedLine[3] == sortedLine[4]
    ) {
            // jokerCount will be either 3 or 1
            if (jokerCount > 0) handScore = '6' // four of a kind
            else handScore = '4' // three of a kind
    }
    else if (
        sortedLine[0] == sortedLine[1] && sortedLine[2] == sortedLine[3] ||
        sortedLine[0] == sortedLine[1] && sortedLine[3] == sortedLine[4] ||
        sortedLine[1] == sortedLine[2] && sortedLine[3] == sortedLine[4]
    ) {
        if (jokerCount == 2) handScore = '6' // four of a kind
        else if (jokerCount == 1) handScore = '5' // full house
        else handScore = '3' // two pair
    }
    else if (
        sortedLine[0] == sortedLine[1] ||
        sortedLine[1] == sortedLine[2] ||
        sortedLine[2] == sortedLine[3] ||
        sortedLine[3] == sortedLine[4]
    ) {
        if (jokerCount > 0) handScore = '4' // three of a kind
        else handScore = '2' // pair
    }
    else {
        if (jokerCount > 0) handScore = '2' // pair
        else handScore = '1' // high card
    }
    handScore = handScore.toString() +
        (10 + cardRank.indexOf(line[0])).toString() +
        (10 + cardRank.indexOf(line[1])).toString() +
        (10 + cardRank.indexOf(line[2])).toString() +
        (10 + cardRank.indexOf(line[3])).toString() +
        (10 + cardRank.indexOf(line[4])).toString()
    return parseInt(handScore)
}