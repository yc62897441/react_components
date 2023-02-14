import styled from 'styled-components'
import TextWrapper from './miniComponents/TextWrapper'
import LogoImg from '../assets/img/Footer/icon-gc0f1b6e1e_1280.png'
import FacebookIcon from '../assets/img/Footer/facebook-gef43ff891_640.png'
import InstagramIcon from '../assets/img/Footer/instagram-g6111b1164_640.png'
import TwitterIcon from '../assets/img/Footer/twitter-g3f4c028b3_640.png'

const FooterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 30px 0;
    background-color: #333333;
    color: #ffffff;

    @media (min-width: 992px) {
        display: grid;
        align-items: flex-start;
        grid-template-columns: 300px 650px;
        padding: 50px 0px;
    }
`

const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 992px) {
        grid-column: 1;
    }
`

const RightWrapper = styled.div`
    display: none;

    @media (min-width: 992px) {
        position: static;
        grid-column: 2;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        /* justify-content:space-around ; */
        align-items: center;
        height: 100%;
        /* border: 2px solid green; */
        opacity: 1;
    }
`

const BottomWrapper = styled.div`
    width: 100%;
    margin-top: 20px;
    @media (min-width: 992px) {
        grid-column: 1 / 4;
    }
`

const LogoWrapper = styled.div`
    height: 150px;
    margin-bottom: 15px;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

const ContactInfoWrapper = styled.div``

const InfoWrapper = styled.div`
    margin-bottom: 15px;
    > div {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 300px;
        margin-bottom: 10px;
    }
`

const SocialMediaWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const SocialMediaIconWrapper = styled.div`
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-right: 20px;
    border-radius: 10px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

const AAA = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 30px;
    margin: 0 20px;
    /* border: 2px solid red; */
`

const NavTitleWrapper = styled.div`
    width: 100%;
    text-align: left;
    text-size-adjust: 100%;
    line-height: 28px;
    font-size: 20px;
    font-weight: 600;
    font-family: '微軟正黑體', 'Microsoft JhengHei', 'Segoe UI Semibold', 'Segoe UI', 'Lucida Grande';
    margin-bottom: 5px;
    /* border: 2px solid blue; */
    cursor: pointer;
`

const NavSubTitlesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const NavSubTitleWrapper = styled.div`
    width: 100%;
    text-align: left;
    text-size-adjust: 100%;
    line-height: 20px;
    font-size: 16px;
    font-weight: 400;
    font-family: '微軟正黑體', 'Microsoft JhengHei', 'Segoe UI Semibold', 'Segoe UI', 'Lucida Grande';
    margin-bottom: 5px;
    /* border: 2px solid yellow; */
    cursor: pointer;
`

const dummyData = [
    {
        id: 1,
        title: '關於我們',
        subTitles: [
            {
                id: 1,
                title: '公司簡介',
            },
            {
                id: 2,
                title: '服務願景',
            },
        ],
    },
    {
        id: 2,
        title: '服務項目',
        subTitles: [
            {
                id: 1,
                title: '國內旅遊',
            },
            {
                id: 2,
                title: '東亞旅遊',
            },
            {
                id: 3,
                title: '美洲旅遊',
            },
            {
                id: 4,
                title: '歐洲旅遊',
            },
        ],
    },
    {
        id: 3,
        title: '最新消息',
        subTitles: [
            {
                id: 1,
                title: '活動訊息',
            },
            {
                id: 2,
                title: '旅遊專欄',
            },
        ],
    },
    {
        id: 4,
        title: '聯絡我們',
        subTitles: [],
    },
]

function Footer() {
    return (
        <FooterWrapper>
            <LeftWrapper>
                <LogoWrapper>
                    <img src={LogoImg} alt="" srcSet="" />
                </LogoWrapper>
                <ContactInfoWrapper>
                    <InfoWrapper>
                        <TextWrapper>PHONE：+886 8888 8888</TextWrapper>
                        <TextWrapper>MAIL：goody@goody.com</TextWrapper>
                        <TextWrapper>ADDRESS：No. 1, Sec. 1, Non-Xxistent Rd., Zhongzheng Dist., Taipei City</TextWrapper>
                    </InfoWrapper>
                    <SocialMediaWrapper>
                        <SocialMediaIconWrapper>
                            <img src={FacebookIcon} alt="" srcSet="" />
                        </SocialMediaIconWrapper>
                        <SocialMediaIconWrapper>
                            <img src={InstagramIcon} alt="" srcSet="" />
                        </SocialMediaIconWrapper>
                        <SocialMediaIconWrapper>
                            <img src={TwitterIcon} alt="" srcSet="" />
                        </SocialMediaIconWrapper>
                    </SocialMediaWrapper>
                </ContactInfoWrapper>
            </LeftWrapper>

            <RightWrapper>
                {dummyData.length > 0 &&
                    dummyData.map((data) => (
                        <AAA key={data.id}>
                            <NavTitleWrapper>{data.title}</NavTitleWrapper>
                            <NavSubTitlesWrapper>{data.subTitles.length > 0 && data.subTitles.map((item) => <NavSubTitleWrapper key={item.id}>{item.title}</NavSubTitleWrapper>)}</NavSubTitlesWrapper>
                        </AAA>
                    ))}
            </RightWrapper>

            <BottomWrapper>
                <TextWrapper>Copyright © 2023 All Rights Reserved.</TextWrapper>
            </BottomWrapper>
        </FooterWrapper>
    )
}

export default Footer
