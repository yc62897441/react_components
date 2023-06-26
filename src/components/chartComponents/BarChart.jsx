import { useEffect } from 'react'
import styled from 'styled-components'
import Chart from 'chart.js/auto' // chart.js

const BarChartWrapper = styled.div`
    width: 100%;
`

const CanvasWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    max-width: 1200px;
`

function BarChart({ data, myChartId, title, xLabel, yLabel }) {
    // 需要的資料結構
    const data2 = data
        ? data
        : {
              labels: ['2022/1', '2022/2', '2022/3'],
              datasets: [
                  {
                      label: 'A',
                      data: [247, 215, 267],
                      borderColor: 'rgb(54, 162, 235)',
                      backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  },
                  {
                      label: 'B',
                      data: [481, 444, 459],
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
              ],
          }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
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
        <BarChartWrapper>
            <CanvasWrapper>
                <canvas id={myChartId}></canvas>
            </CanvasWrapper>
        </BarChartWrapper>
    )
}

export default BarChart
