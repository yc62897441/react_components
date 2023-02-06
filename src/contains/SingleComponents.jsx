import styled from 'styled-components'
import Header from '../components/Header.jsx'
import Accordion from '../components/components/Accordion.jsx'
import Blog from '../components/Blog.jsx'
import BorderStyle from '../components/BorderStyle.jsx'
import Bottuns from '../components/components/Bottuns.jsx'
import Carousel from '../components/Carousel.jsx'
import CarouselWithTimer from '../components/CarouselWithTimer.jsx'
import ComingSoon from '../components/ComingSoon.jsx'
import HideSrollbar from '../components/HideSrollbar.jsx'
import Modal from '../components/Modal.jsx'
import PieChart from '../components/PieChart.jsx'
import SliderBanner from '../components/SliderBanner.jsx'
import Titles from '../components/Titles.jsx'

const SingleComponentsWrapper = styled.div`
    width: 100%;
    margin-top: 165px;
`

const SeperateLine = styled.div`
    width: 100%;
    height: 5px;
    margin: 20px 0;
    background-color: #000000;
`

function SingleComponents({ setIsHideSrollbar }) {
    return (
        <>
            <Header />
            <SingleComponentsWrapper>
                <Blog />
                <br />
                <br />
                <br />
                <br />
                <br />
                <SeperateLine />

                <BorderStyle />
                <SeperateLine />

                <Bottuns />
                <SeperateLine />

                {/* ComingSoon 先註解起來，z-index 較高，會蓋掉其他點擊操作 */}
                {/* <ComingSoon /> */}
                <SeperateLine />

                <HideSrollbar setIsHideSrollbar={setIsHideSrollbar} />
                <SeperateLine />

                <SliderBanner />
                <SeperateLine />

                <PieChart />
                <SeperateLine />

                <Titles />
                <SeperateLine />

                <Modal />
                <SeperateLine />

                <Accordion />
                <SeperateLine />

                <Carousel />
                <SeperateLine />

                <CarouselWithTimer />
                <SeperateLine />
            </SingleComponentsWrapper>
        </>
    )
}

export default SingleComponents
