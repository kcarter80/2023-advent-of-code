const readline = require('readline')
const fs = require('fs')
const { finished } = require('stream')

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
    currentNodes = Object.keys(nodes).filter(str => str.endsWith('A'))
    let instructionsIndex = 0
    let steps = 0
    let eligibleSteps = Array.from({ length: currentNodes.length }, () => [])
    // array for each ghost of combinations of node and instruction index
    let combinationsSeen = Array.from({ length: currentNodes.length }, () => new Object)
    let finishedEvaluating = []
    while (steps < 100000) {
    //while (finishedEvaluating.length != currentNodes.length) {  
        let instruction = instructions[instructionsIndex] == 'L' ? 0 : 1

        for (let i = 0; i < currentNodes.length; i++) {
            if (currentNodes[i] in combinationsSeen[i]) {
                // if this combo hasn't been seen before
                if (!Object.keys(combinationsSeen[i][currentNodes[i]]).includes(instructionsIndex.toString()))
                    combinationsSeen[i][currentNodes[i]][instructionsIndex] = steps
                else { // remove the node since we've seen this combo before
                    //finishedEvaluating.push(i)
                    //console.log(combinationsSeen[i][currentNodes[i]][instructionsIndex.toString()],combinationsSeen[i][currentNodes[i]],'instructionsIndex',instructionsIndex,'steps',steps)
                }
            }
            else combinationsSeen[i][currentNodes[i]] = {[instructionsIndex]: steps}
            
            // if we haven't finished with this node
            if (!finishedEvaluating.includes(i)) {
                // navigate to next node
                currentNodes[i] = nodes[currentNodes[i]][instruction]
                if (currentNodes[i].endsWith('Z')) eligibleSteps[i].push(steps + 1)
            }
            
        }
        steps++
        instructionsIndex++
        if (instructionsIndex == instructions.length) instructionsIndex = 0
    }
    // 22103062509257 is the lcd
    console.log(eligibleSteps)
})