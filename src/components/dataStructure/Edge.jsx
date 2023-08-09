import styled from 'styled-components'

const Div = styled.div`
    width: 50px;
    height: 2px;
    background-color: #000000;
`

class Edge {
    constructor() {
        this.domElement = <Div></Div>
        this.nodes = []
    }

    addNode(node) {
        if (this.nodes.includes(node.id)) {
            return
        } else if (this.nodes.length >= 2) {
            return
        } else {
            this.nodes.push(node.id)
        }
    }

    connect() {
        if (this.nodes.length !== 2) return

        // TODO: 取得 node 的 position，在去連接 edge(調整寬度、旋轉角度等)
        const node1DomElement = document.getElementById(this.nodes[0])
        const node2DomElement = document.getElementById(this.nodes[1])
        const node1DomElementPosition = ''
        console.log('node1DomElement', `#${this.nodes[0]}`, node1DomElement)
        console.log('node2DomElement', `#${this.nodes[1]}`, node2DomElement)
    }
}

export { Edge }
