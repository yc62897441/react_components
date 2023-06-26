import { useEffect } from 'react'
import styled from 'styled-components'
import Chart from 'chart.js/auto' // chart.js

const HorizontalBarChartWrapper = styled.div`
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

function HorizontalBarChart({ data, myChartId, title, label, xLabel, yLabel, customStyle }) {
    // 需要的資料結構
    const data2 = data
        ? data
        : {
              labels: ['A', 'B', 'C'],
              datasets: [
                  {
                      axis: 'y',
                      label: label,
                      data: [5015671, 7151515, 1512656],
                      fill: false,
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                          'rgba(255, 205, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(201, 203, 207, 0.2)',
                      ],
                      borderColor: [
                          'rgb(255, 99, 132)',
                          'rgb(255, 159, 64)',
                          'rgb(255, 205, 86)',
                          'rgb(75, 192, 192)',
                          'rgb(54, 162, 235)',
                          'rgb(153, 102, 255)',
                          'rgb(201, 203, 207)',
                      ],
                      borderWidth: 1,
                  },
              ],
          }

    const options = {
        responsive: true,
        indexAxis: 'y', // 橫向柱狀
        plugins: {
            legend: {
                // position: 'top',
                display: true,
                // labels: {
                //     // This more specific font property overrides the global property
                //     font: {
                //         size: 20,
                //         weight: 600,
                //     },
                // },
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
                title: {
                    display: true,
                    text: xLabel,
                },
            },
            y: {
                display: true,
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
        <HorizontalBarChartWrapper
            maxWidth={customStyle?.maxWidth}
            maxHeight={customStyle?.maxHeight}
        >
            <CanvasWrapper maxWidth={customStyle?.maxWidth} maxHeight={customStyle?.maxHeight}>
                <canvas id={myChartId}></canvas>
            </CanvasWrapper>
        </HorizontalBarChartWrapper>
    )
}

export default HorizontalBarChart
