import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/Header.jsx'
import { headerHeight } from '../components/Header.jsx'

const HeaderWrapper = styled.header`
    position: relative;
    top: 0px;
    width: 100vw;
    height: 60px;
    padding: 10px 0;
    margin-top: ${headerHeight};
    z-index: 999;
`

const MobileNavOverly = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -9997;
    background: rgba(1, 2, 2, 0.6);
    display: ${({ isToggleOn }) => (isToggleOn ? 'block' : 'none')};
    transition: ease-in-out 0.2s;
    @media (min-width: 992px) {
        display: none;
    }
`

const Div = styled.div`
    z-index: 9998;
`

const Button = styled.button`
    z-index: 9998;
`

function HeaderOverly() {
    const [isToggleOn, setIsToggleOn] = useState(false)

    // 手機版尺寸時，點選  <NavToggleBarWrapper /> 顯示 <MobileNavOverly>
    function handleToggle() {
        setIsToggleOn((n) => !n)
    }

    // 監聽使用者視窗大小改變，切換成電腦版時，隱藏 <MobileNavOverly>
    function handleRWD() {
        if (window.innerWidth > 992) {
            setIsToggleOn(false)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleRWD)
        if (window.innerWidth > 992) {
            setIsToggleOn(false)
        }
        return () => {
            window.removeEventListener('resize', handleRWD)
        }
    }, [])

    window.removeEventListener('resize', handleRWD)

    return (
        <>
            <Header />
            {/* TODO: 功能展示請完善 */}
            <h1>???</h1>
            <HeaderWrapper>
                <Div>
                    <Button onClick={() => handleToggle()}>Show modal(at the same while triggering MobileNavOverly)</Button>
                </Div>
                <MobileNavOverly isToggleOn={isToggleOn} />
            </HeaderWrapper>
        </>
    )
}

export default HeaderOverly
