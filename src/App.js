import { useState } from 'react'
import { createGlobalStyle } from 'styled-components'

// import SliderBanner from './components/SliderBanner'
// import HeaderOverly from './contains/HeaderOverly'
// import Blog from './components/Blog'
// import ComingSoon from './components/ComingSoon'
// import HideScrollbar from './components/HideSrollbar'
// import Buttons from './components/Bottuns'
// import BorderStyle from './components/BorderStyle'
// import ScrollDownShow from './contains/ScrollDownShow'
import A from './contains/SliderAnimation'

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
  overflow: ${({ isHideSrollbar }) => (isHideSrollbar ? 'hidden' : 'scroll')};
}
`

function App() {
    const [isHideSrollbar, setIsHideSrollbar] = useState(false)
    return (
        <>
            <GlobalStyle isHideSrollbar={isHideSrollbar} />
            <div>
                App.js
                {/* <HeaderOverly /> */}
            </div>
            {/* <SliderBanner /> */}
            {/* <Blog /> */}
            {/* <ComingSoon /> */}
            {/* <HideScrollbar setIsHideSrollbar={setIsHideSrollbar} /> */}
            {/* <Buttons /> */}
            {/* <BorderStyle /> */}
            {/* <ScrollDownShow /> */}
            <A />
        </>
    )
}

export default App
