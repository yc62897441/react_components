import styled, { keyframes } from 'styled-components'

const BorderStyleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`

const BorderStyle1 = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    border: 1px solid #03a9f3;

    ::before,
    ::after {
        position: absolute;
        content: '';
        width: 20%;
        height: 20%;
    }

    :before {
        top: -5px;
        left: -5px;
        border-top: 1px solid #03a9f3;
        border-left: 1px solid #03a9f3;
    }

    :after {
        bottom: -5px;
        right: -5px;
        border-bottom: 1px solid #03a9f3;
        border-right: 1px solid #03a9f3;
    }

    :hover::before,
    :hover::after {
        width: calc(100% + 9px);
        height: calc(100% + 9px);
        transition: 0.4s;
    }
`

const linearGradientMove = keyframes`
    100% {
        background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
    }
`

const BorderStyle2 = styled.div`
    width: 300px;
    height: 300px;
    background: linear-gradient(90deg, #333 50%, transparent 0) repeat-x, linear-gradient(90deg, #333 50%, transparent 0) repeat-x, linear-gradient(0deg, #333 50%, transparent 0) repeat-y, linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
    background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
    background-position: 0 0, 0 100%, 0 0, 100% 0;

    :hover {
        animation: ${linearGradientMove} 0.3s infinite linear;
    }
`

const BorderStyle3 = styled.div`
    width: 300px;
    height: 300px;
    outline: 1px solid #333;
    outline-offset: -1px;
    background: linear-gradient(90deg, #333 50%, transparent 0) repeat-x, linear-gradient(90deg, #333 50%, transparent 0) repeat-x, linear-gradient(0deg, #333 50%, transparent 0) repeat-y, linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
    background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
    background-position: 0 0, 0 100%, 0 0, 100% 0;

    :hover {
        outline: none;
        animation: ${linearGradientMove} 0.3s infinite linear;
    }
`

const rotate = keyframes`
    100% {
        transform: rotate(1turn);
    }
`

const opacityChange = keyframes`
    0% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.5;
    }
`

const BorderStyle4 = styled.div`
    position: relative;
    width: 200px;
    height: 100px;
    padding: 5px;
    border-radius: 6px;
    overflow: hidden;
    z-index: 0;

    ::after {
        position: absolute;
        top: -1000%;
        left: -1000%;
        width: 2100%;
        height: 2100%;
        content: '';
        background-repeat: no-repeat;
        background-size: 50% 50%, 50% 50%;
        background-position: 0 0, 100% 0, 100% 100%, 0 100%;
        background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
        animation: ${rotate} 4s linear infinite;
        z-index: -2;
    }

    ::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - 7px);
        height: calc(100% - 7px);
        content: '';
        background-color: #ffffff;
        border-radius: 6px;
        animation: ${opacityChange} 4s linear infinite;
        z-index: -1;
    }
`

const BorderStyle5 = styled.div`
    position: relative;
    width: 1000px;
    height: 200px;
    background-color: #ffffff;
    padding: 5px;
    border-radius: 6px;
    overflow: hidden;
    z-index: 1;

    ::after {
        position: absolute;
        top: -1000%;
        left: -1000%;
        width: 2100%;
        height: 2100%;

        content: '';
        background-repeat: no-repeat;
        /* background-color: #1a232a; */
        background-position: 0 0;
        background-image: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
        animation: ${rotate} 4s linear infinite;
        z-index: -2;
    }

    ::before {
        position: absolute;
        top: 5px;
        left: 5px;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        content: '';
        background-color: #ffffff;
        border-radius: 6px;
        z-index: -1;
        animation: ${opacityChange} 5s infinite linear;
    }
`

function BorderStyle() {
    return (
        <BorderStyleWrapper>
            <BorderStyle1>BorderStyle1 請將滑鼠游標滑入</BorderStyle1>
            <br />

            <BorderStyle2>BorderStyle2 請將滑鼠游標滑入</BorderStyle2>
            <br />

            <BorderStyle3>BorderStyle3 請將滑鼠游標滑入</BorderStyle3>
            <br />

            <BorderStyle4>BorderStyle4</BorderStyle4>
            <br />

            <BorderStyle5>BorderStyle5</BorderStyle5>
            <br />
        </BorderStyleWrapper>
    )
}

export default BorderStyle
