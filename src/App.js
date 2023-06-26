import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import ChartComponents from './contains/ChartComponents.jsx'
import ChartComponentsAmchart from './contains/ChartComponentsAmchart.jsx'
import ChartJs from './contains/ChartJs.jsx'
// import D3BubbleChart from './contains/D3BubbleChart.jsx'
// import D3BubbleChart from './contains/D3BubbleChart2.jsx'
// import D3BubbleChart from './contains/D3BubbleChart3.jsx'
import D3BubbleChart from './contains/D3BubbleChart4.jsx'
import Dragable from './contains/Draggable.jsx'
import HeaderOverly from './contains/HeaderOverly.jsx'
import Homepage from './contains/Homepage.jsx'
import LazyLoading from './contains/LazyLoading.jsx'
import MouseEvent from './contains/MouseEvent.jsx'
import OpenLayers from './contains/Openlayers.jsx'
import OpenLayers2 from './contains/Openlayers2.jsx'
import ScrollDownShow from './contains/ScrollDownShow.jsx'
import ScrollDownShow2 from './contains/ScrollDownShow2.jsx'
import SingleComponents from './contains/SingleComponents.jsx'
import SliderAnimation from './contains/SliderAnimation.jsx'
import SvgMap from './contains/SvgMap.jsx'
import SvgTaiwanMap from './contains/SvgTaiwanMap.jsx'
import Touch from './contains/Touch.jsx'
import TouchBlog from './contains/TouchBlog.jsx'
import HideScrollbar from './components/HideSrollbar.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import WordCloud from './contains/WordCloud.jsx'
import Xlsx from './contains/Xlsx.jsx'

const GlobalStyle = createGlobalStyle`
  * {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  }

  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/* 開啟/隱藏 scrollbar */
body {
  position: relative;
  overflow: ${({ isHideSrollbar }) => (isHideSrollbar ? 'hidden' : 'scroll')};
}
`

function App() {
    const [isHideSrollbar, setIsHideSrollbar] = useState(false)
    return (
        <>
            <GlobalStyle isHideSrollbar={isHideSrollbar} />
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/ChartComponents" element={<ChartComponents />} />
                    <Route path="/ChartComponentsAmchart" element={<ChartComponentsAmchart />} />
                    <Route path="/chartJs" element={<ChartJs />} />
                    <Route path="/d3BubbleChart" element={<D3BubbleChart />} />
                    <Route path="/dragable" element={<Dragable />} />
                    <Route path="/headerOverly" element={<HeaderOverly />} />
                    <Route path="/lazyLoading" element={<LazyLoading />} />
                    <Route path="/mouseEvent" element={<MouseEvent />} />
                    <Route path="/openLayers" element={<OpenLayers />} />
                    <Route path="/openLayers2" element={<OpenLayers2 />} />
                    <Route path="/scrollDownShow" element={<ScrollDownShow />} />
                    <Route path="/scrollDownShow2" element={<ScrollDownShow2 />} />
                    <Route
                        path="/singleComponents"
                        element={<SingleComponents setIsHideSrollbar={setIsHideSrollbar} />}
                    />
                    <Route path="/sliderAnimation" element={<SliderAnimation />} />
                    <Route path="/svgMap" element={<SvgMap />} />
                    <Route path="/svgTaiwanMap" element={<SvgTaiwanMap />} />
                    <Route path="/wordCloud" element={<WordCloud />} />
                    <Route path="/touch" element={<Touch />} />
                    <Route path="/touchBlog" element={<TouchBlog />} />
                    <Route path="/xlsx" element={<Xlsx />} />
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
