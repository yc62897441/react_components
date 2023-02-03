import styled from 'styled-components'

const TitlesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 100px 0;
`

const Title1 = styled.div`
    position: relative;
    font-size: 50px;
    font-weight: 700;
    color: rgb(255, 175, 70);

    ::before {
        position: absolute;
        top: -35px;
        left: 0;
        content: attr(data-content);
        height: 40px;
        overflow: hidden;
        opacity: 0.6;
    }

    ::after {
        position: absolute;
        top: -70px;
        left: 0;
        content: attr(data-content);
        height: 40px;
        overflow: hidden;
        opacity: 0.2;
    }
`

function Titles() {
    return (
        <TitlesWrapper>
            <Title1 data-content="This is a title. Its style is made by pseudo-element.">This is a title. Its style is made by pseudo-element.</Title1>
        </TitlesWrapper>
    )
}

export default Titles
