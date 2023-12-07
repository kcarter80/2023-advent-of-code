//const times = [7,15,30]
//const records = [9,40,200]

const times = [54,81,70,88]
const records = [446,1292,1035,1007]
 
let solution = 1
for (let i = 0; i < times.length; i++) {
    let wins = 0
    for (let ii = 1; ii < times[i]; ii++) {
        let distance = ii * (times[i] - ii)
        if (distance > records[i]) wins++
    }
    solution *= wins
}

console.log(solution)