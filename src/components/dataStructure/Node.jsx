import styled from 'styled-components'

const Div = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 2px solid black;
    border-radius: 50%;
`

class Node {
    constructor(value) {
        this.value = value
        this.id = `node id ${value}`
        // this.domElement = `<div>${this.value}</div>`
        this.domElement = <Div id={this.id}>{this.value}</Div>
    }
}

export { Node }
