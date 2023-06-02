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

function LineChart({ data, myChartId }) {
    const labels = data[0].data.map((datum) => datum.time)
    const datasets = data.map((datum) => {
        return {
            label: datum.name,
            data: datum.data.map((datum2) => datum2.value),
        }
    })
    // 製作總和，非必要
    const total = {
        label: '總和',
        data: [],
    }
    data.forEach((datum) => {
        datum.data.forEach((datum2, index) => {
            if (!total.data[index]) {
                total.data.push(Number(datum2.value))
            } else {
                total.data[index] = total.data[index] + Number(datum2.value)
            }
        })
    })
    datasets.push(total)
    // datasets will be like below:
    // datasets: [
    //     {
    //         label: '各成員貢獻量',
    //         data: [247, 235, 267, 241, 249, 253, 235, 267, 241, 241, 249, 253],
    //         // borderColor: 'rgba(255,0,0,0.9)',
    //         // backgroundColor: 'rgba(255,0,0,0.5)',
    //     },
    //     {
    //         label: '總貢獻量',
    //         data: [
    //             1050, 1055, 1061, 1102, 1042, 1078, 1055, 1061, 1102, 1042, 1078, 1055,
    //         ],
    //     },
    // ],

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
                text: '各成員貢獻量/總貢獻量',
                font: {
                    size: 30,
                    weight: 600,
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
        <LineChartWrapper>
            <CanvasWrapper>
                <canvas id={myChartId}></canvas>
            </CanvasWrapper>
        </LineChartWrapper>
    )
}

export default LineChart
