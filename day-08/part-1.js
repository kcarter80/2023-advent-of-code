const readline = require('readline')
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-08/input')
})

let i = 0
let instructions
let nodes = new Object
readInterface.on('line', function (line) {  
    if (i == 0) instructions = line.split('')
    if (i > 1) {
        nodes[line.split(' = ')[0]] = line.split(' = ')[1].slice(1, -1).split(', ')
    }
    i++
    
}).on('close', function () {
    let currentNode = 'AAA'
    let instructionsIndex = 0
    let steps = 0
    while (currentNode != 'ZZZ') {
        steps++
        let instruction = instructions[instructionsIndex] == 'L' ? 0 : 1
        currentNode = nodes[currentNode][instruction]

        instructionsIndex++
        if (instructionsIndex == instructions.length) instructionsIndex = 0
    }
    console.log(steps)
})