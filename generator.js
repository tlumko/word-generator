const { vowels } = require('./constants')

module.exports = {
    generateWord,
}

function generateWord({nodes, edges}) {
    const start = nodes.find(n => n.id === 0)
    const end = nodes.find(n => n.id === 1)
    const path = []

    let currentNode = start
    path.push(currentNode)

    while (currentNode.id !== end.id) {
        const edge = chooseRandomEdge({edges, currentNode})

        if (edge) {
            currentNode = nodes.find(node => node.id === edge.to)
        } else {
            currentNode = end
        }

        path.push(currentNode)
    }

    const word = path.slice(1, -1).reduce((str, node) => str += node.name, '')
    return word
}

function chooseRandomEdge({edges, currentNode}) {
    let availableEdges = edges.filter(edge => edge.from === currentNode.id)

    const combindedWeight = availableEdges.reduce((sum, edge) => sum += edge.weight, 0)

    const rand = random(combindedWeight)
    let s = 0

    const chosenEdge = availableEdges.find(edge => {
        s += edge.weight

        if (s >= rand) {
            return edge
        }
    })

    return chosenEdge
}

function random(n) {
    return Math.floor(Math.random() * n)
}