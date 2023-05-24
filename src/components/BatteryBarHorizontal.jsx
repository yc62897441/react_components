import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div``

const BatteryContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 360px;
    height: 80px;
    padding: 5px;
    background-color: #1f1f1f;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    padding: 0 5px;
    color: #ffffff;
`

const BarsContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 275px;
    height: 100%;
    background-color: #2f2f2f;

    .bar {
        width: 8px;
        height: 100%;
        margin-left: 17px;
        background-color: #1f1f1f;
        z-index: 2;
    }
`

const BarsLevel = styled.div`
    position: absolute;
    bottom: 0;
    float: left;
    width: ${({ width }) => width};
    max-width: 300px;
    height: 100%;
    background-color: ${({ backgroundColor }) => backgroundColor};
    z-index: 1;
    transition: width 0.7s cubic-bezier(0.4, 2.7, 0.7, 0.3);
`

function BatteryBarHorizontal({ propsTitle, propsValue }) {
    const [value, setValue] = useState(propsValue ? propsValue : 80) // 初始值
    const max = 100 // 上限最大值
    const title = propsTitle ? propsTitle : '轉供比例'
    const barColor = value <= 30 ? '#AA0000' : 30 < value && value <= 70 ? '#FFFF11' : '#007200'
    const levelHeight = Math.floor((value / max) * 100).toString() + '%'

    function handelChange(event) {
        setValue(event.target.value)
    }

    return (
        <Wrapper>
            {/* 手動操作 value，看會不會改變樣式 */}
            <input
                type="number"
                min="0"
                max="100"
                step="5"
                value={value}
                onChange={(event) => {
                    handelChange(event)
                }}
            />
            <BatteryContainer>
                <InfoContainer>
                    <div>{title}</div>
                    <div>{levelHeight}</div>
                </InfoContainer>
                <BarsContainer>
                    <BarsLevel backgroundColor={barColor} width={levelHeight}></BarsLevel>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </BarsContainer>
            </BatteryContainer>
        </Wrapper>
    )
}

export default BatteryBarHorizontal
