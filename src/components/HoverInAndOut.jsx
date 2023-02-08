import styled from 'styled-components'

const HoverInAndOutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
`

const HoverInAndOutContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 200px;
    border: 2px solid black;
    transition: all 1s;

    :hover {
        background-color: red;
        transition: all 1s;
        cursor: pointer;
    }
`

const HoverInAndOutContainer2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    border: 2px solid black;
    background-color: RGB(255, 197, 121);
    transition: all 1s;

    :hover {
        transition: all 1s;
        cursor: pointer;
        box-shadow: -150px -100px 0 0 RGB(255, 230, 198), 180px 40px 0 0 RGB(255, 175, 70), -40px 60px 0 0 RGB(255, 241, 223), inset 20px -30px 0 0 RGB(255, 175, 70);
    }
`

function HoverInAndOut() {
    return (
        <HoverInAndOutWrapper>
            <HoverInAndOutContainer>滑鼠移入、移出時都會有 transition 效果</HoverInAndOutContainer>
            <br />
            <HoverInAndOutContainer2>滑鼠移入、移出時都會有 box-shadow transition 效果</HoverInAndOutContainer2>
        </HoverInAndOutWrapper>
    )
}

export default HoverInAndOut
