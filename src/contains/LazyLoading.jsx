import useLazyLoading from '../hook/useLazyLoading.js'
import styled from 'styled-components'
import Header from '../components/Header.jsx'
import { headerHeight } from '../components/Header.jsx'

const LazyLoadingWrapper = styled.div`
    width: 100%;
    margin-top: ${headerHeight};
`

const ImgsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 500px;
    height: 500px;
    margin-bottom: 50px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

function LazyLoading() {
    useLazyLoading()

    return (
        <LazyLoadingWrapper>
            <Header />
            <ImgsWrapper>
                <ImgWrapper>
                    <img className="lazy-image" src="https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C2C0BB" data-src="https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg" alt="" srcSet="" />
                </ImgWrapper>
                <ImgWrapper>
                    <img className="lazy-image" src="https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C2C0BB" data-src="https://images.pexels.com/photos/3723504/pexels-photo-3723504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" srcSet="" />
                </ImgWrapper>
                <ImgWrapper>
                    <img className="lazy-image" src="https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C2C0BB" data-src="https://images.pexels.com/photos/13377551/pexels-photo-13377551.jpeg" alt="" srcSet="" />
                </ImgWrapper>
                <ImgWrapper>
                    <img className="lazy-image" src="https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C2C0BB" data-src="https://images.pexels.com/photos/3390587/pexels-photo-3390587.jpeg" alt="" srcSet="" />
                </ImgWrapper>
                <ImgWrapper>
                    <img className="lazy-image" src="https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C2C0BB" data-src="https://images.pexels.com/photos/3125637/pexels-photo-3125637.jpeg" alt="" srcSet="" />
                </ImgWrapper>
                <ImgWrapper>
                    <img className="lazy-image" src="https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C2C0BB" data-src="https://images.pexels.com/photos/7787724/pexels-photo-7787724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" srcSet="" />
                </ImgWrapper>
                <ImgWrapper>
                    <img className="lazy-image" src="https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C2C0BB" data-src="https://images.pexels.com/photos/4440745/pexels-photo-4440745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" srcSet="" />
                </ImgWrapper>
            </ImgsWrapper>
        </LazyLoadingWrapper>
    )
}

export default LazyLoading
