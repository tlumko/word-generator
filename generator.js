module.exports = {
    generateWord,
}

function generateWord({nodes, edges}) {
    const start = nodes.find(n => n.id === 1)
    const end = nodes.find(n => n.id === 0)
    const path = []

    let current = start
    path.push(current)

    while (current.id !== end.id) {
        const edge = chooseRandomEdge(edges, current)
        current = nodes.find(node => node.id === edge.to)

        path.push(current)
    }

    const word = path.slice(1, -1).reduce((str, node) => str += node.name, '')
    return word
}

function chooseRandomEdge(edges, node) {
    const availableEdges = edges.filter(edge => edge.from === node.id)
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