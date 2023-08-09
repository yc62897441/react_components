import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

// amcharts5
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const ColumnWithRotatedLabelsWrapper = styled.div`
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
    root._logo.dispose() // 隱藏 amchart logo
    root.setThemes([am5themes_Animated.new(root)])

    // 綁定到 useRef，以便在 unmounted 時可以對圖表做 dispose()
    chartRef.current = root

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: 'panX',
            wheelY: 'zoomX',
            pinchZoomX: true,
        })
    )

    // Modify chart's colors
    chart
        .get('colors')
        .set('colors', [
            am5.color(0x087f8c),
            am5.color(0x5aaa95),
            am5.color(0x86a873),
            am5.color(0xbb9f06),
        ])

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}))
    cursor.lineY.set('visible', false)

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 })
    xRenderer.labels.template.setAll({
        rotation: -5, // -90 旋轉，字變垂直
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15,
    })
    xRenderer.grid.template.setAll({
        location: 1,
    })
    let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: 'category',
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {}),
        })
    )
    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1,
            }),
        })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
            name: 'Series 1',
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: 'value',
            sequencedInterpolation: true,
            categoryXField: 'category',
            tooltip: am5.Tooltip.new(root, {
                labelText: '{valueY}',
            }),
        })
    )
    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 })
    series.columns.template.adapters.add('fill', function (fill, target) {
        return chart.get('colors').getIndex(series.columns.indexOf(target))
    })
    series.columns.template.adapters.add('stroke', function (stroke, target) {
        return chart.get('colors').getIndex(series.columns.indexOf(target))
    })

    xAxis.data.setAll(data)
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
            paddingTop: 0,
            paddingBottom: 0,
        })
    )
}

function ColumnWithRotatedLabels({ chartId, data, chartTitle, customStyle }) {
    const chartRef = useRef(null)

    const dataToChart = data
        ? data
        : [
              {
                  category: 'USA',
                  value: 2025,
              },
              {
                  category: 'China',
                  value: 1882,
              },
              {
                  category: 'Japan',
                  value: 1809,
              },
              {
                  category: 'Germany',
                  value: 1322,
              },
              {
                  category: 'UK',
                  value: 1122,
              },
              {
                  category: 'France',
                  value: 1114,
              },
              {
                  category: 'India',
                  value: 984,
              },
              {
                  category: 'Spain',
                  value: 711,
              },
              {
                  category: 'Netherlands',
                  value: 665,
              },
              {
                  category: 'South Korea',
                  value: 443,
              },
              {
                  category: 'Canada',
                  value: 441,
              },
          ]

    useEffect(() => {
        // 建立圖表
        createChart(
            chartId ? chartId : 'ColumnWithRotatedLabelsDemo',
            chartRef,
            dataToChart,
            chartTitle
        )

        // 卸載圖表
        return () => {
            chartRef.current.dispose()
        }
    }, [])

    return (
        <ColumnWithRotatedLabelsWrapper>
            <ChartContainer width={customStyle?.width} height={customStyle?.height}>
                <div
                    id={chartId ? chartId : 'ColumnWithRotatedLabelsDemo'}
                    style={{ width: '100%', height: '100%' }}
                ></div>
            </ChartContainer>
        </ColumnWithRotatedLabelsWrapper>
    )
}

export default ColumnWithRotatedLabels
