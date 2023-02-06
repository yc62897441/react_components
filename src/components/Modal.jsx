import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button1 } from './components/Bottuns'

const ModalsWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
`

const OpenWrapper = styled.div`
    width: 100%;
`

const ModalContainter = styled.div`
    position: ${({ isShow }) => (isShow ? 'absolute' : 'static')};
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
    flex-direction: column;
    width: 50%;
    height: 300px;
    padding: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    div:nth-child(1) {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    div:nth-child(2) {
        padding: 20px;
    }
`

function Modal() {
    const [show, setShow] = useState(null)
    const isShow = show === 1 ? true : false

    useEffect(() => {
        window.addEventListener('click', function (event) {
            let obj = event.target
            while (obj) {
                if (obj.classList.contains('openModal') || obj.classList.contains('ModalContainter')) {
                    return
                }
                obj = obj.offsetParent
            }
            setShow(null)
        })
    }, [])

    return (
        <ModalsWrapper>
            <OpenWrapper>
                <Button1 className="openModal" onClick={() => setShow(1)}>
                    open modal1
                </Button1>
            </OpenWrapper>
            <ModalContainter className="ModalContainter" isShow={isShow}>
                <div>
                    <Button1 onClick={() => setShow(null)}>close</Button1>
                </div>
                <div>點擊 modal 以外的區域，或是點擊「close」按鈕，關閉 modal</div>
            </ModalContainter>
        </ModalsWrapper>
    )
}

export default Modal
