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

function CarouselWithTimer() {
    const [showItem, setShowItem] = useState(1)
    const waitSeconds = useRef(dummyData[0].second * 1000)
    const intervalRef = useRef(null)

    // 操作上一頁、下一頁。第一頁從 1 開始，所以 0 是最後一頁、length + 1 是第一頁。
    function handleSetShowItem(value) {
        if (showItem + value === 0) {
            setShowItem(dummyData.length)
        } else if (showItem + value === dummyData.length + 1) {
            setShowItem(1)
        } else {
            setShowItem(showItem + value)
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
    }, [showItem])

    return (
        <CarouselsWrapper>
            <CarouselWrapper>
                {dummyData.length > 0 &&
                    dummyData.map((item) => {
                        const translateX = `translateX(${(item.id - showItem) * 100 + '%'})`
                        return (
                            <CarouselContainer key={item.id} borderColor={item.color} translateX={translateX}>
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
                            return <DotContainer key={item.id} isActive={isActive} onClick={() => setShowItem(item.id)}></DotContainer>
                        })}
                </DotsContainer>
            </CarouselWrapper>
        </CarouselsWrapper>
    )
}

export default CarouselWithTimer
