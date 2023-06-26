import { useEffect } from 'react'
import styled from 'styled-components'
import Chart from 'chart.js/auto' // chart.js
import Logo from '../../assets/img/logoImg.png'

// 例如 input Number output String 1234 -> 1,234；12345 -> 12,345
export function formatNumber(value) {
    let input = value.toString()
    let output = ''
    let counter = 0
    for (let i = input.length - 1; i >= 0; i--) {
        if (counter !== 0 && counter % 3 === 0 && i >= 0) {
            output = ',' + output
        }
        output = input[i] + output
        counter = counter + 1
    }
    return output
}

const DoughnutChartWrapper = styled.div`
    width: 100%;
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '1200px')};
    max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'none')};
    margin: 0 auto;
`

const CanvasWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '1200px')};
    max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'none')};
`

// Note: changes to the plugin code is not reflected to the chart, because the plugin is loaded at chart construction time and editor changes only trigger an chart.update().
const image = new Image()
// image.src = 'https://www.chartjs.org/img/chartjs-logo.svg'
image.src = Logo

function DoughnutChart({ data, myChartId, title, customStyle }) {
    // 如果有設定 color 就使用設定的 color，如果沒有就使用 defaultColors
    // const defaultColors = [
    //     'rgba(255, 219, 153, 0.6)',
    //     'rgba(192, 238, 192, 0.6)',
    //     'rgba(168, 239, 255, 0.6)',
    //     'rgba(68, 139, 255, 0.6)',
    //     'rgba(155, 219, 153, 0.6)',
    // ]
    // const colors = data.map((datum, index) => {
    //     if (datum.color) {
    //         return datum.color
    //     } else {
    //         return defaultColors[index % defaultColors.length]
    //     }
    // })

    // 需要的資料結構
    const data2 = data
        ? data
        : {
              labels: ['A', 'B', 'C'],
              datasets: [
                  {
                      label: 'null',
                      data: [100, 200, 50],
                      backgroundColor: [
                          'rgba(255, 219, 153, 0.6)',
                          'rgba(192, 238, 192, 0.6)',
                          'rgba(168, 239, 255, 0.6)',
                      ],
                      hoverOffset: 4,
                      borderAlign: 'inner',
                      borderRadius: { outerStart: 2, outerEnd: 2, innerStart: 2, innerEnd: 50 },
                      hoverOffset: 5,
                  },
              ],
          }

    // 計算總量
    let totalQuantity = 0
    data2.datasets[0].data.forEach((datum) => {
        totalQuantity += Number(datum)
    })

    // 客製化 tooltip，多加入顯示「佔比」
    const footer = (tooltipItems) => {
        // 目前滑到的目標的數值
        const currentValue = tooltipItems[0].parsed

        // 計算出全部數值總和
        let total = 0
        tooltipItems.forEach((tooltipItem) => {
            if (tooltipItem?.dataset?.data?.length > 0) {
                tooltipItem?.dataset?.data.forEach((datum, index) => {
                    total += datum
                })
            }
        })

        // 計算比例(取到小數點後 2 位)(*100 變成百分比；再*100、去小數、除以100)
        const result = Math.floor((currentValue / total) * 100 * 100) / 100

        return '佔比: ' + result + '%'
    }

    const options = {
        showAllTooltips: true,
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 20,
                        weight: 600,
                    },
                },
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 20,
                    weight: 600,
                },
            },
            // 客製化 tooltip (hover 才顯示)
            // tooltip: {
            //     callbacks: {
            //         footer: footer,
            //     },
            // },
            // 客製化 tooltip (全部顯示)
            tooltip: {
                enabled: false,
            },
        },
    }

    useEffect(() => {
        const ctx = document.getElementById(myChartId)
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: data2,
            plugins: [
                {
                    id: 'customCanvasBackgroundImage',
                    beforeDraw: (chart) => {
                        if (image.complete) {
                            const ctx = chart.ctx
                            const { top, left, width, height } = chart.chartArea
                            const x = left + width / 2 - image.width / 2
                            const y = top + height / 2 - image.height / 2
                            ctx.drawImage(image, x, y)
                        } else {
                            image.onload = () => chart.draw()
                        }
                    },

                    // 客製化 tooltip (全部顯示)
                    // https://www.youtube.com/watch?v=bDst745vCck
                    afterDraw: (chart, args, options) => {
                        const ctx = chart.ctx
                        // ctx.save()

                        chart.config.data.datasets.forEach((dataset, index) => {
                            chart.getDatasetMeta(index).data.forEach((datum, i) => {
                                const originalX = datum.x // 原始位置
                                const originalY = datum.y // 原始位置
                                const radius = 100 // 移動距離(為半徑的概念，以圓心為基準點)
                                const middleAngle = (datum.startAngle + datum.endAngle) / 2 // 圓餅的起點、終點的中間(角度，範圍為 2 PI)
                                const backgroundColor = 'rgba(0,0,0,0.1)'
                                const fontColor = 'black'
                                const fontSize = 16
                                const fontStyle = fontSize.toString() + 'px' + ' "Noto Sans TC"' //'12px Arial'
                                const paddingX = 20
                                const paddingY = 10

                                // 修正後的位置，讓標籤能移到對應的圓餅區塊上
                                const movedX = originalX + Math.cos(middleAngle) * radius
                                const movedY = originalY + Math.sin(middleAngle) * radius

                                // 標籤文字
                                const text = `${formatNumber(
                                    Number(chart.config.data.datasets[index].data[i])
                                )} $$$； 佔比：${
                                    Math.floor(
                                        (chart.config.data.datasets[index].data[i] /
                                            totalQuantity) *
                                            100 *
                                            100
                                    ) / 100
                                }%`

                                // chart.config.data.labels[i] +
                                // ' ' +
                                // formatNumber(Number(chart.config.data.datasets[index].data[i]))
                                const textWidth = ctx.measureText(text).width
                                const textHeight = 20 * (fontSize / 12)

                                // 標籤區塊
                                ctx.fillStyle = backgroundColor
                                ctx.fillRect(
                                    movedX - (textWidth + paddingX) / 2,
                                    movedY - textHeight - paddingY / 2,
                                    textWidth + paddingX,
                                    textHeight + paddingY
                                ) // x, y, w, h
                                ctx.restore()

                                // 三角形指標
                                ctx.fillStyle = backgroundColor
                                ctx.beginPath()
                                ctx.moveTo(movedX, movedY + paddingY / 2 + 10)
                                ctx.lineTo(movedX - paddingX / 2, movedY + paddingY / 2)
                                ctx.lineTo(movedX + paddingX / 2, movedY + paddingY / 2)
                                ctx.fill()
                                ctx.restore()

                                // 文字 style
                                ctx.font = fontStyle
                                ctx.fillStyle = fontColor
                                ctx.fillText(text, movedX - textWidth / 2, movedY - 10)
                                ctx.restore()
                            })
                        })
                    },
                },
            ],
            options: options,
        })

        return () => {
            myChart.destroy()
        }
    }, [])

    return (
        <DoughnutChartWrapper maxWidth={customStyle?.maxWidth} maxHeight={customStyle?.maxHeight}>
            <CanvasWrapper maxWidth={customStyle?.maxWidth} maxHeight={customStyle?.maxHeight}>
                <canvas id={myChartId}></canvas>
            </CanvasWrapper>
        </DoughnutChartWrapper>
    )
}

export default DoughnutChart
