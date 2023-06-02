import { useEffect } from 'react'
import styled from 'styled-components'
import Chart from 'chart.js/auto' // chart.js
import Logo from '../../assets/img/facebook.png'

const DoughnutChartWrapper = styled.div`
    width: 100%;
`

const CanvasWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    max-width: ${({ size }) => (size ? size : '1200px')};
    max-height: ${({ size }) => (size ? size : '1200px')};
    /* border: 2px solid black; */

    canvas {
        min-height: 260px;
        max-height: 260px;
    }

    /* @media (min-width: 576px) {
        canvas {
            min-height: 260px;
            max-height: 260px;
        }
    } */

    @media (min-width: 768px) {
        canvas {
            min-height: 360px;
            max-height: 360px;
        }
    }

    /* @media (min-width: 992px) {
        canvas {
            min-height: 470px;
        }
    }

    @media (min-width: 1200px) {
        canvas {
            min-height: 580px;
        }
    } */
`

// Note: changes to the plugin code is not reflected to the chart, because the plugin is loaded at chart construction time and editor changes only trigger an chart.update().
const image = new Image()
// image.src = 'https://www.chartjs.org/img/chartjs-logo.svg'
image.src = Logo

function DoughnutChart({ data, myChartId }) {
    const labels = data.map((datum) => datum.name)
    const values = data.map((datum) => datum.value)

    // 如果有設定 color 就使用設定的 color，如果沒有就使用 defaultColors
    const defaultColors = [
        'rgba(255, 219, 153, 0.6)',
        'rgba(192, 238, 192, 0.6)',
        'rgba(168, 239, 255, 0.6)',
    ]
    const colors = data.map((datum, index) => {
        if (datum.color) {
            return datum.color
        } else {
            return defaultColors[index % 3]
        }
    })

    const options = {
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 30,
                        weight: 600,
                    },
                },
            },
        },
    }

    useEffect(() => {
        const ctx = document.getElementById(myChartId)
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '總熱量',
                        data: values,
                        backgroundColor: colors,
                        hoverOffset: 4,
                        borderAlign: 'inner',
                        borderRadius: { outerStart: 2, outerEnd: 2, innerStart: 2, innerEnd: 50 },
                        hoverOffset: 5,
                    },
                ],
            },
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
                },
            ],
            options: options,
        })

        return () => {
            myChart.destroy()
        }
    }, [])

    return (
        <DoughnutChartWrapper>
            <CanvasWrapper>
                <canvas id={myChartId}></canvas>
            </CanvasWrapper>
        </DoughnutChartWrapper>
    )
}

export default DoughnutChart
