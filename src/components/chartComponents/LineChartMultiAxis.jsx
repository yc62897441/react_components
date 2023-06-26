import { useEffect } from 'react'
import styled from 'styled-components'
import Chart from 'chart.js/auto' // chart.js

const LineChartMultiAxisWrapper = styled.div`
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

function LineChartMultiAxis({ data, myChartId, title, xLabel }) {
    // 需要的資料結構
    const data2 = {
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
                data: [247, 240, 267, 241, 249, 253, 235, 267, 241, 241, 249, 253],
                yAxisID: 'y',
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
                label: 'B',
                data: [1050, 1100, 1061, 1102, 1042, 1078, 1055, 1061, 1102, 1042, 1078, 1055],
                yAxisID: 'y1',
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
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
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
            x: {
                title: {
                    // color: 'red',
                    display: true,
                    // text: '年/月',
                    text: xLabel, // '年/月'
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
        <LineChartMultiAxisWrapper>
            <CanvasWrapper>
                <canvas id={myChartId}></canvas>
            </CanvasWrapper>
        </LineChartMultiAxisWrapper>
    )
}

export default LineChartMultiAxis
