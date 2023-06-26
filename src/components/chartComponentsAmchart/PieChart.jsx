import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

// amcharts5
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5percent from '@amcharts/amcharts5/percent'

const PieChartWrapper = styled.div`
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
        am5percent.PieChart.new(root, {
            endAngle: 270,
            layout: root.verticalHorizontal,
        })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    const series = chart.series.push(
        am5percent.PieSeries.new(root, {
            name: 'Series',
            valueField: 'value',
            categoryField: 'category',
            legendLabelText: '[{fill}]{category}[/]', // 顯示數值
            legendValueText: '[bold {fill}]{value}[/]', // 顯示數值
            // startAngle: -180, // 設定圓餅起始角度與結束角度，這樣的設置會變成半圓形
            // endAngle: 0
        })
    )
    series.data.setAll(data)

    series.appear(1000, 100) // 進場圓餅展開動畫
    chart.appear() // 圖表進場動畫(表頭等資訊漸漸浮現)(series.appear、chart.appear 可以拆開單獨使用)

    // 使用 legend
    let legend = chart.children.push(
        am5.Legend.new(root, {
            centerX: am5.percent(95),
            x: am5.percent(95),
            centerY: am5.percent(100),
            y: am5.percent(100),
            layout: root.verticalLayout, // 水平或垂直排列。horizontalLayout、verticalLayout
        })
    )
    legend.data.setAll(series.dataItems)

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

function PieChart({ chartId, data, chartTitle, customStyle }) {
    const chartRef = useRef(null)

    const dataToChart = data
        ? data
        : [
              {
                  category: 'Lithuania',
                  value: 501.9,
              },
              {
                  category: 'Czechia',
                  value: 301.9,
              },
              {
                  category: 'Ireland',
                  value: 201.1,
              },
              {
                  category: 'Germany',
                  value: 165.8,
              },
              {
                  category: 'Australia',
                  value: 139.9,
              },
              {
                  category: 'Austria',
                  value: 128.3,
              },
              {
                  category: 'UK',
                  value: 99,
              },
          ]

    useEffect(() => {
        // 建立圖表
        createChart(chartId ? chartId : 'PieChartDemo', chartRef, dataToChart, chartTitle)

        // 卸載圖表
        return () => {
            chartRef.current.dispose()
        }
    }, [])

    return (
        <PieChartWrapper>
            <ChartContainer width={customStyle?.width} height={customStyle?.height}>
                <div
                    id={chartId ? chartId : 'PieChartDemo'}
                    style={{ width: '100%', height: '100%' }}
                ></div>
            </ChartContainer>
        </PieChartWrapper>
    )
}

export default PieChart
