import { useState } from 'react'
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
`

const AccordionContainer = styled.div`
    position: relative;
    width: 100%;
`

const AccordionTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px 15px;
    border: ${({ isActive }) => (isActive ? '1px solid rgba(255, 219, 172, 1)' : '1px solid transparent)')};
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    cursor: pointer;

    div {
        transform: ${({ isActive }) => (isActive ? 'rotate(180deg)' : 'rotate(0deg)')};
        transition: all 0.3s;
    }
    transition: all 0.3s;
`

const AccordionContentContainer = styled.div`
    position: ${({ isShow }) => (isShow ? 'static' : 'absolute')};
    width: 100%;
    padding: 15px 15px;
    transform: ${({ isShow }) => (isShow ? 'scale(1, 1)' : 'scale(1, 0)')};
    transform-origin: top;
    opacity: ${({ isShow }) => (isShow ? '1' : '0')};
    transition: all 0.3s;
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
                        const isActive = showId === item.id ? true : false
                        const isShow = showId === item.id ? true : false
                        return (
                            <AccordionContainer key={item.id}>
                                <AccordionTitleContainer isActive={isActive} onClick={() => handleShow(item.id)}>
                                    <h1>{item.title}</h1>
                                    <div>
                                        <i class="fa fa-arrow-down" aria-hidden="true"></i>
                                    </div>
                                </AccordionTitleContainer>
                                <AccordionContentContainer isShow={isShow}>
                                    <h1>{item.content}</h1>
                                    <h1>{item.content}</h1>
                                    <h1>{item.content}</h1>
                                </AccordionContentContainer>
                            </AccordionContainer>
                        )
                    })}
                </AccordionWrapper>
            )}
        </AccordionsWrapper>
    )
}

export default Accordion
