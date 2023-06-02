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

function LineChartMultiAxis({ data, myChartId }) {
    const labels = data[0].data.map((datum) => datum.time)
    const datasets = data.map((datum, index) => {
        const yAxisID = index > 0 ? 'y' + index.toString() : 'y'
        return {
            label: datum.name,
            data: datum.data.map((datum2) => datum2.value),
            yAxisID: yAxisID,
        }
    })
    // datasets will be like below:
    // datasets: [
    //     {
    //         label: '總達成量',
    //         data: [247, 240, 267, 241, 249, 253, 235, 267, 241, 241, 249, 253],
    //         // borderColor: 'rgba(255,0,0,0.9)',
    //         // backgroundColor: 'rgba(255,0,0,0.5)',
    //         yAxisID: 'y',
    //     },
    //     {
    //         label: '總目標量',
    //         data: [
    //             1050, 1100, 1061, 1102, 1042, 1078, 1055, 1061, 1102, 1042, 1078, 1055,
    //         ],
    //         yAxisID: 'y1',
    //     },
    // ],

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
                        size: 30,
                        weight: 600,
                    },
                },
            },
            title: {
                display: true,
                text: '總達成量/總目標量(雙軸圖)',
                font: {
                    size: 30,
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
                    text: '年/月',
                },
            },
        },
    }

    useEffect(() => {
        const ctx = document.getElementById(myChartId)
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets,
            },
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
