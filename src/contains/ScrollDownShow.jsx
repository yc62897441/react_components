import { useState } from 'react'
import styled, { css } from 'styled-components'
import Header from '../components/Header.jsx'

const ScrollDownShowWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 105px;
    margin-bottom: 500px;
`

const Aaa = styled.div`
    width: 80%;
    height: 400px;
    margin: 30px auto;
    border: 2px solid black;
    cursor: pointer;

    ${({ isActive }) =>
        isActive &&
        css`
            background-color: red;
            box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
            transition: all 0.3s;
        `}
`

const dummyData = [
    {
        id: 1,
        name: 'aaa',
    },
    {
        id: 2,
        name: 'bbb',
    },
    {
        id: 3,
        name: 'ccc',
    },
    {
        id: 4,
        name: 'ddd',
    },
]

function ScrollDownShow() {
    const [currentId, setCurrentId] = useState(dummyData[0].id)
    let windowScrollY = 0

    // 每次滾動頁面時，判斷是否需要更新 active <Aaa>
    addEventListener('scroll', () => {
        // 目前螢幕的高度位置
        windowScrollY = window.scrollY

        // 找到所有的 <Aaa>
        const Aaas = document.querySelectorAll('.Aaa')

        // 如果「目前螢幕的高度位置」到達該「<Aaa>的高度位置-300」時，把該 <Aaa> 顯示 active 樣式
        Aaas.forEach((item) => {
            const itemHeight = findPos(item)
            const itemId = Number(item.dataset.id)
            if (windowScrollY >= itemHeight - 300) {
                setCurrentId(Number(itemId))
            }
        })
    })

    // 尋找元素在畫面上的高度位置
    // 參考來源：https://www.quirksmode.org/js/findpos.html
    function findPos(targetObj) {
        let obj = targetObj
        let curtop = 0

        // 會往上找到 <body>，<body> 的 offsetParent 是 null
        while (obj) {
            if (obj.offsetParent) {
                curtop += obj.offsetTop
            } else {
                return curtop
            }
            obj = obj.offsetParent
        }
        return curtop
    }

    return (
        <>
            <Header />
            <h1>請滾動滑鼠滾輪</h1>
            <ScrollDownShowWrapper>
                {dummyData.length > 0 &&
                    dummyData.map((item, index) => (
                        <Aaa className="Aaa" isActive={item.id === currentId} key={item.id} data-id={item.id} onClick={() => setCurrentId(item.id)}>
                            {item.name}
                        </Aaa>
                    ))}
            </ScrollDownShowWrapper>
        </>
    )
}

export default ScrollDownShow
