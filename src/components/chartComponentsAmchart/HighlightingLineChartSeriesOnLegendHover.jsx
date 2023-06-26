import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

// amcharts5
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const HighlightingLineChartSeriesOnLegendHoverWrapper = styled.div`
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
            panX: true,
            panY: true,
            wheelX: 'panX',
            wheelY: 'zoomX',
            maxTooltipDistance: 0,
            pinchZoomX: true,
        })
    )

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            maxDeviation: 0.2,
            baseInterval: {
                timeUnit: 'month',
                count: 1,
            },
            renderer: am5xy.AxisRendererX.new(root, {}),
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
    data.forEach((datum, index) => {
        let series = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: 'Series ' + index,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'value',
                valueXField: 'date',
                legendValueText: '{valueY}',
                tooltip: am5.Tooltip.new(root, {
                    pointerOrientation: 'horizontal',
                    labelText: '{valueY}',
                }),
            })
        )

        series.data.processor = am5.DataProcessor.new(root, {
            dateFormat: 'yyyy-MM',
            dateFields: ['date'],
        })

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

        series.data.setAll(datum)

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear()
    })

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.rightAxesContainer.children.push(
        am5.Legend.new(root, {
            width: 200,
            paddingLeft: 15,
            height: am5.percent(100),
        })
    )
    // When legend item container is hovered, dim all the series except the hovered one
    legend.itemContainers.template.events.on('pointerover', function (e) {
        let itemContainer = e.target

        // As series list is data of a legend, dataContext is series
        let series = itemContainer.dataItem.dataContext

        chart.series.each(function (chartSeries) {
            if (chartSeries != series) {
                chartSeries.strokes.template.setAll({
                    strokeOpacity: 0.15,
                    stroke: am5.color(0x000000),
                })
            } else {
                chartSeries.strokes.template.setAll({
                    strokeWidth: 3,
                })
            }
        })
    })
    // When legend item container is unhovered, make all series as they are
    legend.itemContainers.template.events.on('pointerout', function (e) {
        let itemContainer = e.target
        let series = itemContainer.dataItem.dataContext

        chart.series.each(function (chartSeries) {
            chartSeries.strokes.template.setAll({
                strokeOpacity: 1,
                strokeWidth: 1,
                stroke: chartSeries.get('fill'),
            })
        })
    })
    legend.itemContainers.template.set('width', am5.p100)
    legend.valueLabels.template.setAll({
        width: am5.p100,
        textAlign: 'right',
    })
    // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
    legend.data.setAll(chart.series.values)

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
            behavior: 'none',
        })
    )
    cursor.lineY.set('visible', false)

    // // Add scrollbar
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
        'scrollbarX',
        am5.Scrollbar.new(root, {
            orientation: 'horizontal',
        })
    )
    chart.set(
        'scrollbarY',
        am5.Scrollbar.new(root, {
            orientation: 'vertical',
        })
    )

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
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
            y: am5.percent(0),
            centerY: am5.percent(0),
            paddingTop: 50,
            paddingBottom: 0,
        })
    )
}

function HighlightingLineChartSeriesOnLegendHover({ chartId, data, chartTitle, customStyle }) {
    const chartRef = useRef(null)

    const dataToChart = data
        ? data
        : [
              [
                  {
                      date: '2023/01',
                      value: 100,
                  },
                  {
                      date: '2023/02',
                      value: 110,
                  },
                  {
                      date: '2023/03',
                      value: 120,
                  },
                  {
                      date: '2023/04',
                      value: 130,
                  },
              ],
              [
                  {
                      date: '2023/01',
                      value: 200,
                  },
                  {
                      date: '2023/02',
                      value: 190,
                  },
                  {
                      date: '2023/03',
                      value: 180,
                  },
                  {
                      date: '2023/04',
                      value: 100,
                  },
              ],
              [
                  {
                      date: '2023/01',
                      value: 150,
                  },
                  {
                      date: '2023/02',
                      value: 160,
                  },
                  {
                      date: '2023/03',
                      value: 140,
                  },
                  {
                      date: '2023/04',
                      value: 160,
                  },
              ],
          ]

    useEffect(() => {
        // 建立圖表
        createChart(
            chartId ? chartId : 'HighlightingLineChartSeriesOnLegendHoverDemo',
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
        <HighlightingLineChartSeriesOnLegendHoverWrapper>
            <ChartContainer width={customStyle?.width} height={customStyle?.height}>
                <div
                    id={chartId ? chartId : 'HighlightingLineChartSeriesOnLegendHoverDemo'}
                    style={{ width: '100%', height: '100%' }}
                ></div>
            </ChartContainer>
        </HighlightingLineChartSeriesOnLegendHoverWrapper>
    )
}

export default HighlightingLineChartSeriesOnLegendHover
