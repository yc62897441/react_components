import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

// amcharts5
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const MultipleLinesChartWrapper = styled.div`
    width: 100%;
`
const ChartContainer = styled.div`
    width: 100%;
    min-width: 480px;
    height: 360px;

    @media (min-width: 768px) {
        width: ${({ width }) => (width ? width : '100%')};
        max-width: 100%;
        height: ${({ height }) => (height ? height : '500px')};
    }
`

// amcharts5 建立圖表的 function
function createChart(domElementId, chartRef, data, chartTitle, legendUnit, min, max) {
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
            focusable: true,
            // panX: true,
            // panY: true,
            // wheelX: 'panX',
            // wheelY: 'zoomX',
            layout: root.verticalLayout,
            pinchZoomX: true,
            panX: false,
            panY: false,
            wheelY: 'none',
            // maxTooltipDistance: 0,
        })
    )

    // 吃的格式
    // Modify chart's colors
    chart
        .get('colors')
        .set('colors', [
            am5.color(0x845ec2),
            am5.color(0xd65db1),
            am5.color('#FF6F91'),
            am5.color('#FF9671'),
            am5.color('#FFC75F'),
            am5.color('#F9F871'),
        ])

    // 建立座標軸
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            maxDeviation: 0.5,
            baseInterval: {
                timeUnit: 'month',
                count: 1,
            },
            // renderer: am5xy.AxisRendererX.new(root, {
            //     pan: 'zoom',
            //     minGridDistance: 50,
            // }),
            renderer: am5xy.AxisRendererX.new(root, {}),
            tooltip: am5.Tooltip.new(root, {}),
        })
    )
    const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            maxDeviation: 1,
            // min: min ? min : null,
            // max: max ? max : null,
            // renderer: am5xy.AxisRendererY.new(root, { pan: 'zoom' }),
            renderer: am5xy.AxisRendererY.new(root, {}),
        })
    )

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    for (let i = 0; i < data.length; i++) {
        let series = chart.series.push(
            am5xy.LineSeries.new(root, {
                minBulletDistance: 10,
                name: data[i][0]?.type,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'value',
                valueXField: 'date',
                legendValueText: '{valueY}',
                // legendUnit: legendUnit ? legendUnit : '', // 如果有傳入 legend標籤文字，則新增 legendLabelText 屬性
                tooltip: am5.Tooltip.new(root, {
                    pointerOrientation: 'horizontal',
                    // labelText: '{valueY}',
                    labelText: ' {name} : {valueY}',
                }),
            })
        )

        let datum = data[i]

        // Set up data processor to parse string dates
        // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
        series.data.processor = am5.DataProcessor.new(root, {
            dateFormat: 'yyyy-MM',
            dateFields: ['date'],
        })

        series.data.setAll(datum)

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

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear()
    }

    // // 使用 legend
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(
        am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            layout: root.horizontalLayout,
        })
    )

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    const cursor = chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
            xAxis: xAxis,
        })
    )
    cursor.lineY.set('visible', false)

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

    // legend.itemContainers.template.set('width', am5.p100)
    legend.valueLabels.template.setAll({
        // width: am5.p100,
        width: 'auto',
        minWidth: 80,
        textAlign: 'left',
        paddingRight: 10,
    })

    // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
    legend.data.setAll(chart.series.values)

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100)

    // 可以選擇圖表範圍的 scrollbar
    // add scrollbar
    chart.set(
        'scrollbarX',
        am5.Scrollbar.new(root, {
            orientation: 'horizontal',
        })
    )

    // 圖表顯示的動畫
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    // series.appear(1000, 100)
    // chart.appear(1000, 100)

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

function MultipleLinesChart({ chartId, data, chartTitle, customStyle, legendUnit, min, max }) {
    const chartRef = useRef(null)

    const dataToChart = data
        ? data
        : [
              [
                  {
                      date: '2023/1',
                      value: 98,
                  },
                  {
                      date: '2023/2',
                      value: 99,
                  },
                  {
                      date: '2023/3',
                      value: 95,
                  },
              ],
              [
                  {
                      date: '2023/1',
                      value: 120,
                  },
                  {
                      date: '2023/2',
                      value: 79,
                  },
                  {
                      date: '2023/3',
                      value: 105,
                  },
              ],
          ]

    useEffect(() => {
        // 建立圖表
        createChart(
            chartId ? chartId : 'MultipleLinesChartDemo',
            chartRef,
            dataToChart,
            chartTitle,
            legendUnit,
            min,
            max,
        )

        // 卸載圖表
        return () => {
            chartRef.current.dispose()
        }
    }, [])

    return (
        <MultipleLinesChartWrapper>
            <ChartContainer width={customStyle?.width} height={customStyle?.height}>
                <div
                    id={chartId ? chartId : 'MultipleLinesChartDemo'}
                    style={{ width: '100%', height: '100%' }}
                ></div>
            </ChartContainer>
        </MultipleLinesChartWrapper>
    )
}

export default MultipleLinesChart
