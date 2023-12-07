const readline = require('readline')
const fs = require('fs')

//let sources = '79 14 55 13'.split(' ').map( d => { return parseInt(d) })
let sources = '4188359137 37519573 3736161691 172346126 2590035450 66446591 209124047 106578880 1404892542 30069991 3014689843 117426545 2169439765 226325492 1511958436 177344330 1822605035 51025110 382778843 823998526'.split(' ').map( d => { return parseInt(d) })

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-05/input')
})

let maps
readInterface.on('line', function (line) {
    console.log(line)
    if (line == '') {
        // process the last category
        console.log('doing conversion')
        for (let i = 0; i < sources.length; i++) {
            console.log('from',sources[i])
            for (let ii = 0; ii < maps.length; ii ++) {
                let destinationRangeStart = maps[ii][0]
                let sourceRangeStart = maps[ii][1]
                let rangeLength = maps[ii][2]
                //console.log(sources[i],destinationRangeStart,sourceRangeStart,rangeLength)
                if (sources[i] >= sourceRangeStart && sources[i] < sourceRangeStart + rangeLength) {
                    sources[i] = sources[i] - (sourceRangeStart - destinationRangeStart)
                    break
                }
            }
            console.log('to',sources[i])
        }
        console.log(line)
    } // skip
    else if (line.includes(':')) {
        // new category
        maps = new Array
    } else {
        // category line
        maps.push(line.split(' ').map( d => { return parseInt(d) }))
    }
}).on('close', function () {
    console.log(sources)
    console.log(Math.min(...sources))
})