import styled from 'styled-components'

const TextWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    P {
        width: 100%;
        text-align: left;
        text-size-adjust: 100%;
        line-height: 28px;
        font-size: 16px;
        font-weight: 400;
        font-family: '微軟正黑體', 'Microsoft JhengHei', 'Segoe UI Semibold', 'Segoe UI', 'Lucida Grande';
        color: rgb(68, 68, 68);
    }

    span {
        color: #3ec1d5;
        font-weight: 700;
    }

    @media (min-width: 576px) {
        max-width: 540px;
    }

    @media (min-width: 768px) {
        max-width: 720px;
    }

    @media (min-width: 992px) {
        max-width: 960px;
    }

    @media (min-width: 1200px) {
        max-width: 1140px;
    }
`

export default TextWrapper
