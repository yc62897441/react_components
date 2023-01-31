import styled, { keyframes } from 'styled-components'
import Header from '../components/Header.jsx'
import WaveBackground from '../components/WaveBackground.jsx'
import TitleWrapperNoBaseline from '../components/miniComponents/TitleWrapperNoBaseline.jsx'

const SlideWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 165px;
    overflow: hidden;
    background-color: #ffffff;
`

// 主軸內容左右移動動畫
const RollSlide = keyframes`
    0% {
        transform: translateX(0%);
    }

    50% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(0%);
    }
`

const SlideMainWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    width: 200%;
    height: 100%;
    padding: 0px 10px;
    animation: ${RollSlide} 60s infinite linear;
    background-color: transparent;
    z-index: 2;

    @media (min-width: 992px) {
        padding: 0px 50px;
    }
`

const SlideContentWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    flex-grow: 1;
    height: 100%;
    margin: 0px;

    @media (min-width: 992px) {
        margin: 0px 25px;
    }
`

const ContentsWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
    width: 100%;
    height: 100%;
`

const ContentWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0px;

    div:nth-child(1) {
        div {
            display: flex;
            flex-direction: row;
            align-items: baseline;
        }
    }

    :hover {
        div:nth-child(1) {
            transform: scale(150%);
            transition: transform 0.8s;

            div {
                line-height: 28px;
            }
        }

        div:nth-child(2) {
            transform: scale(120%);
            transition: transform 0.8s;
        }

        div:nth-child(3) {
            height: 200px;
            transform-origin: bottom;
            transition: 0.8s;
        }
    }
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 5px;
    padding: 5px 0px;
    background-image: linear-gradient(to top, #d5f7f4 0%, #ffffff 100%);

    text-size-adjust: 100%;
    line-height: 16px;
    font-size: 14px;
    font-weight: 400;
    font-family: '微軟正黑體', 'Microsoft JhengHei', 'Segoe UI Semibold', 'Segoe UI', 'Lucida Grande';

    div {
        display: flex;
        flex-direction: row;
    }

    span {
        font-size: 18px;
        color: lightseagreen;
    }

    @media (min-width: 576px) {
        letter-spacing: 1.2px;
    }

    @media (min-width: 992px) {
        padding: 5px 10px;
        line-height: 18px;
        font-size: 16px;

        span {
            font-size: 24px;
        }
    }
`

const Dot = styled.div`
    display: block;
    content: '';
    width: ${({ width }) => (width ? `${width}px` : '10px')};
    height: ${({ width }) => (width ? `${width}px` : '10px')};
    background-color: #ffd6d8;
    border-radius: 50%;
`

const Bar = styled.div`
    display: block;
    width: ${({ width }) => (width ? `${width}px` : '2px')};
    height: ${({ height }) => (height ? height : '100px')};
    background-color: #ffd6d8;
`

const ContentTitleWrapper = styled(TitleWrapperNoBaseline)`
    position: absolute;
    bottom: 10px;
    left: 50%;
    display: flex;
    justify-content: center;
    padding: 10px 0px 10px;
    border-radius: 10px;
    transform: translateX(-50%);
    background-color: #ffd6d8;
    opacity: 1;
    letter-spacing: 2px;

    h3 {
        color: black;
    }

    @media (min-width: 768px) {
        padding: 10px 10px 10px;
        border-radius: 20px;
    }
`

// TODO: 更改內文
const dummyData = [
    {
        id: 1,
        title: '學業',
        contents: [
            {
                id: 1,
                amount: 101,
                unit: '次',
                name: '遲到罰寫',
                CSSHeight: '155px',
            },
            {
                id: 2,
                amount: 17,
                unit: '次',
                name: '全校前三名',
                CSSHeight: '120px',
            },
            {
                id: 3,
                amount: 98,
                unit: '分',
                name: '畢業平均成績',
                CSSHeight: '100px',
            },
            {
                id: 4,
                amount: 6,
                unit: '次',
                name: '散文得獎',
                CSSHeight: '165px',
            },
            {
                id: 5,
                amount: 851,
                unit: '張',
                name: '好寶寶集點卡',
                CSSHeight: '115px',
            },
        ],
    },
    {
        id: 2,
        title: '體育',
        contents: [
            {
                id: 1,
                amount: 3040,
                unit: '分',
                name: '累積得分',
                CSSHeight: '100px',
            },
            {
                id: 2,
                amount: 77,
                unit: '場',
                name: '驅逐出場',
                CSSHeight: '165px',
            },
        ],
    },
    {
        id: 3,
        title: '兩性',
        contents: [
            {
                id: 1,
                amount: 3,
                unit: '位',
                name: '同時交往對象',
                CSSHeight: '130px',
            },
            {
                id: 2,
                amount: 11,
                unit: '次',
                name: '告白失敗',
                CSSHeight: '175px',
            },
            {
                id: 3,
                amount: 37,
                unit: '次',
                name: '被甩巴掌',
                CSSHeight: '140px',
            },
        ],
    },
    {
        id: 4,
        title: '社團',
        contents: [
            {
                id: 1,
                amount: 8,
                unit: '場',
                name: '社團表演',
                CSSHeight: '115px',
            },
            {
                id: 2,
                amount: 872,
                unit: '位',
                name: '粉絲人數',
                CSSHeight: '160px',
            },
        ],
    },
]

function SliderAnimation() {
    return (
        <>
            <Header />
            <SlideWrapper>
                <SlideMainWrapper>
                    {/* 產生各大類 Wrapper，如「學業」、「體育」... */}
                    {dummyData.length > 0 &&
                        dummyData.map((item, index) => (
                            <SlideContentWrapper key={item.id}>
                                <ContentsWrapper>
                                    {/* 產生大類中的項目 */}
                                    {item.contents.length > 0 &&
                                        item.contents.map((content, index) => (
                                            <ContentWrapper key={content.id}>
                                                <ContentContainer>
                                                    <div>
                                                        <span>{content.amount}</span> <p>{content.unit}</p>
                                                    </div>
                                                    <p>{content.name}</p>
                                                </ContentContainer>
                                                {/* 隨機產生 Dot 的大小、Bar 的高度 */}
                                                <Dot width={Math.floor(Math.random() * 10 + 10)}></Dot>
                                                <Bar height={content.CSSHeight} width={Math.floor(Math.random() * 3 + 1)}></Bar>
                                            </ContentWrapper>
                                        ))}
                                </ContentsWrapper>
                                {/* 產生大類的標題 */}
                                <ContentTitleWrapper>
                                    <h3>{item.title}</h3>
                                </ContentTitleWrapper>
                            </SlideContentWrapper>
                        ))}
                </SlideMainWrapper>

                {/* 背景波浪動畫 */}
                <WaveBackground></WaveBackground>
            </SlideWrapper>
        </>
    )
}

export default SliderAnimation
