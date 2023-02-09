import { useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header.jsx'
import { Title2 } from '../components/Titles.jsx'
import TitleWrapperNoBaseline from '../components/miniComponents/TitleWrapperNoBaseline.jsx'
import TextWrapper from '../components/miniComponents/TextWrapper.jsx'
import BannerImg from '../assets/img/ScrollDownShow2/pexels-sebastian-beck-3545807.jpg'
import BoltIcon from '../assets/img/ScrollDownShow2/bolt.png'
import LightIcon from '../assets/img/ScrollDownShow2/light.png'
import ContentImg1 from '../assets/img/ScrollDownShow2/pexels-arthouse-studio-4338103.jpg'
import ContentImg2 from '../assets/img/ScrollDownShow2/pexels-matt-hardy-2602543.jpg'
import ContentImg3 from '../assets/img/ScrollDownShow2/pexels-kristoffer-brink-jonsson-1690470.jpg'
import ContentImg4 from '../assets/img/ScrollDownShow2/pexels-visit-almaty-848612.jpg'
import ContentBackground from '../assets/img/ScrollDownShow2/background-ge52ccf758_1280.png'
import ContentBackground2 from '../assets/img/ScrollDownShow2/snowflakes-ge90a81b3f_640.png'
import ContentBackground3 from '../assets/img/ScrollDownShow2/pexels-tobias-bjørkli-1900203.jpg'

const ScrollDownShowWrapper = styled.div`
    width: 100%;
    padding-top: 165px;
`

// Banner
// Banner
// Banner
const BannerWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 165px);

    img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        z-index: -10;
    }
`

const Title2_1 = styled(Title2)`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 100px;
    font-size: 80px;
    border: none;
    background-image: radial-gradient(circle farthest-corner at center, rgba(0, 90, 170, 1) 0%, rgba(0, 90, 170, 1) 40%, rgba(179, 220, 255, 0.4) 90%);

    :after {
        position: absolute;
        display: block;
        content: '';
        width: 100%;
        height: 100%;
        background-image: radial-gradient(circle farthest-corner at center, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.1) 100%);
        opacity: 0.5;
        z-index: -9;
    }
`

// Contents
// Contents
// Contents
const ContentsWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    /* border: 5px solid black; */
    padding: 100px 0;
`

const ContentsBackgroundWrapper = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.3;
    }
`

const ContentWrapper = styled.div`
    position: relative;
    width: 100%;
    /* border: 2px solid red; */
`

const StageWrapper = styled.div`
    position: absolute;
    top: 0;
    left: calc(50% - 250px - 5%);
    transform: translateX(-50%);
    width: 5px;
    height: 100%;
    background-color: ${({ isActive }) => (isActive ? 'rgba(0, 90, 170, 0.8)' : 'rgba(0, 90, 170, 0.2)')};
    transition: all 1s;

    div {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 30px;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 50%;
        border: ${({ isActive }) => (isActive ? '2px solid rgba(0, 90, 170, 0.8)' : '2px solid rgba(0, 90, 170, 0.2)')};
        transition: all 1s;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center center;
            opacity: ${({ isActive }) => (isActive ? '1' : '0.5')};
            transition: all 1s;
        }
    }

    @media (min-width: 992px) {
        left: 50%;
    }
`

const ContentContainer = styled.div`
    position: relative;
    top: 0;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    transform: translateX(-50%);
    width: 100%;
    max-width: 500px;
    /* border: 5px solid green; */
    padding: 20px 0;
    opacity: ${({ isActive }) => (isActive ? '1' : '0.5')};
    transition: all 1s;

    @media (min-width: 992px) {
        left: ${({ index }) => (index % 2 === 0 ? 'calc(45% - 200px)' : 'calc(55% + 200px)')};
        width: 400px;
    }
`

const ContentImgWrapper = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    /* z-index: 9998; */

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        border-radius: 50%;
    }
`

const TextWrapper2 = styled(TextWrapper)`
    position: relative;
    bottom: ${({ isActive }) => (isActive ? '0px' : '50px')};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* border: 2px solid blue; */
    opacity: ${({ isActive }) => (isActive ? '1' : '0')};
    transition: all 1s;

    p {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        /* border: 2px solid red; */
    }
`

