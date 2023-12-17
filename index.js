const { createGraph } = require('./grahp')
const { generateWord } = require('./generator')

const fs = require('node:fs')
const readline = require('node:readline')
const path = require('path')

// graph()
generate()

async function graph() {
    const fileStream = fs.createReadStream(path.join(__dirname, 'base.lst'))

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    const graph = await createGraph(rl)

    fs.writeFileSync(path.join(__dirname, 'base-graph.json'), JSON.stringify(graph))
}

async function generate() {
    const graph = require('./base-graph.json')

    for(let i = 0 ; i < 100; i++) {
        console.log(generateWord(graph))
    }
}