import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

// amcharts5
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy'

const PieChartWrapper = styled.div`
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
        am5.Container.new(root, {
            width: am5.percent(100),
            height: am5.percent(100),
            layout: root.verticalLayout,
        })
    )

    // Create series
    // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
    let series = chart.children.push(
        am5hierarchy.Treemap.new(root, {
            singleBranchOnly: false,
            downDepth: 1,
            upDepth: -1,
            initialDepth: 2,
            valueField: 'value',
            categoryField: 'name',
            childDataField: 'children',
            nodePaddingOuter: 0,
            nodePaddingInner: 0,
        })
    )
    // 吃的格式，要放在 series.data.setAll(data) 之前
    // Modify chart's colors
    series
        .get('colors')
        .set('colors', [
            am5.color(0x845ec2),
            am5.color(0xd65db1),
            am5.color('#FF6F91'),
            am5.color('#FF9671'),
            am5.color('#FFC75F'),
            am5.color('#F9F871'),
        ])
    series.rectangles.template.setAll({
        strokeWidth: 2,
    })

    series.data.setAll([data])
    series.set('selectedDataItem', series.dataItems[0])

    // Make stuff animate on load
    series.appear(1000, 100)

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

function TreeMapChart({ chartId, data, chartTitle, customStyle }) {
    const chartRef = useRef(null)

    const dataToChart = {
        name: 'Root',
        children: data
            ? data
            : [
                  {
                      name: 'First',
                      children: [
                          {
                              name: 'A1',
                              value: 100,
                          },
                          {
                              name: 'A2',
                              value: 60,
                          },
                          {
                              name: 'A3',
                              value: 30,
                          },
                      ],
                  },
                  {
                      name: 'Second',
                      children: [
                          {
                              name: 'B1',
                              value: 135,
                          },
                          {
                              name: 'B2',
                              value: 98,
                          },
                          {
                              name: 'B3',
                              value: 56,
                          },
                      ],
                  },
                  {
                      name: 'Third',
                      children: [
                          {
                              name: 'C1',
                              value: 335,
                          },
                          {
                              name: 'C2',
                              value: 148,
                          },
                          {
                              name: 'C3',
                              value: 126,
                          },
                          {
                              name: 'C4',
                              value: 26,
                          },
                      ],
                  },
                  {
                      name: 'Fourth',
                      children: [
                          {
                              name: 'D1',
                              value: 415,
                          },
                          {
                              name: 'D2',
                              value: 148,
                          },
                          {
                              name: 'D3',
                              value: 89,
                          },
                          {
                              name: 'D4',
                              value: 64,
                          },
                          {
                              name: 'D5',
                              value: 16,
                          },
                      ],
                  },
                  {
                      name: 'Fifth',
                      children: [
                          {
                              name: 'E1',
                              value: 687,
                          },
                          {
                              name: 'E2',
                              value: 148,
                          },
                      ],
                  },
              ],
    }

    useEffect(() => {
        // 建立圖表
        createChart(chartId ? chartId : 'TreeMapChartDemo', chartRef, dataToChart, chartTitle)

        // 卸載圖表
        return () => {
            chartRef.current.dispose()
        }
    }, [])

    return (
        <PieChartWrapper>
            <ChartContainer width={customStyle?.width} height={customStyle?.height}>
                <div
                    id={chartId ? chartId : 'TreeMapChartDemo'}
                    style={{ width: '100%', height: '100%' }}
                ></div>
            </ChartContainer>
        </PieChartWrapper>
    )
}

export default TreeMapChart
