import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'

const tempEdges = [
    {
        id: 'edge1',
        type: 'smoothstep',
        source: 'idStart1',
        target: 'idMiddle1',
        edge_label: 'idMiddle1',
        edge_value: 4000,
    },
    {
        id: 'edge2',
        type: 'smoothstep',
        source: 'idStart1',
        target: 'idMiddle2',
        edge_label: 'idMiddle2',
        edge_value: 0,
    },
    {
        id: 'edge3',
        type: 'smoothstep',
        source: 'idStart2',
        target: 'idMiddle2',
        edge_label: 'idMiddle2',
        edge_value: 5000,
    },
    {
        id: 'edge4',
        type: 'smoothstep',
        source: 'idStart1',
        target: 'idMiddle3',
        edge_label: 'idMiddle3',
        edge_value: 2500,
    },
    {
        id: 'edge5',
        type: 'smoothstep',
        source: 'idStart1',
        target: 'idMiddle4',
        edge_label: 'idMiddle4',
        edge_value: 3500,
    },
    {
        id: 'edge6',
        type: 'smoothstep',
        source: 'idMiddle1',
        target: 'idEnd1',
        edge_label: 'idEnd1',
        edge_value: 800,
    },
    {
        id: 'edge7',
        type: 'smoothstep',
        source: 'idMiddle1',
        target: 'idEnd3',
        edge_label: 'idEnd3',
        edge_value: 4000,
    },
    {
        id: 'edge8',
        type: 'smoothstep',
        source: 'idMiddle1',
        target: 'idEnd4',
        edge_label: 'idEnd4',
        edge_value: 400,
    },
    {
        id: 'edge9',
        type: 'smoothstep',
        source: 'idMiddle1',
        target: 'idEnd5',
        edge_label: 'idEnd5',
        edge_value: 400,
    },
    {
        id: 'edge10',
        type: 'smoothstep',
        source: 'idMiddle1',
        target: 'idEnd6',
        edge_label: 'idEnd6',
        edge_value: 400,
    },
    {
        id: 'edge11',
        type: 'smoothstep',
        source: 'idMiddle1',
        target: 'inEnd7',
        edge_label: 'inEnd7',
        edge_value: 400,
    },
    {
        id: 'edge12',
        type: 'smoothstep',
        source: 'idMiddle1',
        target: 'inEnd8',
        edge_label: 'inEnd8',
        edge_value: 400,
    },
    {
        id: 'edge13',
        type: 'smoothstep',
        source: 'idMiddle1',
        target: 'inEnd9',
        edge_label: 'inEnd9',
        edge_value: 400,
    },
    {
        id: 'edge14',
        type: 'smoothstep',
        source: 'idMiddle1',
        target: 'idEnd10',
        edge_label: 'idEnd10',
        edge_value: 400,
    },
    {
        id: 'edge15',
        type: 'smoothstep',
        source: 'idMiddle2',
        target: 'idEnd2',
        edge_label: 'idEnd2',
        edge_value: 5000,
    },
    {
        id: 'edge16',
        type: 'smoothstep',
        source: 'idMiddle3',
        target: 'idEnd2',
        edge_label: 'idEnd2',
        edge_value: 2500,
    },
]

