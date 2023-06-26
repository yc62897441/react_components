import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

// amcharts5
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const SimpleColumnChartWrapper = styled.div`
    width: 100%;
`
const ChartContainer = styled.div`
    width: ${({ width }) => (width ? width : '100%')};
    height: ${({ height }) => (height ? height : '500px')};
`

// amcharts5 建立圖表的 function
function createChart(domElementId, chartRef, data, chartTitle) {
    // 初始化圖表 root 元件
    const root = am5.Root.new(domElementId)
    root.setThemes([am5themes_Animated.new(root)])

    // 綁定到 useRef，以便在 unmounted 時可以對圖表做 dispose()
    chartRef.current = root

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    // https://www.amcharts.com/demos/pie-chart/
    const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: 'panX',
            wheelY: 'zoomX',
        })
    )

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
            behavior: 'zoomX',
        })
    )
    cursor.lineY.set('visible', false)

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            maxDeviation: 0,
            baseInterval: {
                timeUnit: 'month',
                count: 1,
            },
            renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 60,
            }),
            tooltip: am5.Tooltip.new(root, {}),
        })
    )
    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
        })
    )

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
            name: 'Series',
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: 'value',
            valueXField: 'date',
            tooltip: am5.Tooltip.new(root, {
                labelText: '{valueY}',
            }),
        })
    )
    series.columns.template.setAll({ strokeOpacity: 0 })

    // Set up data processor to parse string dates
    // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
    series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: 'yyyy-MM',
        dateFields: ['date'],
    })

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
        'scrollbarX',
        am5.Scrollbar.new(root, {
            orientation: 'horizontal',
        })
    )
    series.data.setAll(data)

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000)
    chart.appear(1000, 100)

    // Add chart title
    chart.children.unshift(
        am5.Label.new(root, {
            text: chartTitle ? chartTitle : 'This is a chart title',
            fontSize: 25,
            fontWeight: '500',
            textAlign: 'center',
            x: am5.percent(50),
            centerX: am5.percent(50),
            paddingTop: 50,
            paddingBottom: 50,
        })
    )
}

function SimpleColumnChart({ chartId, data, chartTitle, customStyle }) {
    const chartRef = useRef(null)

    const dataToChart = data
        ? data
        : [
              {
                  date: '2023/05',
                  value: 100,
              },
              {
                  date: '2023/06',
                  value: 150,
              },
              {
                  date: '2023/07',
                  value: 130,
              },
          ]

    useEffect(() => {
        // 建立圖表
        createChart(chartId ? chartId : 'SimpleColumnChartDemo', chartRef, dataToChart, chartTitle)

        // 卸載圖表
        return () => {
            chartRef.current.dispose()
        }
    }, [])

    return (
        <SimpleColumnChartWrapper width={customStyle?.width} height={customStyle?.height}>
            <ChartContainer>
                <div
                    id={chartId ? chartId : 'SimpleColumnChartDemo'}
                    style={{ width: '100%', height: '100%' }}
                ></div>
            </ChartContainer>
        </SimpleColumnChartWrapper>
    )
}

export default SimpleColumnChart
