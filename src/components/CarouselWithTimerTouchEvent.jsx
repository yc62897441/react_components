import { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Button1 } from './components/Bottuns'

const CarouselsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const CarouselWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 300px;
    border: 5px solid black;
    overflow: hidden;

    .toLeft {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
    }
    .toRight {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
    }
`

const CarouselContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 10px solid black;
    border-color: ${({ borderColor }) => (borderColor ? borderColor : 'black')};
    transform: ${({ translateX }) => (translateX ? translateX : 'translateX(0%)')};
    transition: all 0.5s;
`

const DotsContainer = styled.div`
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const DotContainer = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #eeeeee;

    ${({ isActive }) =>
        isActive &&
        css`
            background-color: #bbbbbb;
        `}
`

const dummyData = [
    {
        id: 1,
        title: '標題1',
        color: 'red',
        second: 5,
    },
    {
        id: 2,
        title: '標題2',
        color: 'green',
        second: 3,
    },
    {
        id: 3,
        title: '標題3',
        color: 'blue',
        second: 2,
    },
]

function CarouselWithTimerTouchEvent() {
    const [showItem, setShowItem] = useState(1)
    const showIndexRef = useRef(1)
    const itemsNum = useRef(0)
    const waitSeconds = useRef(dummyData[0].second * 1000)
    const intervalRef = useRef(null)

    // 操作上一頁、下一頁。第一頁從 1 開始，所以 0 是最後一頁、length + 1 是第一頁。
    function handleSetShowItem(value) {
        if (showItem + value === 0) {
            setShowItem(dummyData.length)
            showIndexRef.current = dummyData.length
        } else if (showItem + value === dummyData.length + 1) {
            setShowItem(1)
            showIndexRef.current = 1
        } else {
            setShowItem(showItem + value)
            showIndexRef.current = showItem + value
        }
    }

    useEffect(() => {
        // 每個 CarouselContainer 有各自不同的停留時間
        waitSeconds.current = dummyData[showItem - 1].second * 1000

        // 重啟 timer，定時輪換 CarouselContainer
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            handleSetShowItem(1)
        }, waitSeconds.current)

        itemsNum.current = dummyData.length

        // 手機滑動
        touch =
            'ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)
        // 掛設手機滑動事件監聽器到 slideNewsWrapper 上
        sliderContainer = document.querySelector('#sliderContainer')
        sliderContainer.addEventListener('touchstart', touchstartEvent, false)

        return () => {
            sliderContainer.removeEventListener('touchstart', touchstartEvent, false)
            sliderContainer.removeEventListener('touchstart', touchmoveEvent, false)
            sliderContainer.removeEventListener('touchstart', touchendEvent, false)
        }
    }, [showItem])

    // 手機滑動事件參數
    let sliderContainer = '' // 用來儲存 querySelector DOM <SliderContainer>
    let touch = null
    let startPos = {} // 開始 touch 滑動的位置
    let endPos = {} // 結束 touch 滑動的位置
    let scrollDirection = '' // 這個引數判斷是垂直滾動還是水平滾動

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
        scrollDirection = Math.abs(endPos.x - startPos.x) > Math.abs(endPos.y - startPos.y) ? 0 : 1 // scrollDirection 為 0 時，為橫向滑動；為 1 時，為縱向滑動
        if (scrollDirection === 0) {
            event.preventDefault() // 阻止觸控事件的預設行為，即阻止滾屏
        }
    }
    function touchendEvent() {
        let duration = new Date() - startPos.time // 滑動的持續時間
        // 當為水平滾動時
        if (scrollDirection === 0) {
            // 滑動的持續時間 > 10 才執行，避免輕輕碰到就換頁
            if (Number(duration) > 10) {
                // 判斷是左移還是右移，當偏移量大於10時執行
                // (更新目前位置 index)
                if (endPos.x - startPos.x > 10) {
                    if (1 < showIndexRef.current) {
                        setShowItem(showIndexRef.current - 1)
                        showIndexRef.current -= 1
                    } else {
                        setShowItem(itemsNum.current)
                        showIndexRef.current = itemsNum.current
                    }
                } else if (endPos.x - startPos.x <= -10) {
                    if (showIndexRef.current < itemsNum.current) {
                        setShowItem(showIndexRef.current + 1)
                        showIndexRef.current += 1
                    } else {
                        setShowItem(1)
                        showIndexRef.current = 1
                    }
                }
            }
        }

        //解綁事件
        sliderContainer.removeEventListener('touchmove', touchmoveEvent, false)
        sliderContainer.removeEventListener('touchend', touchendEvent, false)
    }

    return (
        <CarouselsWrapper>
            <CarouselWrapper id="sliderContainer">
                {dummyData.length > 0 &&
                    dummyData.map((item) => {
                        const translateX = `translateX(${(item.id - showItem) * 100 + '%'})`
                        return (
                            <CarouselContainer
                                key={item.id}
                                borderColor={item.color}
                                translateX={translateX}
                            >
                                {item.title}
                            </CarouselContainer>
                        )
                    })}
                <Button1 className="toLeft" onClick={() => handleSetShowItem(-1)}>
                    &lt;
                </Button1>
                <Button1 className="toRight" onClick={() => handleSetShowItem(1)}>
                    &gt;
                </Button1>
                <DotsContainer>
                    {dummyData.length > 0 &&
                        dummyData.map((item) => {
                            const isActive = item.id === showItem ? true : false
                            return (
                                <DotContainer
                                    key={item.id}
                                    isActive={isActive}
                                    onClick={() => {
                                        setShowItem(item.id)
                                        showIndexRef.current = item.id
                                    }}
                                ></DotContainer>
                            )
                        })}
                </DotsContainer>
            </CarouselWrapper>
        </CarouselsWrapper>
    )
}

export default CarouselWithTimerTouchEvent
