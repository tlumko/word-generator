const { createGraph } = require('./grahp')
const { generateWord } = require('./generator')

const fs = require('node:fs')
const readline = require('node:readline')
const path = require('path')

const list = 'base'

// graph()
generate()

async function graph() {
    const fileStream = fs.createReadStream(path.join(__dirname, `${list}.lst`))

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    const graph = await createGraph(rl)

    fs.writeFileSync(path.join(__dirname, `${list}.json`), JSON.stringify(graph))
}

async function generate() {
    const graph = require(`./${list}.json`)

    for(let i = 0 ; i < 100; i++) {
        console.log(generateWord(graph))
    }
}