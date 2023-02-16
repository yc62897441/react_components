import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Header from '../components/Header.jsx'

const MouseEventWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 105px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border: 2px solid black;
`

const DragTarget = styled.div`
    user-select: none;
    cursor: grab;
    font-size: 50px;
    border: 2px solid saddlebrown;
`

const CounterButton = styled.div`
    border: 2px solid gainsboro;
    padding: 10px;
    cursor: pointer;
`

function MouseEvent() {
    const [count, setCount] = useState(0)
    const mouseX = useRef(0)
    const mouseY = useRef(0)
    const offsetX = useRef(0)
    const offsetY = useRef(0)
    const isDown = useRef(false)
    let div = ''

    useEffect(() => {
        div = document.querySelector('.mydiv')

        div.addEventListener('mousedown', mousedownEvent, false)
        window.addEventListener('mouseup', mouseupEvent, false)

        return () => {
            div.removeEventListener('mousedown', mousedownEvent, false)
            window.removeEventListener('mouseup', mouseupEvent, false)
            window.removeEventListener('mousemove', mousemoveEvent, false)
        }
    })

    function mousedownEvent(event) {
        isDown.current = true
        mouseX.current = event.pageX // 開始處
        mouseY.current = event.pageY
        window.addEventListener('mousemove', mousemoveEvent, false)
    }

    function mouseupEvent(event) {
        if (isDown.current) {
            offsetX.current = offsetX.current + event.pageX - mouseX.current // 前已累積移動量 + 結束處 - 開始處 = 最新已累積移動量
            offsetY.current = offsetY.current + event.pageY - mouseY.current
        }
        isDown.current = false
        window.removeEventListener('mousemove', mousemoveEvent, false)
    }

    function mousemoveEvent(event) {
        if (isDown.current) {
            const dx = event.pageX - mouseX.current // 目前位置(結束處) - 開始處 = 移動量
            const dy = event.pageY - mouseY.current
            div.style.transform = `translate(${offsetX.current + dx}px,${offsetY.current + dy}px)` // 前已累積移動量 + 移動量 = 累計確定移動量
        }
    }

    // 測試 re-render 是否會影響已累積移動量
    function handleCountPlus1() {
        setCount((n) => n + 1)
    }

    return (
        <MouseEventWrapper>
            <Header />
            <CounterButton onClick={handleCountPlus1}>count + 1。測試 useState re-render。目前 count = {count}</CounterButton>
            <DragTarget className="mydiv">drag me</DragTarget>
        </MouseEventWrapper>
    )
}

export default MouseEvent
