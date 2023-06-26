import { useEffect } from 'react'
import styled from 'styled-components'
import Chart from 'chart.js/auto' // chart.js

const RadarChartWrapper = styled.div`
    width: 100%;
`

const CanvasWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    max-width: 900px;
`

function RadarChart({ data, myChartId, title }) {
    // 需要的資料結構
    const data2 = {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [
            {
                label: '實際量',
                data: [17419, 12407, 25015, 12456, 13455, 12232],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)',
            },
            {
                label: '目標量',
                data: [15000, 23422, 15750, 22354, 11234, 20012],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)',
            },
        ],
    }

    // 客製化 tooltip，多加入顯示「佔比」
    const footer = (tooltipItems) => {
        // 目前滑到的目標的數值
        const currentValue = tooltipItems[0].parsed?.r

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

        return '佔' + tooltipItems[0]?.dataset?.label + ': ' + result + '%'
    }

    const options = {
        responsive: true,
        elements: {
            line: {
                borderWidth: 3,
            },
            font: {
                size: 20,
                weight: 600,
            },
        },
        scales: {
            r: {
                pointLabels: {
                    font: {
                        size: 15,
                    },
                },
                ticks: {
                    font: {
                        size: 15,
                    },
                },
            },
        },
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
            // 客製化 tooltip
            tooltip: {
                callbacks: {
                    footer: footer,
                },
            },
        },
    }

    useEffect(() => {
        const ctx = document.getElementById(myChartId)
        const myChart = new Chart(ctx, {
            type: 'radar',
            data: data2,
            options: options,
        })

        return () => {
            myChart.destroy()
        }
    }, [])

    return (
        <RadarChartWrapper>
            <CanvasWrapper>
                <canvas id={myChartId}></canvas>
            </CanvasWrapper>
        </RadarChartWrapper>
    )
}

export default RadarChart
