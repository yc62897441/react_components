import styled from 'styled-components'

const TitlesWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 100px 0;
    border: 2px solid black;
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

const Title2 = styled.div`
    border: 2px solid black;
    padding: 50px 150px;
    font-size: 40px;
    font-weight: 700;
    /* background: #ffffff; */
    /* background-color: #ffffff; */
    background-image: radial-gradient(circle farthest-corner at center, rgba(255, 175, 70, 1) 0%, rgba(255, 219, 172, 1) 30%, rgba(223, 241, 255, 1) 40%, rgba(70, 175, 255, 1) 80%, rgba(255, 255, 255, 1) 100%);
    background-repeat: no-repeat;
    background-size: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
`

const Title3 = styled.div`
    width: 500px;
    border: 2px solid black;
    padding: 50px 50px;
    font-size: 40px;
    font-weight: 700;
    /* background: #ffffff; */
    /* background-color: #ffffff; */
    background-image: conic-gradient(from 0turn at 50% 50%, rgba(0, 0, 0, 0.6) 0%, rgba(255, 0, 0, 0.6) 100%);
    background-repeat: no-repeat;
    background-size: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
`

const Title4 = styled.div`
    width: 500px;
    border: 2px solid black;
    padding: 50px 50px;
    font-size: 40px;
    font-weight: 700;
    /* background: #ffffff; */
    /* background-color: #ffffff; */
    background-image: linear-gradient(0deg, red, blue);
    background-repeat: no-repeat;
    background-size: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
`

const Title5 = styled.div`
    width: 500px;
    border: 2px solid black;
    padding: 50px 50px;
    font-size: 40px;
    font-weight: 700;
    /* background: #ffffff; */
    /* background-color: #ffffff; */
    background-image: linear-gradient(0deg, rgba(255, 0, 0, 1), rgba(255, 0, 0, 0.1) 70%), linear-gradient(120deg, rgba(0, 255, 0, 1), rgba(0, 255, 0, 0.1) 70%), linear-gradient(240deg, rgba(0, 0, 255, 1), rgba(0, 0, 255, 0.1) 70%);
    background-repeat: no-repeat;
    background-size: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
`

function Titles() {
    return (
        <>
            <TitlesWrapper>
                <Title1 data-content="This is a title. Its style is made by pseudo-element.">This is a title. Its style is made by pseudo-element.</Title1>
            </TitlesWrapper>
            <br />
            <TitlesWrapper>
                <Title2>This is a title. Its style is made by -webkit-background-clip(radial-gradient).</Title2>
            </TitlesWrapper>
            <br />
            <TitlesWrapper>
                <Title3>This is a title. Its style is made by -webkit-background-clip(conic-gradient).</Title3>
            </TitlesWrapper>
            <br />
            <TitlesWrapper>
                <Title4>This is a title. Its style is made by -webkit-background-clip(linear-gradient).</Title4>
            </TitlesWrapper>
            <br />
            <TitlesWrapper>
                <Title5>This is a title. Its style is made by -webkit-background-clip(linear-gradient).</Title5>
            </TitlesWrapper>
        </>
    )
}

export default Titles
export { Title2 }
