import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
    100% {
        transform: rotate(1turn);
    }
`

const PieChartWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 300px;
    margin: 30px 0;

    :before {
        position: absolute;
        display: block;
        content: '';
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-color: #ffffff;
        z-index: -1;
    }

    :after {
        position: absolute;
        top: calc(50% - 160px);
        left: calc(50% - 160px);
        width: 320px;
        height: 320px;
        border-radius: 50%;
        content: '';
        background-repeat: no-repeat;
        background-position: 0 0;

        /* 1版 */
        /* background-image: conic-gradient(rgba(255, 153, 19, 0.9), rgba(138, 182, 138, 0.9), rgba(168, 239, 254, 0.9), rgba(255, 153, 19, 0.9)); */

        /* 2版 */
        background-image: conic-gradient(transparent 0deg, rgba(255, 153, 19, 0.4) 90deg, transparent 110deg, transparent 120deg, rgba(138, 182, 138, 0.4) 210deg, transparent 230deg, transparent 240deg, rgba(168, 239, 254, 0.4) 330deg, transparent 350deg, transparent 360deg);

        /* 3版 */
        /* background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%; */

        animation: ${rotate} 4s linear infinite;
        z-index: -2;
    }

    @media (min-width: 768px) {
        height: 400px;
        margin: 50px 0;

        :before {
            width: 400px;
            height: 400px;
        }
        :after {
            top: calc(50% - 210px);
            left: calc(50% - 210px);
            width: 420px;
            height: 420px;
        }
    }

    @media (min-width: 992px) {
        height: 500px;
        :before {
            width: 500px;
            height: 500px;
        }
        :after {
            top: calc(50% - 260px);
            left: calc(50% - 260px);
            width: 520px;
            height: 520px;
        }
    }
`

const PieWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    transform: ${({ transform }) => (transform ? transform : 'translate(-50%, -50%) rotate(0deg)')};
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-image: ${({ backgroundImage }) => (backgroundImage ? backgroundImage : 'conic-gradient(transparent 0deg 90deg, transparent 90deg 180deg, green 180deg 360deg)')};

    > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 50%;
        transform: ${({ rotate }) => (rotate ? rotate : 'rotate(0deg)')};

        h1 {
            color: #444444;
            font-size: 30px;
            font-weight: 600;
            font-family: '微軟正黑體', 'Microsoft JhengHei', 'Segoe UI Semibold', 'Segoe UI', 'Lucida Grande';
        }
    }

    @media (min-width: 768px) {
        width: 400px;
        height: 400px;
    }

    @media (min-width: 992px) {
        width: 500px;
        height: 500px;
    }
`

function PieChart() {
    return (
        <PieChartWrapper>
            <PieWrapper transform={'translate(-50%, -50%) rotate(0deg)'} rotate={'rotate(0deg)'} backgroundImage={'conic-gradient(rgba(255, 153, 19, 0.4) 0deg 72deg, transparent 72deg 360deg)'}>
                <div>
                    <div>
                        <h1>20%</h1>
                    </div>
                    <div>
                        <h1>A項目</h1>
                    </div>
                </div>
            </PieWrapper>
            <PieWrapper transform={'translate(-50%, -50%) rotate(72deg)'} rotate={'rotate(-72deg)'} backgroundImage={'conic-gradient(rgba(138, 182, 138, 0.4) 0deg 108deg, transparent 108deg 360deg)'}>
                <div>
                    <div>
                        <h1>30%</h1>
                    </div>
                    <div>
                        <h1>B項目</h1>
                    </div>
                </div>
            </PieWrapper>
            <PieWrapper transform={'translate(-50%, -50%) rotate(180deg)'} rotate={'rotate(-180deg)'} backgroundImage={'conic-gradient(rgba(168, 239, 254, 0.4) 0deg 180deg, transparent 180deg 360deg)'}>
                <div>
                    <div>
                        <h1>50%</h1>
                    </div>
                    <div>
                        <h1>C項目</h1>
                    </div>
                </div>
            </PieWrapper>
        </PieChartWrapper>
    )
}

export default PieChart