const tempNodes = [
    {
        id: 'idStart1',
        type: 'nodeTypeStart',
        label: 'start1',
        value: 10000,
    },
    {
        id: 'idStart2',
        type: 'nodeTypeStart',
        label: 'start2',
        value: 5000,
    },
    {
        id: 'idMiddle1',
        type: 'nodeTypeMiddle',
        label: 'middle1',
        value: 4000,
    },
    {
        id: 'idMiddle2',
        type: 'nodeTypeMiddle',
        label: 'middle2',
        value: 5000,
    },
    {
        id: 'idMiddle3',
        type: 'nodeTypeMiddle',
        label: 'middle3',
        value: 2500,
    },
    {
        id: 'idMiddle4',
        type: 'nodeTypeMiddle',
        label: 'middle4',
        value: 3500,
    },
    {
        id: 'idEnd1',
        type: 'nodeTypeEnd',
        label: 'end1',
        value: 800,
    },
    {
        id: 'idEnd2',
        type: 'nodeTypeEnd',
        label: 'end2',
        value: 7500,
    },
    {
        id: 'idEnd3',
        type: 'nodeTypeEnd',
        label: 'end3',
        value: 400,
    },
    {
        id: 'idEnd4',
        type: 'nodeTypeEnd',
        label: 'end4',
        value: 400,
    },
    {
        id: 'idEnd5',
        type: 'nodeTypeEnd',
        label: 'end5',
        value: 400,
    },
    {
        id: 'idEnd6',
        type: 'nodeTypeEnd',
        label: 'end6',
        value: 400,
    },
    {
        id: 'inEnd7',
        type: 'nodeTypeEnd',
        label: 'end7',
        value: 400,
    },
    {
        id: 'inEnd8',
        type: 'nodeTypeEnd',
        label: 'end8',
        value: 400,
    },
    {
        id: 'inEnd9',
        type: 'nodeTypeEnd',
        label: 'end9',
        value: 400,
    },
    {
        id: 'idEnd10',
        type: 'nodeTypeEnd',
        label: 'end10',
        value: 400,
    },
]

const ReactFlowPageWrapper = styled.section`
    width: 100%;
    height: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
`

const ReactFlowWrapper = styled.section`
    width: 100%;
    height: calc(100vh - 40px);
    /* border: 2px solid #004da0; */
    /* box-shadow: 0px 0px 25px #80808078; */
    border: 2px dashed #000000;
    border-color: #aaaaaa;
`