const dummyData = [
    {
        id: 1,
        title: 'Glacier Scenery',
        img: ContentImg1,
        content: 'Jökulsárlón is Iceland’s most famous glacier lagoon. Conveniently located in the southeast by Route 1, about halfway between the Skaftafell Nature Reserve and Höfn, it is a popular stop for those traveling along the South Coast or around the Ring Road of the country.',
    },
    {
        id: 2,
        title: 'Local Culture',
        img: ContentImg2,
        content: 'Aside from their Viking roots, Icelanders have a strong culture of food, literature and the arts. The capital of Reykjavik has galleries, bookstores, theatres and a symphony orchestra. In fact, Icelandic music has become its own genre, combining pop and folk. Taking in a local gig is a wonderful way to embrace the culture and atmosphere of this unique place.',
    },
    {
        id: 3,
        title: 'Nature Hiking',
        img: ContentImg3,
        content: 'Some of Iceland’s most popular hiking routes include the Laugavegur trail between Landmannalaugar and Þórsmörk, Fimmvörðuháls, Lónsöræfi, Hornstrandir, and  Vatnaleið. ',
    },
    {
        id: 4,
        title: 'Skiing Sport',
        img: ContentImg4,
        content: 'In the list of the best ski resorts in Iceland (Ísland), the ski resort Bláfjöll is top with 3.0 out of 5 stars. The largest ski resorts offer up to 15 kilometres of slopes (Bláfjöll). The highest ski resorts for skiing in Iceland (Ísland) extend up to an altitude of 1,014 metres (Hlíðarfjall – Akureyri).',
    },
]

function ScrollDownShow2() {
    const [currentId, setCurrentId] = useState(0)
    let windowScrollY = 0

    // FIXME: 會執行多次 scroll 事件，可能是 useState 多次 re-render，或是建立多個事件監聽器(改用 ref 試試)
    addEventListener('scroll', function () {
        windowScrollY = window.scrollY
        const StageWrappers = document.querySelectorAll('.StageWrapper')
        StageWrappers.forEach((item) => {
            if (Math.abs(Number(item.dataset.id) - currentId) <= 1) {
                const itemHeight = findDomElementYPosition(item)
                const itemId = Number(item.dataset.id)
                if (windowScrollY >= itemHeight - 450) {
                    setCurrentId(Number(itemId))
                }
            }
        })
    })

    // 尋找元素在畫面上的高度位置
    // 參考來源：https://www.quirksmode.org/js/findpos.html
    function findDomElementYPosition(target) {
        let obj = target
        let currentY = 0
        while (obj) {
            currentY += obj.offsetTop

            // 會往上找到 <body>，<body> 的 offsetParent 是 null
            if (obj.offsetParent) {
                obj = obj.offsetParent
            } else {
                return currentY
            }
        }
        return currentY
    }

    return (
        <ScrollDownShowWrapper>
            <Header />
            <BannerWrapper>
                <img src={BannerImg} alt="" srcset="" />
                <Title2_1>There will be the slogan of this company.</Title2_1>
            </BannerWrapper>
            <ContentsWrapper>
                <ContentsBackgroundWrapper>
                    <img src={ContentBackground3} alt="" srcset="" />
                </ContentsBackgroundWrapper>
                {dummyData.length > 0 &&
                    dummyData.map((data, index) => (
                        <ContentWrapper key={data.id}>
                            <StageWrapper data-id={data.id} isActive={currentId >= data.id ? true : false} className="StageWrapper">
                                <div>
                                    <img src={LightIcon} alt="" srcset="" />
                                </div>
                            </StageWrapper>
                            <ContentContainer index={index} isActive={currentId >= data.id ? true : false}>
                                <ContentImgWrapper>
                                    <img src={data.img} alt="" srcset="" />
                                </ContentImgWrapper>
                                <br />
                                <TitleWrapperNoBaseline>
                                    <h3>{data.title}</h3>
                                </TitleWrapperNoBaseline>
                                <TextWrapper2 index={index} isActive={currentId >= data.id ? true : false}>
                                    <p>{data.content}</p>
                                </TextWrapper2>
                            </ContentContainer>
                        </ContentWrapper>
                    ))}
            </ContentsWrapper>
        </ScrollDownShowWrapper>
    )
}

export default ScrollDownShow2
