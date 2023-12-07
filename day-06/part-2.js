//const time = 30
//const record = 200

//const time = 71530
//const record = 940200

const time = 54817088
const record = 446129210351007
 
let wins = 0

for (let i = 1; i < time; i++) {
    let distance = i * (time - i)
    if (distance > record) wins++
}

console.log(wins)