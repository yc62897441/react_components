import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

// amcharts5
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const StackedColumnChartWrapper = styled.div`
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
    // https://www.amcharts.com/demos/pie-chart/
    const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            focusable: true,
            // wheelX: 'panX',
            // wheelY: 'zoomX',
            layout: root.verticalLayout,
            pinchZoomX: true,
            panX: false,
            panY: false,
            wheelY: 'none',
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

    // // Add scrollbar
    // // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
        'scrollbarX',
        am5.Scrollbar.new(root, {
            orientation: 'horizontal',
        })
    )

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    const legend = chart.children.push(
        am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50,
            layout: root.horizontalLayout,
        })
    )

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {})
    let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: 'category',
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {}),
        })
    )
    xRenderer.grid.template.setAll({
        location: 1,
    })
    xAxis.data.setAll(data)
    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            min: 0,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1,
            }),
        })
    )

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
        })
    )

    //匯出
    let exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
        dataSource: data,
    })

    exporting.events.on('dataprocessed', function (ev) {
        // for(var i = 0; i < ev.data.length; i++) {
        // ev.data[i].sum = ev.data[i].value + ev.data[i].value2;
        // }
    })

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
        let series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: name,
                stacked: true,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: 'category',
                tooltip: am5.Tooltip.new(root, {
                    labelText: ' {name} : {valueY}',
                }),
            })
        )

        // series.columns.template.setAll({
        //     tooltipText: '{name}, {categoryX}: {valueY}',
        //     tooltipY: am5.percent(10),
        // })
        series.data.setAll(data)

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear()

        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                locationY: 0,
                locationX: 0,
                // sprite: am5.Label.new(root, {
                //     text: '{valueY}',
                //     fill: root.interfaceColors.get('alternativeText'),
                //     centerY: am5.p50,
                //     centerX: am5.p50,
                //     populateText: true,
                // }),
            })
        })

        legend.data.push(series)
    }
    // makeSeries('Europe', 'europe')
    // makeSeries('North America', 'namerica')
    // makeSeries('Asia', 'asia')
    // makeSeries('Latin America', 'lamerica')
    // makeSeries('Middle East', 'meast')
    // makeSeries('Africa', 'africa')
    Object.keys(data[0]).forEach((key, index) => {
        if (key !== 'category') {
            makeSeries(key, key)
        }
    })

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
            paddingTop: 0,
            paddingBottom: 0,
        })
    )
}

function StackedColumnChart({ chartId, data, chartTitle, customStyle }) {
    const chartRef = useRef(null)

    const dataToChart = data
        ? data
        : [
              {
                  category: '2021',
                  europe: 2.5,
                  namerica: 2.5,
                  asia: 2.1,
                  lamerica: 1,
                  meast: 0.8,
                  africa: 0.4,
              },
              {
                  category: '2022',
                  europe: 2.6,
                  namerica: 2.7,
                  asia: 2.2,
                  lamerica: 0.5,
                  meast: 0.4,
                  africa: 0.3,
              },
              {
                  category: '2023',
                  europe: 2.8,
                  namerica: 2.9,
                  asia: 2.4,
                  lamerica: 0.3,
                  meast: 0.9,
                  africa: 0.5,
              },
          ]

    useEffect(() => {
        // 建立圖表
        createChart(chartId ? chartId : 'StackedColumnChartDemo', chartRef, dataToChart, chartTitle)

        // 卸載圖表
        return () => {
            chartRef.current.dispose()
        }
    }, [])

    return (
        <StackedColumnChartWrapper>
            <ChartContainer width={customStyle?.width} height={customStyle?.height}>
                <div
                    id={chartId ? chartId : 'StackedColumnChartDemo'}
                    style={{ width: '100%', height: '100%' }}
                ></div>
            </ChartContainer>
        </StackedColumnChartWrapper>
    )
}

export default StackedColumnChart
