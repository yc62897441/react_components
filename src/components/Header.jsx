import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const headerHeight = '150px'

const HeaderWrapper = styled.div`
    position: fixed;
    top: 0px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100vw;
    height: auto;
    padding: ${({ showHeader }) => (showHeader ? '30px' : '10px 30px')};
    background-color: #1abc9c;
    z-index: 9998;

    a {
        text-decoration: none;
        border: 2px solid #ffffff;
        border-radius: 10px;
        padding: 5px 7px;
        margin: 0 5px;
        color: white;
        font-size: 30px;
        text-align: center;
    }
`

function Header() {
    let windowScrollY = 0
    const [showHeader, setShowHeader] = useState(true)

    // How to Remove an Event listener in React
    // https://bobbyhadz.com/blog/react-remove-event-listener
    useEffect(() => {
        const countt = function () {
            windowScrollY = window.scrollY
            if (windowScrollY > 105) {
                setShowHeader(false)
            } else {
                setShowHeader(true)
            }
        }
        window.addEventListener('scroll', countt)

        // 👇️ remove the event listener when the component unmounts
        // 避免每次頁面中任何 useState 更新或是 re-render 時，都建立並累積一堆重複的事件監聽器。
        return () => {
            window.removeEventListener('scroll', countt)
        }
    }, [])

    return (
        <HeaderWrapper showHeader={showHeader}>
            <Link to="/chartJs">chartJs</Link>
            <Link to="/d3BubbleChart">d3BubbleChart</Link>
            <Link to="/dragable">dragable</Link>
            <Link to="/headerOverly">headerOverly</Link>
            <Link to="/lazyLoading">lazyLoading</Link>
            <Link to="/mouseEvent">mouseEvent</Link>
            <Link to="/openLayers">openLayers</Link>
            <Link to="/openLayers2">openLayers2</Link>
            <Link to="/scrollDownShow">scrollDownShow</Link>
            <Link to="/singleComponents">singleComponents</Link>
            <Link to="/sliderAnimation">sliderAnimation</Link>
            <Link to="/svgMap">svgMap</Link>
            <Link to="/svgTaiwanMap">svgTaiwanMap</Link>
            <Link to="/touch">touch</Link>
            <Link to="/touchBlog">touchBlog</Link>
            <Link to="/wordCloud">wordCloud</Link>
            <Link to="/xlsx">xlsx</Link>
        </HeaderWrapper>
    )
}

export default Header