function ReactFlowPage() {
    // nodes 跟 edges。API result + result2
    const [nodesFromAPI, setNodesFromAPI] = useState(tempNodes)
    const [edgesFromAPI, setEdgesFromAPI] = useState(tempEdges)
    const [nodesIdTypeTable, setNodesIdTypeTable] = useState([]) // 來儲存每個 node id 是對應 '起點'、'中間點'、'終點'。
    let startNodes = []
    let middleNodes = []
    let endNodes = []
    let formattedNodes = []
    let formattedEdges = []
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

    // 哪個 ElecType node 的 modal 要 show
    const [showStartNode, setShowStartNode] = useState(false) // 起點是否 show
    const [showMiddleNode, setShowMiddleNode] = useState(false) // 中間點是否 show
    const [showNodeId, setShowNodeId] = useState(null)

    // 哪個 end node 的 modal 要 show
    const [showEndNode, setShowEndNode] = useState(null)
    const [showEndNodeId, setShowEndNodeId] = useState(null)

    useEffect(() => {
        startNodes = []
        middleNodes = []
        endNodes = []
        formattedNodes = []
        const tempNodesIdTypeTable = {}

        nodesFromAPI.forEach((node) => {
            if (node.type === 'nodeTypeStart') {
                startNodes.push(node)
                tempNodesIdTypeTable[node.id] = '起點'
            } else if (node.type === 'nodeTypeMiddle') {
                middleNodes.push(node)
                tempNodesIdTypeTable[node.id] = '中間點'
            } else if (node.type === 'nodeTypeEnd') {
                endNodes.push(node)
                tempNodesIdTypeTable[node.id] = '終點'
            }
        })

        formatNodes(startNodes)
        formatNodes(middleNodes)
        formatNodes(endNodes)
        setNodesIdTypeTable(tempNodesIdTypeTable)

        setNodes(formattedNodes)

        function formatNodes(array) {
            array.forEach((node, index) => {
                const position = {
                    x:
                        node.type === 'nodeTypeStart'
                            ? 0
                            : node.type === 'nodeTypeMiddle'
                            ? 400
                            : 800 + 320 * (index % 2),
                    y:
                        node.type === 'nodeTypeStart' || node.type === 'nodeTypeMiddle'
                            ? index * 160
                            : index * 80,
                }
                const formattedNode = {
                    id: node.id,
                    position: position,
                    data: {
                        label: (
                            <>
                                <h1 className="node-h1">{node.label}</h1>
                                <div className="node-main">
                                    <div>
                                        <span className="node-span">id</span>：{node.id}
                                    </div>
                                    <div>
                                        <span className="node-span">數值</span>：{node.value} (單位)
                                    </div>
                                </div>
                            </>
                        ),
                    },
                    // sourcePosition: 'right',
                    // targetPosition: 'left',
                    sourcePosition:
                        node.type === 'nodeTypeStart'
                            ? 'right'
                            : node.type === 'nodeTypeMiddle'
                            ? 'right'
                            : 'right',
                    targetPosition:
                        node.type === 'nodeTypeStart'
                            ? 'left'
                            : node.type === 'nodeTypeMiddle'
                            ? 'left'
                            : 'left',

                    style: {
                        color: '#FEFEFE',
                        background: '#007CC2',
                        border: '2px solid #004da0',
                        fontSize: '16px',
                        width: 250,
                    },
                    connectable: false,
                    selectable: false,
                }
                formattedNodes.push(formattedNode)
            })
        }
    }, [])

    useEffect(() => {
        formattedEdges = []

        edgesFromAPI.forEach((edge) => {
            const formattedEdge = {
                id: edge.id,
                source: edge.source,
                target: edge.target,
                label: edge.edge_value,
                markerEnd: {
                    type: MarkerType.Arrow,
                    // type: MarkerType.ArrowClosed,
                    color: '#FF0072',
                },
                style: {
                    strokeWidth: 2,
                    // fill: '#ffcc00',
                    // stroke: '#ffcc00',
                    // stroke: '#004da0',
                    // fontSize: '30px',
                },
                // type: 'straight',
                // type: 'smoothstep',
                // type: 'step',
                // type: 'default',
                // animated: true,
            }
            formattedEdges.push(formattedEdge)

            setEdges(formattedEdges)
        })
    }, [edgesFromAPI])

    // TODO: call API 去抓 node 資料
    async function onNodeClick(event) {
        // 透過點擊事件，先找出 node 的主要 wrapper 元件(即 class 含有 "react-flow__node" 的 DOM element)
        let currentDomElement = event.target
        let nodeElement = null
        while (!nodeElement && currentDomElement !== undefined) {
            if (currentDomElement.classList.contains('react-flow__node')) {
                nodeElement = currentDomElement
            } else {
                currentDomElement = currentDomElement.parentElement
            }
        }
        if (!nodeElement) {
            return
        }

        // 打開 node modal 並設定相關資訊。
        if (nodeElement?.dataset?.id) {
            // 看點擊的 node 是 '起點'、'中間點'、'終點'，來決定打開不同的 node modal
            const nodeType = nodesIdTypeTable[nodeElement?.dataset?.id] //
            if (nodeType === '起點') {
                setShowStartNode(true)
                setShowNodeId(nodeElement?.dataset?.id)
            } else if (nodeType === '中間點') {
                setShowMiddleNode(true)
                setShowNodeId(nodeElement?.dataset?.id)
            } else if (nodeType === '終點') {
                setShowEndNode({
                    UID: nodeElement?.dataset?.id,
                    SITE_DESC: nodeElement?.innerText.split('\n')[0],
                })
                setShowEndNodeId(nodeElement?.dataset?.id)
            }
        } else {
            return
        }
    }

    function closeModal() {
        setShowStartNode(false)
        setShowMiddleNode(false)
        setShowNodeId(null)
    }

    return (
        <ReactFlowPageWrapper>
            <ReactFlowWrapper>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={(event) => onNodeClick(event)}
                >
                    <Controls />
                    <MiniMap />
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
            </ReactFlowWrapper>

            {/* 如果希望點擊 node 時可以打開 modal，另外製作 modal 元件 */}
            {/* <ModalStartNode
                show={showStartNode}
                showNodeId={showNodeId}
                closeModal={closeModal}
            />

            <ModalMiddleNode
                show={showMiddleNode}
                showNodeId={showNodeId}
                closeModal={closeModal}
            />

            {showEndNode && (
                <ModalEndNode
                    key={
                        'locationId' + showEndNode['ADDRESS'] + showEndNode['SITE_DESC'] + 'LocationModal'
                    }
                    showEndNode={showEndNode}
                    show={showEndNodeId === showEndNode.UID}
                    setShowEndNodeId={setShowEndNodeId}
                />
            )} */}
        </ReactFlowPageWrapper>
    )
}

export default ReactFlowPage
