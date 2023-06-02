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

function BarChart4({ data, myChartId }) {
    const labels = data[0].data.map((datum) => datum.time)
    const datasets = data.map((datum) => {
        return {
            label: datum.name,
            data: datum.data.map((datum2) => datum2.value),
        }
    })

    const options = {
        responsive: true,
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
                text: '各成員各期貢獻量',
                font: {
                    size: 30,
                    weight: 600,
                },
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Value',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value',
                },
            },
        },
    }

    useEffect(() => {
        const ctx = document.getElementById(myChartId)
        const myChart = new Chart(ctx, {
            type: 'bar',
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
        <BarChartWrapper>
            <CanvasWrapper>
                <canvas id={myChartId}></canvas>
            </CanvasWrapper>
        </BarChartWrapper>
    )
}

export default BarChart4
