import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Header from '../components/Header.jsx'
import { headerHeight } from '../components/Header.jsx'

// 製作文字雲
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import img from '../assets/img/like.png'

const keyWordsList = [
    {
        name: 'Authentication',
        value: 1500,
        textStyle: {
            color: 'black',
        },
    },
    {
        name: 'AAAA AAA AA A',
        value: 1492,
    },
    {
        name: 'BBB BBBB B BB',
        value: 1463,
    },
    {
        name: 'CCCC CC C',
        value: 1403,
    },
    {
        name: 'DD DDD',
        value: 1349,
    },
    {
        name: 'E EEEE',
        value: 1320,
    },
    {
        name: 'FF FFF F',
        value: 1228,
    },
    {
        name: 'G GG',
        value: 1196,
    },
    {
        name: 'HH HHHH',
        value: 1112,
    },
    {
        name: 'IIII III I',
        value: 965,
    },
    {
        name: 'JJ JJJJ JJ',
        value: 847,
    },
    {
        name: 'K KK KKK',
        value: 582,
    },
    {
        name: 'L LLL L LLLL',
        value: 555,
    },
    {
        name: 'MM MMM MMMM',
        value: 550,
    },
    {
        name: 'N NN N',
        value: 462,
    },
    {
        name: 'OOOO OOOO',
        value: 366,
    },
    {
        name: 'PP PPP',
        value: 363,
    },
    {
        name: 'QQ QQQ',
        value: 360,
    },
    {
        name: 'R RR RRR R',
        value: 282,
    },
    {
        name: 'SS SSS S',
        value: 273,
    },
    {
        name: 'T TT',
        value: 265,
    },
    {
        name: 'UU UUU',
        value: 255,
    },
    {
        name: 'VV VVV VV',
        value: 250,
    },
    {
        name: 'WW WWWW WWWW W',
        value: 248,
    },
    {
        name: 'XXXX X XX XXX',
        value: 245,
    },
    {
        name: 'YY YYY Y YYYY',
        value: 244,
    },
    {
        name: 'Z ZZZZ ZZ ZZZ',
        value: 243,
    },
    {
        name: 'BBB BBBB B BB',
        value: 1463,
    },
    {
        name: 'CCCC CC C',
        value: 1403,
    },
    {
        name: 'DD DDD',
        value: 1349,
    },
    {
        name: 'E EEEE',
        value: 1320,
    },
    {
        name: 'FF FFF F',
        value: 1228,
    },
    {
        name: 'G GG',
        value: 1196,
    },
    {
        name: 'HH HHHH',
        value: 1112,
    },
    {
        name: 'IIII III I',
        value: 965,
    },
    {
        name: 'JJ JJJJ JJ',
        value: 847,
    },
    {
        name: 'K KK KKK',
        value: 582,
    },
    {
        name: 'L LLL L LLLL',
        value: 555,
    },
    {
        name: 'MM MMM MMMM',
        value: 550,
    },
    {
        name: 'N NN N',
        value: 462,
    },
    {
        name: 'OOOO OOOO',
        value: 366,
    },
    {
        name: 'PP PPP',
        value: 363,
    },
    {
        name: 'QQ QQQ',
        value: 360,
    },
    {
        name: 'R RR RRR R',
        value: 282,
    },
    {
        name: 'SS SSS S',
        value: 273,
    },
    {
        name: 'T TT',
        value: 265,
    },
    {
        name: 'UU UUU',
        value: 255,
    },
    {
        name: 'VV VVV VV',
        value: 250,
    },
    {
        name: 'WW WWWW WWWW W',
        value: 248,
    },
    {
        name: 'XXXX X XX XXX',
        value: 245,
    },
    {
        name: 'YY YYY Y YYYY',
        value: 244,
    },
    {
        name: 'Z ZZZZ ZZ ZZZ',
        value: 243,
    },
    {
        name: 'BBB BBBB B BB',
        value: 1463,
    },
    {
        name: 'CCCC CC C',
        value: 1403,
    },
    {
        name: 'DD DDD',
        value: 1349,
    },
    {
        name: 'E EEEE',
        value: 1320,
    },
    {
        name: 'FF FFF F',
        value: 1228,
    },
    {
        name: 'G GG',
        value: 1196,
    },
    {
        name: 'HH HHHH',
        value: 1112,
    },
    {
        name: 'IIII III I',
        value: 965,
    },
    {
        name: 'JJ JJJJ JJ',
        value: 847,
    },
    {
        name: 'K KK KKK',
        value: 582,
    },
    {
        name: 'L LLL L LLLL',
        value: 555,
    },
    {
        name: 'MM MMM MMMM',
        value: 550,
    },
    {
        name: 'N NN N',
        value: 462,
    },
    {
        name: 'OOOO OOOO',
        value: 366,
    },
    {
        name: 'PP PPP',
        value: 363,
    },
    {
        name: 'QQ QQQ',
        value: 360,
    },
    {
        name: 'R RR RRR R',
        value: 282,
    },
    {
        name: 'SS SSS S',
        value: 273,
    },
    {
        name: 'T TT',
        value: 265,
    },
    {
        name: 'UU UUU',
        value: 255,
    },
    {
        name: 'VV VVV VV',
        value: 250,
    },
    {
        name: 'WW WWWW WWWW W',
        value: 248,
    },
    {
        name: 'XXXX X XX XXX',
        value: 245,
    },
    {
        name: 'YY YYY Y YYYY',
        value: 244,
    },
    {
        name: 'Z ZZZZ ZZ ZZZ',
        value: 243,
    },
    {
        name: 'BBB BBBB B BB',
        value: 1463,
    },
    {
        name: 'CCCC CC C',
        value: 1403,
    },
    {
        name: 'DD DDD',
        value: 1349,
    },
    {
        name: 'E EEEE',
        value: 1320,
    },
    {
        name: 'FF FFF F',
        value: 1228,
    },
    {
        name: 'G GG',
        value: 1196,
    },
    {
        name: 'HH HHHH',
        value: 1112,
    },
    {
        name: 'IIII III I',
        value: 965,
    },
    {
        name: 'JJ JJJJ JJ',
        value: 847,
    },
    {
        name: 'K KK KKK',
        value: 582,
    },
    {
        name: 'L LLL L LLLL',
        value: 555,
    },
    {
        name: 'MM MMM MMMM',
        value: 550,
    },
    {
        name: 'N NN N',
        value: 462,
    },
    {
        name: 'OOOO OOOO',
        value: 366,
    },
    {
        name: 'PP PPP',
        value: 363,
    },
    {
        name: 'QQ QQQ',
        value: 360,
    },
    {
        name: 'R RR RRR R',
        value: 282,
    },
    {
        name: 'SS SSS S',
        value: 273,
    },
    {
        name: 'T TT',
        value: 265,
    },
    {
        name: 'UU UUU',
        value: 255,
    },
    {
        name: 'VV VVV VV',
        value: 250,
    },
    {
        name: 'WW WWWW WWWW W',
        value: 248,
    },
    {
        name: 'XXXX X XX XXX',
        value: 245,
    },
    {
        name: 'YY YYY Y YYYY',
        value: 244,
    },
    {
        name: 'Z ZZZZ ZZ ZZZ',
        value: 243,
    },
    {
        name: 'BBB BBBB B BB',
        value: 1463,
    },
    {
        name: 'CCCC CC C',
        value: 1403,
    },
    {
        name: 'DD DDD',
        value: 1349,
    },
    {
        name: 'E EEEE',
        value: 1320,
    },
    {
        name: 'FF FFF F',
        value: 1228,
    },
    {
        name: 'G GG',
        value: 1196,
    },
    {
        name: 'HH HHHH',
        value: 1112,
    },
    {
        name: 'IIII III I',
        value: 965,
    },
    {
        name: 'JJ JJJJ JJ',
        value: 847,
    },
    {
        name: 'K KK KKK',
        value: 582,
    },
    {
        name: 'L LLL L LLLL',
        value: 555,
    },
    {
        name: 'MM MMM MMMM',
        value: 550,
    },
    {
        name: 'N NN N',
        value: 462,
    },
    {
        name: 'OOOO OOOO',
        value: 366,
    },
    {
        name: 'PP PPP',
        value: 363,
    },
    {
        name: 'QQ QQQ',
        value: 360,
    },
    {
        name: 'R RR RRR R',
        value: 282,
    },
    {
        name: 'SS SSS S',
        value: 273,
    },
    {
        name: 'T TT',
        value: 265,
    },
    {
        name: 'UU UUU',
        value: 255,
    },
    {
        name: 'VV VVV VV',
        value: 250,
    },
    {
        name: 'WW WWWW WWWW W',
        value: 248,
    },
    {
        name: 'XXXX X XX XXX',
        value: 245,
    },
    {
        name: 'YY YYY Y YYYY',
        value: 244,
    },
    {
        name: 'Z ZZZZ ZZ ZZZ',
        value: 243,
    },
    {
        name: 'BBB BBBB B BB',
        value: 1463,
    },
    {
        name: 'CCCC CC C',
        value: 1403,
    },
    {
        name: 'DD DDD',
        value: 1349,
    },
    {
        name: 'E EEEE',
        value: 1320,
    },
    {
        name: 'FF FFF F',
        value: 1228,
    },
    {
        name: 'G GG',
        value: 1196,
    },
    {
        name: 'HH HHHH',
        value: 1112,
    },
    {
        name: 'IIII III I',
        value: 965,
    },
    {
        name: 'JJ JJJJ JJ',
        value: 847,
    },
    {
        name: 'K KK KKK',
        value: 582,
    },
    {
        name: 'L LLL L LLLL',
        value: 555,
    },
    {
        name: 'MM MMM MMMM',
        value: 550,
    },
    {
        name: 'N NN N',
        value: 462,
    },
    {
        name: 'OOOO OOOO',
        value: 366,
    },
    {
        name: 'PP PPP',
        value: 363,
    },
    {
        name: 'QQ QQQ',
        value: 360,
    },
    {
        name: 'R RR RRR R',
        value: 282,
    },
    {
        name: 'SS SSS S',
        value: 273,
    },
    {
        name: 'T TT',
        value: 265,
    },
    {
        name: 'UU UUU',
        value: 255,
    },
    {
        name: 'VV VVV VV',
        value: 250,
    },
    {
        name: 'WW WWWW WWWW W',
        value: 248,
    },
    {
        name: 'XXXX X XX XXX',
        value: 245,
    },
    {
        name: 'YY YYY Y YYYY',
        value: 244,
    },
    {
        name: 'Z ZZZZ ZZ ZZZ',
        value: 243,
    },
    {
        name: 'BBB BBBB B BB',
        value: 1463,
    },
    {
        name: 'CCCC CC C',
        value: 1403,
    },
    {
        name: 'DD DDD',
        value: 1349,
    },
    {
        name: 'E EEEE',
        value: 1320,
    },
    {
        name: 'FF FFF F',
        value: 1228,
    },
    {
        name: 'G GG',
        value: 1196,
    },
    {
        name: 'HH HHHH',
        value: 1112,
    },
    {
        name: 'IIII III I',
        value: 965,
    },
    {
        name: 'JJ JJJJ JJ',
        value: 847,
    },
    {
        name: 'K KK KKK',
        value: 582,
    },
    {
        name: 'L LLL L LLLL',
        value: 555,
    },
    {
        name: 'MM MMM MMMM',
        value: 550,
    },
    {
        name: 'N NN N',
        value: 462,
    },
    {
        name: 'OOOO OOOO',
        value: 366,
    },
    {
        name: 'PP PPP',
        value: 363,
    },
    {
        name: 'QQ QQQ',
        value: 360,
    },
    {
        name: 'R RR RRR R',
        value: 282,
    },
    {
        name: 'SS SSS S',
        value: 273,
    },
    {
        name: 'T TT',
        value: 265,
    },
    {
        name: 'UU UUU',
        value: 255,
    },
    {
        name: 'VV VVV VV',
        value: 250,
    },
    {
        name: 'WW WWWW WWWW W',
        value: 248,
    },
    {
        name: 'XXXX X XX XXX',
        value: 245,
    },
    {
        name: 'YY YYY Y YYYY',
        value: 244,
    },
    {
        name: 'Z ZZZZ ZZ ZZZ',
        value: 243,
    },
]

const WordCloudWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 150px);
    margin-top: ${headerHeight};
    padding: 10px;
    background-color: #fbfbfb;
`

const WordCloudImg = styled.div`
    width: 100%;
    max-width: 1100px;
    height: 100%;
    max-height: 900px;
    margin: 0 auto;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

function WordCloud() {
    const kpiRef = useRef()
    let sizeRange = resizeSizeRange()

    useEffect(() => {
        let kpiEcharts = echarts.init(kpiRef.current)

        window.addEventListener('resize', function () {
            kpiEcharts.resize()
        })

        initChartOption()

        function initChartOption() {
            const maskImage = new Image() // 可以根据图片形状生成有形状的词云图
            maskImage.src = img

            const option = {
                backgroundColor: '#ffffff',
                // 「標籤資訊」，hover 時顯示
                tooltip: {
                    trigger: 'item',
                    axisPointer: { type: 'none' },
                    position: 'top',
                    formatter: function ({ name, value }) {
                        return `${name}: ${value.toFixed(2)}`
                    },
                },
                series: [
                    {
                        // name: '搜索指数',
                        type: 'wordCloud',
                        shape: 'circle',
                        // shape: 'triangle',
                        top: 'center',
                        left: 'center',
                        bottom: 'center',
                        right: 'center',
                        width: '100%',
                        height: '100%',
                        // size: ['0%', '10%'],
                        sizeRange: sizeRange,
                        rotationRange: [-45, 45],
                        rotationStep: 1,
                        // textRotation: [0, 45, 90, -45],
                        gridSize: 5, // the larger the grid size, the bigger the gap between words.
                        // drawOutOfBound: true, // Allow word bigger than the size of the canvas to be drawn
                        // layoutAnimation: true, // NOTE disable it will lead to UI blocking when there is lots of words.

                        maskImage: maskImage, // 可以根據圖片形狀生成有形狀的詞雲圖。maskImage 非常重要，這個圖片是詞雲能變成任何形狀的蒙版。這個圖片要注意是純黑的形狀、透明圖。這個是可以自定義背景圖片的，詞雲會按照圖片的形狀排布，所以有形狀限制的時候，最好用背景圖來實現，而且，這個背景圖一定要放base64的，不然詞雲畫不出來。

                        textPadding: 0,
                        autoSize: {
                            enable: true,
                            minSize: 6,
                        },

                        textStyle: {
                            // fontFamily: 'sans-serif',
                            fontWeight: '900',
                            // Color can be a callback function or a color string
                            color: function () {
                                // Random color
                                return (
                                    'rgb(' +
                                    [
                                        Math.round(Math.random() * 255),
                                        Math.round(Math.random() * 180 + 30),
                                        Math.round(Math.random() * 180 + 30),
                                    ].join(',') +
                                    ')'
                                )
                            },
                            opacity: 0.7,
                        },
                        data: keyWordsList,
                    },
                ],
            }

            maskImage.onload = function () {
                kpiEcharts.setOption(option, true)
            }
        }

        return () => {
            kpiEcharts = null
        }
    }, [])

    function resizeSizeRange() {
        // 取得使用者調整視窗後，新的視窗尺寸(px)
        let newWindowSize = window.innerWidth
        let sizeRange = null
        if (newWindowSize < 576) {
            sizeRange = [10, 30]
        } else if (576 <= newWindowSize && newWindowSize < 768) {
            sizeRange = [15, 45]
        } else if (768 <= newWindowSize && newWindowSize < 992) {
            sizeRange = [20, 60]
        } else if (992 <= newWindowSize && newWindowSize < 1440) {
            sizeRange = [30, 75]
        } else if (1440 <= newWindowSize) {
            sizeRange = [10, 35]
        }
        return sizeRange
    }

    return (
        <>
            <Header />
            <WordCloudWrapper>
                <WordCloudImg id="main" ref={kpiRef}></WordCloudImg>
            </WordCloudWrapper>
        </>
    )
}

export default WordCloud
