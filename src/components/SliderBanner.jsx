import { useState, useRef, Fragment } from 'react'
import styled from 'styled-components'
import Banner1 from '../assets/img/sliderBanner/1200px-Default_Banner.jpg'
import Banner2 from '../assets/img/sliderBanner/1200px-Default_Banner2.jpg'
import Banner3 from '../assets/img/sliderBanner/1200px-Default_Banner3.jpg'

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
        height: 920px;
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

function Slide() {
    const [movePx, setMovePx] = useState(0)
    const currentStep = useRef(1)
    const timeoutRef = useRef(null)
    const directionRef = useRef('right')
    const nextTimeRef = useRef(dummyBannerArray[0].time)
    let time = nextTimeRef.current

    // 使用者點擊 <Dot />，切換 slider 的分區
    function handleClickDot(index) {
        clearTimeout(timeoutRef.current)
        setMovePx(100 * -1 * index)
        currentStep.current = index + 1
        nextTimeRef.current = dummyBannerArray[index].time
    }

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

    return (
        <SliderWrapper>
            <SlidersContainer>
                <SliderContainer>
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
    )
}

export default Slide
