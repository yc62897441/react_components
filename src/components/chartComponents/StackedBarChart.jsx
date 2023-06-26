import { useEffect } from 'react'
import styled from 'styled-components'
import Chart from 'chart.js/auto' // chart.js

const StackedBarChartWrapper = styled.div`
    width: 100%;
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '1200px')};
    margin: 0 auto;
`

const CanvasWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '1200px')};
`

function StackedBarChart({ data, myChartId, title, yLabel, customStyle }) {
    // 需要的資料結構
    const data2 = data
        ? data
        : {
              labels: ['實際量', '目標量'],
              datasets: [
                  {
                      label: 'A',
                      data: [7541256, 8641254],
                      backgroundColor: 'rgba(255, 159, 64, 0.6)',
                  },
                  {
                      label: 'B',
                      data: [8741534, 8641274],
                      backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  },
              ],
          }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: true,
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
        },
        scales: {
            x: {
                display: true,
                stacked: true,
                title: {
                    // display: true,
                    // text: '累積量',
                    display: false,
                },
            },
            y: {
                display: true,
                stacked: true,
                title: {
                    display: true,
                    text: yLabel,
                },
            },
        },
    }

    useEffect(() => {
        const ctx = document.getElementById(myChartId)
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: data2,
            options: options,
        })

        return () => {
            myChart.destroy()
        }
    }, [])

    return (
        <StackedBarChartWrapper maxWidth={customStyle?.maxWidth}>
            <CanvasWrapper maxWidth={customStyle?.maxWidth}>
                <canvas id={myChartId}></canvas>
            </CanvasWrapper>
        </StackedBarChartWrapper>
    )
}

export default StackedBarChart
