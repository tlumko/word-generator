const { vowels } = require('./constants')

module.exports = {
    createGraph,
}

async function createGraph(rl) {
    const nodes = [
        {
            id: 0,
            name: 'start',
        },
        {
            id: 1,
            name: 'end'
        },
    ]

    const edges = []

    const stats = {}

    for await (const line of rl) {
      if (!line.length) {
        continue
      }

      if (line.startsWith('#')) {
        continue
      }

      const word = line.split(' ')[0]

      if (!word || !word.length) {
        continue
      }

      const vowelsCount = word
        .split('')
        .reduce((count, letter) => count += vowels.includes(letter) ? 1 : 0, 0)

      if (!stats[vowelsCount]) {
        stats[vowelsCount] = 0
      }

      stats[vowelsCount]++

      processWord(nodes, edges, word)
    }

    return {
        nodes,
        edges,
        stats
    }
}

function processWord(nodes, edges, word) {
    const start = nodes.find(n => n.id === 0)
    const end = nodes.find(n => n.id === 1)

    const syllablesCount = word.split('').reduce((count, letter) => {
        if (vowels.includes(letter)) {count++}
        return count
    }, 0)
    let currentSyllable = 0

    let prev = start
    let part = 1

    word.split('').forEach(letter => {
        const current = getNode(nodes, letter, part)

        useEdge(edges, prev, current)
        prev = current

        const lastSyllable = currentSyllable === syllablesCount
        if (part === 2 && !lastSyllable) {
            part = 1
            prev = getNode(nodes, letter, part)
        }

        if (vowels.includes(current.name)) {
            part = 2
            currentSyllable++
        }
    })

    useEdge(edges, prev, end)
}

function getNode(nodes, letter, part) {
    const existing = nodes.find(n => n.name === letter && n.part === part)

    if (existing) {
        return existing
    }

    nodes.push({
        name: letter,
        id: nodes.length,
        part,
    })

    return nodes[nodes.length-1]
}

function useEdge(edges, source, target) {
    let edge = edges.find(e => e.from === source.id && e.to === target.id)

    if (!edge) {
        edge = {
            from: source.id,
            to: target.id,
            weight: 0
        }

        edges.push(edge)
    }

    edge.weight++
}
