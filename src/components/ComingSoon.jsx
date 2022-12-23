import styled from 'styled-components'

const ComingSoonWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    display: block;
    transform: translate(-50%, -50%);
    width: 50%;
    padding: 16px 32px 24px;
    border: 2px solid #000000;
    background-color: #ffffff;
    color: #444444;
    box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
    z-index: 9998;
`

const StyledText = styled.p`
    margin: 10px;
    margin-top: 0px;
    letter-spacing: 3px;
    margin-left: 15px;
    margin-bottom: 0px;
    font-size: 32px;
    line-height: 1.6;
    font-weight: 500;
    color: #3d3d3d;
    transition-duration: 0.2s;
    transition-property: color;
    transition-timing-function: ease;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 15px;
        margin: 15px 0 0;
    } ;
`

const RowWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const NextStepButton = styled.button`
    width: 120px;
    height: 35px;
    margin: 30px auto;
    border-radius: 30px;
    border-style: none;
    background-color: #666666;
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    font-family: 'Roboto', '微軟正黑體', Helvetica, sans-serif;
    letter-spacing: 2px;
    outline: none;

    :hover {
        color: #6c6c6c;
        background: #ffdc14;
        cursor: pointer;
    }
`

const Overly = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    width: 100vw;
    height: 100vh;
    z-index: 9997;
    background: rgba(1, 2, 2, 0.6);
    transition: ease-in-out 0.2s;
`

// 由父層送入 setIsComingSoonShow setIsHideSrollbar，來開啟/關閉 ComingSoon，以及開啟關閉 Srollbar
function ComingSoon({ setIsComingSoonShow, setIsHideSrollbar }) {
    function handleShowComingSoon() {
        setIsComingSoonShow(false)
        setIsHideSrollbar(false)
    }
    return (
        <>
            <ComingSoonWrapper>
                <StyledText>功能建構中...敬請期待!</StyledText>
                <RowWrapper>
                    <NextStepButton onClick={() => handleShowComingSoon()}>取消</NextStepButton>
                </RowWrapper>
            </ComingSoonWrapper>
            <Overly />
        </>
    )
}
export default ComingSoon
