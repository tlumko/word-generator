const { vowels } = require('./constants')

module.exports = {
    generateWord,
}

function generateWord({nodes, edges}) {
    const syllablesCount = random(3) + 1
    let currentSyllable = 0

    const start = nodes.find(n => n.id === 0)
    const end = nodes.find(n => n.id === 1)
    const path = []

    let currentNode = start
    let consonantsStrike = 1
    path.push(currentNode)

    while (currentNode.id !== end.id) {
        const lastSyllable = currentSyllable === syllablesCount
        const edge = chooseRandomEdge({nodes, edges, currentNode, lastSyllable, end, consonantsStrike})
        currentNode = nodes.find(node => node.id === edge.to)

        if (vowels.includes(currentNode.name)) {
            currentSyllable++
            consonantsStrike = 0
        }

        if (currentNode.part === 2 && !lastSyllable) {
            currentNode = nodes.find(node => node.name === currentNode.name && node.part === 1)
        }

        path.push(currentNode)
        consonantsStrike++
    }

    const word = path.slice(1, -1).reduce((str, node) => str += node.name, '')
    return word
}

function chooseRandomEdge({nodes, edges, currentNode, lastSyllable, end, consonantsStrike}) {
    let availableEdges = edges.filter(edge => edge.from === currentNode.id)
    if (!lastSyllable) {
        availableEdges = availableEdges.filter(edge => edge.to !== end.id)
    }

    availableEdges = availableEdges.map(edge => {
        edge.tempWeight = edge.weight

        const target = nodes.find(node => node.id === edge.to)
        if (vowels.includes(target.name)) {
            edge.tempWeight = edge.tempWeight * consonantsStrike
        }

        return edge
    })

    const combindedWeight = availableEdges.reduce((sum, edge) => sum += edge.tempWeight, 0)

    const rand = random(combindedWeight)
    let s = 0

    const chosenEdge = availableEdges.find(edge => {
        s += edge.tempWeight

        if (s >= rand) {
            return edge
        }
    })

    return chosenEdge
}

function random(n) {
    return Math.floor(Math.random() * n)
}