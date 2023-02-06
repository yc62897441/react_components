import { useState } from 'webpack'
import styled from 'styled-components'

const AccordionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
`

const AccordionWrapper = styled.div`
    width: 500px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    border-radius: 15px;
`

const AccordionContainer = styled.div`
    width: 100%;
    padding: 5px 15px;
`

const AccordionTitleContainer = styled.div`
    width: 100%;
`

const AccordionContentContainer = styled.div`
    /* position: absolute; */
    width: 100%;
    /* opacity: ${({ isShow }) => (isShow ? '1' : '0')}; */
    /* transform: ${({ isShow }) => (isShow ? 'scale(1, 1)' : 'scale(0, 1)')}; */
    transition: all 0.2s;
`

const dummyData = [
    {
        id: 1,
        title: '展開1',
        content: '內容1',
    },
    {
        id: 2,
        title: '展開2',
        content: '內容2',
    },
    {
        id: 3,
        title: '展開3',
        content: '內容3',
    },
]

function Accordion() {
    const [showId, setShowId] = useState(null)

    function handleShow(targetId) {
        if (targetId === showId) {
            setShowId(null)
        } else {
            setShowId(targetId)
        }
    }

    return (
        <AccordionsWrapper>
            {dummyData.length > 0 && (
                <AccordionWrapper>
                    {dummyData.map((item) => {
                        const isShow = showId === item.id ? true : false
                        return (
                            <AccordionContainer key={item.id}>
                                <AccordionTitleContainer onClick={() => handleShow(item.id)}>
                                    <h1>{item.title}</h1>
                                </AccordionTitleContainer>
                                <AccordionContentContainer isShow={isShow}>{item.content}</AccordionContentContainer>
                            </AccordionContainer>
                        )
                    })}
                </AccordionWrapper>
            )}
        </AccordionsWrapper>
    )
}

export default Accordion
