import { useState, useRef, Fragment, useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/Header.jsx'
import Banner1 from '../assets/img/sliderBanner/1200px-Default_Banner.jpg'
import Banner2 from '../assets/img/sliderBanner/1200px-Default_Banner2.jpg'
import Banner3 from '../assets/img/sliderBanner/1200px-Default_Banner3.jpg'

const TouchWrapper = styled.div`
    width: 100%;
    margin-top: 105px;
`

const SliderWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 60px;

    @media (max-width: 768px) {
        width: 100%;
        height: 300px;
    }
    @media (min-width: 768px) {
        padding-top: 0px;
    }
`

const SlidersContainer = styled.div`
    width: 100%;
`

const SliderContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow: hidden;
    width: 100%;
    height: 215px;

    @media (min-width: 768px) {
        height: 600px;
    }
`

const ImgWrapper = styled.div`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    transform: ${({ movePx }) => (movePx > 10 ? `translateX(${movePx}%)` : `translateX(${movePx}%)`)};
    transition-duration: 0.5s;
`

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const DotWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 22px;
    margin: 5px 0px 0px;
`

const Dot = styled.div`
    width: 10px;
    height: 10px;
    background-color: ${({ isActive }) => (isActive ? '#000000' : '#808080')};
    border-radius: 50%;
    margin: 0px 5px;
    cursor: pointer;
`

const dummyBannerArray = [
    {
        img: Banner1,
        time: 4000,
        showContent: true,
    },
    {
        img: Banner2,
        time: 2000,
        showContent: false,
    },
    {
        img: Banner3,
        time: 2000,
        showContent: false,
    },
]

function Touch() {
    const [movePx, setMovePx] = useState(0)
    const currentStep = useRef(1)
    const timeoutRef = useRef(null)
    const directionRef = useRef('right')
    const nextTimeRef = useRef(dummyBannerArray[0].time)
    let time = nextTimeRef.current

    const totalImgNum = useRef(0)

    // 手機滑動事件參數
    let sliderContainer = '' // 用來儲存 querySelector DOM <SliderContainer>
    let touch = 'ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)
    let startPos = '' // 開始 touch 滑動的位置
    let endPos = '' // 結束 touch 滑動的位置
    let isScrolling = '' // 這個引數判斷是垂直滾動還是水平滾動

    // 自動切換 setTimeout 寫法。
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout((time) => {
        if (directionRef.current === 'right' && currentStep.current < dummyBannerArray.length) {
            setMovePx(100 * -1 * (currentStep.current - 1 + 1))
            currentStep.current = currentStep.current + 1
            nextTimeRef.current = dummyBannerArray[currentStep.current].time
        } else if (directionRef.current === 'right' && currentStep.current === dummyBannerArray.length) {
            setMovePx(100 * -1 * (currentStep.current - 1 - 1))
            currentStep.current = currentStep.current - 1
            directionRef.current = 'left'
            nextTimeRef.current = dummyBannerArray[currentStep.current - 1].time
        } else if (directionRef.current === 'left' && currentStep.current > 1) {
            setMovePx(100 * -1 * (currentStep.current - 1 - 1))
            currentStep.current = currentStep.current - 1
            nextTimeRef.current = dummyBannerArray[currentStep.current - 1].time
        } else if (directionRef.current === 'left' && currentStep.current === 1) {
            setMovePx(100 * -1 * (currentStep.current - 1 + 1))
            currentStep.current = currentStep.current + 1
            directionRef.current = 'right'
            nextTimeRef.current = dummyBannerArray[currentStep.current].time
        }
    }, time)

    useEffect(() => {
        totalImgNum.current = dummyBannerArray.length // 如果是從後端 call 資料回來，在 call 回資料後更新 totalImgNum.current
        sliderContainer = document.querySelector('#sliderContainer')
        sliderContainer.addEventListener('touchstart', touchstartEvent, false)
    }, [])

    // 使用者點擊 <Dot />，切換 slider 的分區
    function handleClickDot(index) {
        clearTimeout(timeoutRef.current)
        setMovePx(100 * -1 * index)
        currentStep.current = index + 1
        nextTimeRef.current = dummyBannerArray[index].time
    }

    // 手機滑動的 3 事件 functions。開始、持續滑動中、結束。
    function touchstartEvent(event) {
        touch = event.targetTouches[0] // touches 陣列物件獲得螢幕上所有的 touch，取第一個 touch
        startPos = { x: touch.pageX, y: touch.pageY, time: +new Date() } // 取第一個 touch 的座標值
        sliderContainer.addEventListener('touchmove', touchmoveEvent, false)
        sliderContainer.addEventListener('touchend', touchendEvent, false)
    }
    function touchmoveEvent(event) {
        // 當螢幕有多個 touch 或者頁面被縮放過，就不執行 move 操作
        if (event.targetTouches.length > 1 || (event.scale && event.scale !== 1)) return
        touch = event.targetTouches[0]
        endPos = { x: touch.pageX, y: touch.pageY }
        isScrolling = Math.abs(endPos.x - startPos.x) > Math.abs(endPos.y - startPos.y) ? 0 : 1 // isScrolling 為 0 時，為橫向滑動；為 1 時，為縱向滑動
        if (isScrolling === 0) {
            event.preventDefault() // 阻止觸控事件的預設行為，即阻止滾屏
        }
    }
    function touchendEvent() {
        if (isScrolling === 0) {
            const duration = +new Date() - startPos.time // 滑動的持續時間
            if (Number(duration) > 10) {
                if (endPos.x - startPos.x > 10) {
                    if (currentStep.current > 1) handleClickDot(currentStep.current - 2)
                } else if (endPos.x - startPos.x < -10) {
                    if (currentStep.current < totalImgNum.current) handleClickDot(currentStep.current - 0)
                }
            }
        }
        //解綁事件
        sliderContainer.removeEventListener('touchmove', touchmoveEvent, false)
        sliderContainer.removeEventListener('touchend', touchendEvent, false)
    }

    return (
        <TouchWrapper>
            <Header />
            <SliderWrapper>
                <SlidersContainer>
                    <SliderContainer id="sliderContainer">
                        {dummyBannerArray.map((banner, index) => (
                            <Fragment key={index}>
                                <ImgWrapper movePx={movePx}>
                                    <Img src={banner.img} alt="" />
                                </ImgWrapper>
                            </Fragment>
                        ))}
                    </SliderContainer>
                </SlidersContainer>
                <DotWrapper>
                    {dummyBannerArray.length > 0 &&
                        Array.from({ length: dummyBannerArray.length }, (_value, index) => {
                            return <Dot key={index} isActive={currentStep.current === index + 1} onClick={() => handleClickDot(index)}></Dot>
                        })}
                </DotWrapper>
            </SliderWrapper>
        </TouchWrapper>
    )
}

export default Touch
