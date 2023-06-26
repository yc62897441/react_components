import { useEffect } from 'react'
import styled from 'styled-components'
import Chart from 'chart.js/auto' // chart.js

const LineChartWrapper = styled.div`
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

function LineChart({ data, myChartId, title }) {
    // 需要的資料結構
    const data2 = data
        ? data
        : {
              labels: [
                  '2022/1',
                  '2022/2',
                  '2022/3',
                  '2022/4',
                  '2022/5',
                  '2022/6',
                  '2022/7',
                  '2022/8',
                  '2022/9',
                  '2022/10',
                  '2022/11',
                  '2022/12',
              ],
              datasets: [
                  {
                      label: 'A',
                      data: [247, 215, 267, 268, 249, 253, 204, 267, 241, 261, 249, 220],
                      borderColor: 'rgb(54, 162, 235)',
                      backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  },
                  {
                      label: 'B',
                      data: [481, 444, 459, 432, 472, 446, 461, 498, 492, 415, 443, 472],
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                      label: 'C',
                      data: [51, 86, 85, 162, 98, 48, 67, 113, 132, 135, 78, 62],
                      borderColor: 'rgb(255, 159, 64)',
                      backgroundColor: 'rgba(255, 159, 64, 0.5)',
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
    }

    useEffect(() => {
        const ctx = document.getElementById(myChartId)
        const myChart = new Chart(ctx, {
            type: 'line',
            data: data2,
            options: options,
        })

        return () => {
            myChart.destroy()
        }
    }, [])

    return (
        <LineChartWrapper>
            <CanvasWrapper>
                <canvas id={myChartId}></canvas>
            </CanvasWrapper>
        </LineChartWrapper>
    )
}

export default LineChart
