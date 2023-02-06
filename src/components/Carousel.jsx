import { useState } from 'react'
import styled from 'styled-components'
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

const dummyData = [
    {
        id: 1,
        title: '標題1',
        color: 'red',
    },
    {
        id: 2,
        title: '標題2',
        color: 'green',
    },
    {
        id: 3,
        title: '標題3',
        color: 'blue',
    },
]

function Carousel() {
    const [showItem, setShowItem] = useState(1)

    function handleSetShowItem(value) {
        if (showItem + value === 0) {
            setShowItem(dummyData.length)
        } else if (showItem + value === dummyData.length + 1) {
            setShowItem(1)
        } else {
            setShowItem(showItem + value)
        }
    }

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
            </CarouselWrapper>
        </CarouselsWrapper>
    )
}

export default Carousel
