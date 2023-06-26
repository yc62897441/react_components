import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

// amcharts5
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const XYChartWrapper = styled.div`
    width: 100%;
`
const ChartContainer = styled.div`
    width: 100%;
    height: 300px;
`

// amcharts5 建立圖表的 function
function createChart(domElementId, chartRef, data, legendUnit) {
    // 初始化圖表 root 元件
    const root = am5.Root.new(domElementId)
    root.setThemes([am5themes_Animated.new(root)])

    // 綁定到 useRef，以便在 unmounted 時可以對圖表做 dispose()
    chartRef.current = root

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            focusable: true,
            panX: true,
            panY: true,
            wheelX: 'panX',
            wheelY: 'zoomX',
            pinchZoomX: true,
        })
    )

    // 建立座標軸
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            maxDeviation: 0.5,
            groupData: false,
            baseInterval: {
                timeUnit: 'month',
                count: 1,
            },
            renderer: am5xy.AxisRendererX.new(root, {
                pan: 'zoom',
                minGridDistance: 50,
            }),
            tooltip: am5.Tooltip.new(root, {}),
        })
    )
    const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            maxDeviation: 1,
            renderer: am5xy.AxisRendererY.new(root, { pan: 'zoom' }),
        })
    )

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const seriesOpts = {
        minBulletDistance: 10,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            labelText: '{valueY}',
        }),
    }
    if (legendUnit) seriesOpts.legendLabelText = legendUnit // 如果有傳入 legend標籤文字，則新增 legendLabelText 屬性
    const series = chart.series.push(am5xy.LineSeries.new(root, seriesOpts))

    // 使用 legend
    let legend = chart.children.push(am5.Legend.new(root, {}))
    legend.data.setAll(chart.series.values)

    // Set up data processor to parse string dates
    // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
    series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: 'yyyy-MM',
        dateFields: ['date'],
    })

    series.data.setAll(data)

    // 每筆資料的圓點
    series.bullets.push(function () {
        const circle = am5.Circle.new(root, {
            radius: 5,
            fill: series.get('fill'),
            stroke: root.interfaceColors.get('background'),
            strokeWidth: 2,
        })
        return am5.Bullet.new(root, {
            sprite: circle,
        })
    })

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    const cursor = chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
            xAxis: xAxis,
        })
    )
    cursor.lineY.set('visible', false)

    // 可以選擇圖表範圍的 scrollbar
    // add scrollbar
    // chart.set(
    //     'scrollbarX',
    //     am5.Scrollbar.new(root, {
    //         orientation: 'horizontal',
    //     })
    // )

    // 圖表顯示的動畫
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000, 100)
    chart.appear(1000, 100)
}

const data = [
    {
        date: '2023/1',
        value: 110,
    },
    {
        date: '2023/2',
        value: 124,
    },
    {
        date: '2023/3',
        value: 128,
    },
    {
        date: '2023/4',
        value: 143,
    },
    {
        date: '2023/5',
        value: 108,
    },
]

function XYChart() {
    const chartRef = useRef(null)

    useEffect(() => {
        // 建立圖表
        createChart('XYChartDemo', chartRef, data, '電號數') // 每期轉供電號數 chart

        // 卸載圖表
        return () => {
            chartRef.current.dispose()
        }
    }, [])

    return (
        <XYChartWrapper>
            <ChartContainer>
                <div id="XYChartDemo" style={{ width: '100%', height: '100%' }}></div>
            </ChartContainer>
        </XYChartWrapper>
    )
}

export default XYChart
