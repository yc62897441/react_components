import { useEffect } from 'react'
import styled from 'styled-components'

const DragableWrapper = styled.header`
    width: 100%;
    border: 1px solid black;
`

const DragContainer = styled.header`
    width: 100%;
    padding: 25px 0;
    border: 1px solid red;
`

const DragObject = styled.header`
    width: 100px;
    height: 100px;
    margin: 10px;
    border: 1px solid blue;
`

// 參考: https://ithelp.ithome.com.tw/articles/10057106
// TODO: 目前只能把 dragObject 拖到 dragContainer 中的最後一個位子，是否可以拖到中間，需再研究
function Dragable() {
    let dragObjects = []
    let dragContainers = []

    // 模板建立前，document.querySelector() 找不到 DOM 元素，所以等模板建立後再跑
    useEffect(() => {
        initDragSetting()
    }, [])

    function initDragSetting() {
        // 取消預設事件處理
        document.ondragover = function (e) {
            e.preventDefault()
        }
        document.ondrop = function (e) {
            e.preventDefault()
        }

        // 設定 dragObject
        dragObjects = document.querySelectorAll('.dragObject')
        for (let i = 0; i < dragObjects.length; i++) {
            dragObjects[i].draggable = true
            dragObjects[i].addEventListener(
                'dragstart',
                function (e) {
                    // 設定允許的 drag 運作效果
                    e.dataTransfer.effectAllowed = 'all'

                    // text/plain的意思是將文件設置為純文本的形式，瀏覽器在獲取到這種文件時並不會對其進行處理
                    e.dataTransfer.setData('text/plain', this.id)
                },
                false
            )
        }

        // 設定 dragContainer
        dragContainers = document.querySelectorAll('.dragContainer')
        for (let i = 0; i < dragContainers.length; i++) {
            // 被拖曳物件在 container 中移動到可放置的位置時
            dragContainers[i].addEventListener(
                'dragenter',
                function (e) {
                    e.preventDefault()
                },
                false
            )

            // 被拖曳物件在 container 中移動時
            dragContainers[i].addEventListener(
                'dragover',
                function (e) {
                    e.preventDefault()
                    // 'copy': A copy of the source item is made at the new location
                    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event
                    e.dataTransfer.dropEffect = 'copy'
                },
                false
            )

            // 被拖曳物件在 container 被放置時
            dragContainers[i].addEventListener(
                'drop',
                function (e) {
                    e.preventDefault()
                    e.stopPropagation()
                    if (e.target !== e.currentTarget) return false

                    if (e.dataTransfer.types.length > 0) {
                        for (let i = 0; i < e.dataTransfer.types.length; i++) {
                            if (e.dataTransfer.types[i] === 'text/plain') {
                                // 取得被拖曳的物件
                                let sourceid = e.dataTransfer.getData('text/plain')
                                let source = document.getElementById(sourceid)

                                // 原本的 container 中移除被拖曳的物件，在新的 container 中新增被拖曳的物件
                                // source.parentNode.removeChild(source)
                                // e.currentTarget.appendChild(source)
                                e.currentTarget.appendChild(source.parentNode.removeChild(source))
                            }
                        }
                        return false
                    }
                },
                false
            )
        }
    }

    return (
        <DragableWrapper>
            <DragContainer id="dragContainer1" className="dragContainer">
                <DragObject id="dragObject1" className="dragObject">
                    DragObject 1
                </DragObject>
                <DragObject id="dragObject2" className="dragObject">
                    DragObject 2
                </DragObject>
                <DragObject id="dragObject3" className="dragObject">
                    DragObject 3
                </DragObject>
                <DragObject id="dragObject4" className="dragObject">
                    DragObject 4
                </DragObject>
            </DragContainer>
            <br />
            <DragContainer id="dragContainer2" className="dragContainer"></DragContainer>
        </DragableWrapper>
    )
}

export default Dragable
