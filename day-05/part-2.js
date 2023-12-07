const readline = require('readline')
const fs = require('fs')

//let ranges = '79 14 55 13'.split(' ').map( d => { return parseInt(d) })
let ranges = '4188359137 37519573 3736161691 172346126 2590035450 66446591 209124047 106578880 1404892542 30069991 3014689843 117426545 2169439765 226325492 1511958436 177344330 1822605035 51025110 382778843 823998526'.split(' ').map( d => { return parseInt(d) })
                        
let sources = new Array
for (let i = 0; i < ranges.length - 1; i += 2) {
    sources.push([ranges[i],ranges[i] + ranges[i+1] - 1])
}

const readInterface = readline.createInterface({
    input: fs.createReadStream('./day-05/input')
})

let steps = new Array
readInterface.on('line', function (line) {
    if (line.includes(':')) {
        steps.push(new Array)
    } else if (line == '') {
        // skip
    } else {
        // category line
        steps[steps.length-1].push(line.split(' ').map( d => { return parseInt(d) }))
    }
}).on('close', function () {
    sources.forEach((source) => console.log(source))
    for (let i = 0; i < steps.length; i++) {
        // each step
        console.log(`step ${i}`)
        let stepMaps = steps[i]
        let mappedSources = new Array
        for (let ii = 0; ii < stepMaps.length; ii++) {
            // each map
            let map = stepMaps[ii]
            for (let iii = 0; iii < sources.length; iii++) {
                // each source
                let source = sources[iii]
                let sourceStart = source[0]
                let sourceEnd = source[1]
                let mapStart = map[1]
                let mapEnd = map[1] + map[2]
                let mapAdjustment = map[0] - map[1]
                if (mapStart > sourceEnd) {} // nothing to do
                else if (mapEnd < sourceStart) {} // nothing to do
                else if (mapStart <= sourceStart) {
                    //console.log(1)
                    if (mapEnd >= sourceEnd) {
                        // source falls entirely inside map
                        mappedSources.push(source.map(v=> v+mapAdjustment))
                    } else {
                        // mapEnds before source ends
                        mappedSources.push([sourceStart,mapEnd].map(v=> v+mapAdjustment))
                        // add source after map end
                        sources.push([mapEnd + 1,sourceEnd])
                    }
                    // remove source
                    sources.splice(iii, 1)
                    iii--
                }
                else {
                    //console.log(2)
                    // mapStart > sourceStart
                    // add source before map start
                    sources.push([sourceStart,mapStart-1])
                    if (mapEnd <= sourceEnd) {
                        // add mapped sources
                        mappedSources.push([mapStart,mapEnd].map(v=> v+mapAdjustment))
                        // add source after map end
                        if (mapEnd < sourceEnd) source.push([mapEnd + 1,sourceEnd])
                    } else {
                        // add mapped sources
                        mappedSources.push([mapStart,sourceEnd].map(v=> v+mapAdjustment))
                    }
                    // remove source
                    sources.splice(iii, 1)
                    iii--
                }


                //console.log(map,source,mapStart,mapEnd,sourceStart,sourceEnd,mapAdjustment)
            } // each source
        } // each map
        // take any remaining sources and add it to mapped sources
        sources = sources.concat(mappedSources)
        console.log('')
        let min = 0
        sources.forEach((source) => console.log(source))
    } // each step
    let min = Infinity
    sources.forEach((source) => {if (source[0] < min) min = source[0]})
    console.log(min)
})