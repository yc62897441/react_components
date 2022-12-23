import styled from 'styled-components'

const Div = styled.div`
    display: block;
    width: 100vw;
    height: 200vh;
    background-color: firebrick;
`

const Button = styled.button`
    width: 300px;
    background-color: lightcoral;
`

function HideScrollbar({ setIsHideSrollbar }) {
    function handleToggleScrollBar() {
        setIsHideSrollbar((n) => !n)
    }
    return (
        <Div>
            <Button onClick={() => handleToggleScrollBar()}>Hide ScrollBar</Button>
        </Div>
    )
}

export default HideScrollbar
