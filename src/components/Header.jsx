import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
    position: fixed;
    top: 0px;
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 165px;
    padding: 60px;
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
    return (
        <HeaderWrapper>
            <Link to="/dragable">dragable</Link>
            <Link to="/headerOverly">headerOverly</Link>
            <Link to="/scrollDownShow">scrollDownShow</Link>
            <Link to="/singleComponents">singleComponents</Link>
            <Link to="/sliderAnimation">sliderAnimation</Link>
        </HeaderWrapper>
    )
}

export default Header
