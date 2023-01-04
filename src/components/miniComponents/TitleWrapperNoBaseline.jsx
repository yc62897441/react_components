import styled from 'styled-components'

const TitleWrapperNoBaseline = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 0px 0px;

    h1 {
        margin-bottom: 20px;
        color: #797676;
        font-size: 30px;
        font-weight: 700;
        font-family: '微軟正黑體', 'Microsoft JhengHei', 'Segoe UI Semibold', 'Segoe UI', 'Lucida Grande';
        line-height: 40px;
        text-align: center;
        text-shadow: #b0b6b8 3px 3px 6px;
        text-transform: capitalize;
        letter-spacing: 14px;
    }

    h3 {
        margin-bottom: 0px;
        color: #797676;
        font-size: 16px;
        font-weight: 400;
        font-family: '微軟正黑體', 'Microsoft JhengHei', 'Segoe UI Semibold', 'Segoe UI', 'Lucida Grande';
        line-height: 20px;
        text-align: center;
        text-shadow: #b0b6b8 3px 3px 6px;
        text-transform: capitalize;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 40px;
        }

        h3 {
            font-size: 22px;
            line-height: 25px;
        }
    }
`

export default TitleWrapperNoBaseline
