import styled, { keyframes } from 'styled-components'

// 旋轉 .wave 區塊，產生波浪上下錯覺(搭配非正圓形的 border-radius)
// 參考：https://www.tpisoftware.com/tpu/articleDetails/2404
const drift = keyframes`
    0 {
        transform: rotate(0deg);
    }
   100% {
        transform: rotate(360deg);
    }
`

const WaveBackgroundWrapper = styled.div`
    position: relative;
    top: 50px;
    width: 100%;
    height: 300px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;

    .wave {
        position: absolute;
        bottom: 0%;
        width: 5000px;
        height: 5000px;
        flex-grow: 1;
        border-radius: 47%;
        opacity: 0.4;
        background: #6a82fb;
        background-image: linear-gradient(120deg, #E3FDF5 0%, #FFE6FA 100%);
        margin-left: -2500px;
        margin-bottom: -4950px;
        transform-origin: center;
    }

    .wave.one {
        left: 50%;
        animation: ${drift} 23s infinite linear;
        margin-bottom: -4940px;
    }

    .wave.two {
        left: 80%;
        animation: ${drift} 27s infinite linear;
        margin-bottom: -4950px;
    }

    .wave.three {
        left: 25%;
        animation: ${drift} 29s infinite linear;
        margin-bottom: -4960px;
    }

    .wave.four {
        left: 115%;
        animation: ${drift} 27s infinite linear;
        margin-bottom: -4940px;
        opacity: 0;
    }

    .wave.five {
        left: -15%;
        animation: ${drift} 23s infinite linear;
        margin-bottom: -4950px;
        opacity: 0;
    }

    @media (min-width: 1600px) {
        .wave {
            border-radius: 46.5%;
            opacity: 0.5;
        }

        .wave.two,
        .wave.three {
            border-radius: 45.5%;
            opacity: 0.5;
        }

        .wave.four,
        .wave.five {
            border-radius: 45.5%;
            opacity: 0.5;
        }
    }
`

function WaveBackground() {
    return (
        <WaveBackgroundWrapper>
            <div className="wave one"></div>
            <div className="wave two"></div>
            <div className="wave three"></div>
            <div className="wave four"></div>
            <div className="wave five"></div>
        </WaveBackgroundWrapper>
    )
}

export default WaveBackground
