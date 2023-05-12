import { useState, useRef, Fragment, useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/Header.jsx'
import img1 from '../assets/img/touchBlog/001.png'
import img2 from '../assets/img/touchBlog/002.png'
import img3 from '../assets/img/touchBlog/003.png'
import img4 from '../assets/img/touchBlog/004.png'
import img5 from '../assets/img/touchBlog/005.png'
import img6 from '../assets/img/touchBlog/006.png'
import img7 from '../assets/img/touchBlog/007.png'
import { headerHeight } from '../components/Header.jsx'

const TouchBlogWrapper = styled.div`
    width: 100%;
    margin-top: ${headerHeight};
`

const BlogWrapper = styled.section`
    position: relative;
    width: 100%;
    background-color: #f8f7f7;
`

const SlideWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SlideContentWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const ArrowBtn = styled.button`
    position: absolute;
    top: 150px;
    transform: translateX(-50%);
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    background-color: #d3d3d3;
    border: 1px solid #ffffff;
    border-radius: 50%;
    color: #ffffff;
    cursor: pointer;
    z-index: 999;

    :hover {
        opacity: 0.85;
    }

    P {
        display: block;
        height: 100%;
    }
`

const ArrowBtnLeft = styled(ArrowBtn)`
    left: 10px;
`

const ArrowBtnRight = styled(ArrowBtn)`
    right: 10px;
`

const SlideNewsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    overflow: hidden;
    max-width: 1210px;
`

const NewsWrapper = styled.div`
    display: inline-block;
    width: 100%;
    flex-shrink: 0;
    transition: all 0.5s ease-out;
    transform: ${({ movePx }) =>
        movePx > 10 ? `translateX(${movePx}%)` : `translateX(${movePx}%)`};
    padding: 5px;
    background-color: #ffffff;

    img {
        width: 100%;
        height: 270px;
        max-height: 270px;
        object-fit: cover;
    }

    @media (min-width: 576px) {
        width: 50%;
        img {
            max-height: 240px;
        }
    }

    @media (min-width: 768px) {
        width: calc(100% / 3);
        img {
            max-height: 250px;
        }
    }
`

const SlideDotsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 22px;
    margin: 5px 0px 20px;
`

const Dot = styled.div`
    width: 10px;
    height: 10px;
    background: ${({ currentStep, index }) => (currentStep - 1 === index ? '#000000' : '#808080')};
    border-radius: 50%;
    margin: 0px 5px;
    cursor: pointer;
`

const dummyNews = [
    {
        id: 1,
        name: '001',
        img: img1,
    },
    {
        id: 2,
        name: '002',
        img: img2,
    },
    {
        id: 3,
        name: '003',
        img: img3,
    },
    {
        id: 4,
        name: '004',
        img: img4,
    },
    {
        id: 5,
        name: '005',
        img: img5,
    },
    {
        id: 6,
        name: '006',
        img: img6,
    },
    {
        id: 7,
        name: '007',
        img: img7,
    },
]

function TouchBlog() {
    const [sliderShowNewsNum, setSliderShowNewsNum] = useState(1)
    const [movePx, setMovePx] = useState(0)
    const currentScreenRWD = useRef(null)
    const currentStep = useRef(1)
    const sliderShowNewsNumRef = useRef(null)
    const totalStep = useRef(null)

    // 手機滑動事件參數
    let slideNewsWrapper = '' // 用來儲存 querySelector DOM <SlideNewsWrapper>
    let touch =
        'ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)
    let startPos = '' // 開始 touch 滑動的位置
    let endPos = '' // 結束 touch 滑動的位置
    let isScrolling = '' // 這個引數判斷是垂直滾動還是水平滾動

    // 初次進入頁面，先確認使用者當前視窗的 RWD breakpoint，並調整 slider 每個分區顯示的 news 的數量
    useEffect(() => {
        handleResize()

        // 持續監聽使用者是否有調整視窗尺寸
        window.addEventListener('resize', handleResize)

        // 掛設手機滑動事件監聽器到 slideNewsWrapper 上
        slideNewsWrapper = document.querySelector('#slideNewsWrapper')
        slideNewsWrapper.addEventListener('touchstart', touchstartEvent, false)

        return () => {
            // 持續監聽使用者是否有調整視窗尺寸
            window.removeEventListener('resize', handleResize)
            slideNewsWrapper.removeEventListener('touchstart', touchstartEvent, false)
            slideNewsWrapper.removeEventListener('touchmove', touchmoveEvent, false)
            slideNewsWrapper.removeEventListener('touchend', touchendEvent, false)
        }
    }, [])

    // 使用者點擊 <ArrowBtnLeft /> or <ArrowBtnRight />，切換 slider 的分區
    function handleMovePx(button) {
        if (button === '>' && currentStep.current < totalStep.current) {
            currentStep.current = currentStep.current + 1
            setMovePx((n) => n - 100 * sliderShowNewsNumRef.current)
        }
        if (button === '<' && currentStep.current > 1) {
            currentStep.current = currentStep.current - 1
            setMovePx((n) => n + 100 * sliderShowNewsNumRef.current)
        }
    }

    // 使用者點擊 <Dot />，切換 slider 的分區
    function handleClickDot(index) {
        currentStep.current = index + 1
        setMovePx(100 * sliderShowNewsNumRef.current * -1 * index)
    }

    function handleResize() {
        // 取得使用者調整視窗後，新的視窗尺寸(px)
        const newWindowSize = window.innerWidth

        // 確認新的視窗尺寸的 RWD breakpoint
        let newScreenRWD = ''
        if (newWindowSize < 576) {
            newScreenRWD = '<576'
        }
        if (576 <= newWindowSize && newWindowSize < 768) {
            newScreenRWD = '<768'
        }
        if (768 <= newWindowSize) {
            newScreenRWD = '<992'
        }

        // 確認目前的 RWD breakpoint，是否符合新的視窗尺寸的 RWD breakpoint；如果有切換成不同的 breakpoint，則調整 slider 每個分區顯示的 news 的數量
        if (currentScreenRWD.current !== newScreenRWD) {
            currentScreenRWD.current = newScreenRWD

            // <576     ：slider 顯示 1 則 news，每個分區移動 px 尺寸為 100%
            // >576 <768：slider 顯示 2 則 news，每個分區移動 px 尺寸為 200%
            // >768     ：slider 顯示 3 則 news，每個分區移動 px 尺寸為 300%

            // <576
            if (newWindowSize < 576) {
                let newTotalStep = Math.ceil(dummyNews.length / 1)
                totalStep.current = newTotalStep
                setSliderShowNewsNum(1)
                sliderShowNewsNumRef.current = 1
                setMovePx((currentStep.current - 1) * 100 * 1 * -1)
            }

            // 576~<768
            if (576 <= newWindowSize && newWindowSize < 768) {
                let newTotalStep = Math.ceil(dummyNews.length / 2)
                totalStep.current = newTotalStep
                setSliderShowNewsNum(2)
                sliderShowNewsNumRef.current = 2
                setMovePx((currentStep.current - 1) * 100 * 2 * -1)

                if (currentStep.current > newTotalStep) {
                    currentStep.current = newTotalStep
                    setMovePx((newTotalStep - 1) * 100 * 2 * -1)
                }
            }

            // 768~
            if (768 <= newWindowSize) {
                // 計算新的 slider 的分區數量，例如總共 4 則新聞，slider 最多顯示 3 則 news，則 Math.ceil(4/3)，共有 2 個 slider 分區
                let newTotalStep = Math.ceil(dummyNews.length / 3)
                totalStep.current = newTotalStep

                // 設定 slider 顯示 3 則 news
                setSliderShowNewsNum(3) // 建立畫面顯示新聞數量，需要 re-render
                // 手機滑動事件監聽器使用。因為事件監聽器 function 建立的時候，參數就寫死了，所以透過 sliderShowNewsNumRef.current (call by reference) 的方式，在 resize 後能更動到 function 實行時使用的參數
                sliderShowNewsNumRef.current = 3

                // 設定目前移動的 px，所需移動的分區數 * 100% * 每個分區內的 news 數量 * -1(向左位移)
                setMovePx((currentStep.current - 1) * 100 * 3 * -1)

                // 如果目前所在的分區數 > 超過新的視窗尺寸下 slider 的分區數，則移動到新的視窗尺寸下 slider 的最後一個分區
                if (currentStep.current > newTotalStep) {
                    currentStep.current = newTotalStep
                    setMovePx((newTotalStep - 1) * 100 * 3 * -1)
                }
            }
        }
    }

    // 手機滑動的 3 事件 functions。開始、持續滑動中、結束。
    function touchstartEvent(event) {
        touch = event.targetTouches[0] // touches 陣列物件獲得螢幕上所有的 touch，取第一個 touch
        startPos = { x: touch.pageX, y: touch.pageY, time: +new Date() } // 取第一個 touch 的座標值
        slideNewsWrapper.addEventListener('touchmove', touchmoveEvent, false)
        slideNewsWrapper.addEventListener('touchend', touchendEvent, false)
    }
    function touchmoveEvent(event) {
        // 當螢幕有多個 touch 或者頁面被縮放過，就不執行 move 操作
        if (event.targetTouches.length > 1) return
        touch = event.targetTouches[0]
        endPos = { x: touch.pageX, y: touch.pageY }
        isScrolling = Math.abs(endPos.x - startPos.x) > Math.abs(endPos.y - startPos.y) ? 0 : 1 // isScrolling 為 0 時，為橫向滑動；為 1 時，為縱向滑動
        if (isScrolling === 0) {
            event.preventDefault() // 阻止觸控事件的預設行為，即阻止滾屏
        }
    }
    function touchendEvent() {
        // 當為水平滾動時
        if (isScrolling === 0) {
            const duration = +new Date() - startPos.time // 滑動的持續時間
            // 滑動的持續時間 > 10 才執行，避免輕輕碰到就換頁
            if (Number(duration) > 10) {
                // 判斷是左移還是右移，當偏移量大於10時執行
                // (更新目前位置 index)
                if (endPos.x - startPos.x > 10) {
                    if (currentStep.current > 1) {
                        handleClickDot(currentStep.current - 2)
                    }
                } else if (endPos.x - startPos.x < -10) {
                    if (currentStep.current < totalStep.current) {
                        handleClickDot(currentStep.current)
                    }
                }
            }
        }
        // 解除綁定事件
        slideNewsWrapper.removeEventListener('touchmove', touchmoveEvent, false)
        slideNewsWrapper.removeEventListener('touchend', touchendEvent, false)
    }

    return (
        <TouchBlogWrapper>
            <Header />
            <BlogWrapper>
                <SlideWrapper>
                    <SlideContentWrapper>
                        <ArrowBtnLeft onClick={() => handleMovePx('<')}>
                            <p>＜</p>
                        </ArrowBtnLeft>

                        {/* 建立新聞 */}
                        {sliderShowNewsNum > 0 && (
                            <SlideNewsWrapper
                                id="slideNewsWrapper"
                                sliderShowNewsNum={sliderShowNewsNum}
                            >
                                {dummyNews.length > 0 &&
                                    dummyNews.map((news, index) => (
                                        <NewsWrapper
                                            className="element"
                                            index={index}
                                            sliderShowNewsNum={sliderShowNewsNum}
                                            totalStep={totalStep.current}
                                            movePx={movePx}
                                            key={news.id}
                                        >
                                            {news.name}
                                            <img src={news.img} alt="" srcSet="" />
                                        </NewsWrapper>
                                    ))}
                            </SlideNewsWrapper>
                        )}
                        <ArrowBtnRight onClick={() => handleMovePx('>')}>
                            <p>＞</p>
                        </ArrowBtnRight>
                    </SlideContentWrapper>

                    {/* 建立點點 */}
                    <SlideDotsWrapper>
                        {totalStep.current > 0 &&
                            Array.from({ length: totalStep.current }, (_value, index) => (
                                <Dot
                                    currentStep={currentStep.current}
                                    index={index}
                                    key={index}
                                    onClick={() => handleClickDot(index)}
                                />
                            ))}
                    </SlideDotsWrapper>
                </SlideWrapper>
            </BlogWrapper>
        </TouchBlogWrapper>
    )
}

export default TouchBlog
