import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Header from '../components/Header.jsx'
import { headerHeight } from '../components/Header.jsx'

// D3.js
import * as d3 from 'd3'
import d3Tip from 'd3-tip'

const D3BubbleChartWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 150px);
    margin-top: ${headerHeight};
    padding: 10px;
    background-color: #fbfbfb;
`

const json = {
    children: [
        { name: 'Adventure', value: 50 },
        { name: 'Brand', value: 42 },
        { name: 'Marketing', value: 38 },
        { name: 'Consumer', value: 33 },
        { name: 'Home & Garden', value: 32 }, // 5
        { name: 'Research', value: 26 },
        { name: 'Mobile', value: 22 },
        { name: 'Technology', value: 21 },
        { name: 'Entertainment', value: 17 },
        { name: 'Digital', value: 15 }, // 10
        { name: 'Consumer Packaging', value: 13 },
        { name: 'Social Media', value: 13 },
        { name: 'Finance', value: 12 },
        { name: 'Science', value: 6 },
        { name: 'Parenting', value: 6 },
        { name: 'Usability', value: 5 },
        { name: 'Engineering', value: 4 },
        { name: 'Fun', value: 4 },
        { name: 'Sports', value: 4 },
        { name: 'Reading', value: 4 },
        { name: 'Education', value: 3 },
        { name: 'Productivity', value: 3 },
        { name: 'Games', value: 3 },
        { name: 'Pets', value: 2 },
        { name: 'Food', value: 1 },
    ],
}

function D3BubbleChart() {
    useEffect(() => {
        const render = () => {
            let idx = 0
            const doShuffle = true
            document.querySelector('#chart').innerHTML = ''

            // d3.shuffle 用來打亂 array 裡面的排序
            if (doShuffle) {
                json.children = d3.shuffle(json.children)
            }

            const values = json.children.map((d) => d.value)
            const min = Math.min.apply(null, values)
            const max = Math.max.apply(null, values)
            const total = json.children.length

            const diameter = 600
            const color = d3.scaleOrdinal(d3.schemeCategory10) // function // An array of ten categorical colors represented as RGB hexadecimal strings.
            const bubble = d3.pack().size([diameter, diameter]).padding(0)
            const margin = {
                left: 25,
                right: 25,
                top: 25,
                bottom: 25,
            }

            const tip = d3Tip()
                .attr('class', 'd3-tip-outer')
                .offset([-38, 0])
                .html((d, i) => {
                    const item = json.children[i]
                    const color = getColor(i, values.length)
                    return `<div className="d3-tip" style="background-color: ${color}">${item.name} (${item.value})</div><div className="d3-stem" style="border-color: ${color} transparent transparent transparent"></div>`
                })

            const svg = d3
                .select('#chart')
                .append('svg')
                .attr('viewBox', '0 0 ' + (diameter + margin.right) + ' ' + diameter)
                .attr('width', diameter + margin.right)
                .attr('height', diameter)
                .attr('class', 'chart-svg')

            const root = d3.hierarchy(json).sum(function (d) {
                return d.value
            }) // .sort(function(a, b) { return b.value - a.value; });

            bubble(root)

            const node = svg
                .selectAll('.node')
                .data(root.children)
                .enter()
                .append('g')
                .attr('class', 'node')
                .attr('transform', function (d) {
                    return 'translate(' + d.x + ' ' + d.y + ')'
                })
                .append('g')
                .attr('class', 'graph')

            node.append('circle')
                .attr('r', function (d) {
                    return d.r
                })
                .style('fill', getItemColor)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)

            node.call(tip)

            node.append('text')
                .attr('dy', '0.2em')
                .style('text-anchor', 'middle')
                .style('font-family', 'Roboto')
                .style('font-size', getFontSizeForItem)
                .text(getLabel)
                .style('fill', '#ffffff')
                .style('pointer-events', 'none')

            node.append('text')
                .attr('dy', '1.3em')
                .style('text-anchor', 'middle')
                .style('font-family', 'Roboto')
                .style('font-weight', '100')
                .style('font-size', getFontSizeForItem)
                .text(getValueText)
                .style('fill', '#ffffff')
                .style('pointer-events', 'none')
            return

            function getItemColor(item) {
                return getColor(idx++, json.children.length)
            }
            function getColor(idx, total) {
                const colorList = [
                    'F05A24',
                    'EF4E4A',
                    'EE3F65',
                    'EC297B',
                    'E3236C',
                    'D91C5C',
                    'BC1E60',
                    '9E1F63',
                    '992271',
                    '952480',
                    '90278E',
                    '7A2A8F',
                    '652D90',
                    '502980',
                    '3B2671',
                    '262261',
                    '27286D',
                    '292D78',
                    '2A3384',
                    '2B388F',
                    '2A4F9F',
                    '2965AF',
                    '277CC0',
                    '2692D0',
                    '25A9E0',
                ]
                const colorLookup = [
                    [0, 4, 10, 18, 24],
                    [0, 3, 6, 9, 11, 13, 15, 18, 20, 24],
                    [0, 3, 4, 6, 7, 9, 11, 13, 14, 15, 17, 18, 20, 22, 24],
                    [0, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15, 17, 18, 19, 20, 22, 23, 24],
                    [
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                        21, 22, 23, 24,
                    ],
                ]
                for (const idxList of colorLookup) {
                    if (idxList.length >= total) {
                        return '#' + colorList[idxList[idx]]
                    }
                }
            }

            function getLabel(item) {
                if (item.data.value < max / 3.3) {
                    return ''
                }
                return truncate(item.data.name)
            }

            function getValueText(item) {
                if (item.data.value < max / 3.3) {
                    return ''
                }
                return item.data.value
            }

            function truncate(label) {
                const max = 11
                if (label.length > max) {
                    label = label.slice(0, max) + '...'
                }
                return label
            }

            function getFontSizeForItem(item) {
                return getFontSize(item.data.value, min, max, total)
            }

            function getFontSize(value, min, max, total) {
                const minPx = 6
                const maxPx = 25
                const pxRange = maxPx - minPx
                const dataRange = max - min
                const ratio = pxRange / dataRange
                const size = Math.min(maxPx, Math.round(value * ratio) + minPx)
                return `${size}px`
            }
        }

        render()
    }, [])

    return (
        <>
            <Header />
            <D3BubbleChartWrapper>
                <fieldset>
                    <legend>Graph Options</legend>
                    <h3 className="first-h3">Number of Bubbles to show</h3>

                    <h3>Order</h3>
                    <select id="shuffle">
                        <option value="0">Largest to smallest</option>
                        <option value="1">Random</option>
                    </select>

                    <h3>Bg Color</h3>
                    <select id="bg">
                        <option value="#e0e0e0">Gray</option>
                        <option value="#eeeeee">Gray 2</option>
                        <option value="#111111">Dark</option>
                    </select>
                </fieldset>

                <div id="chart" className="chart"></div>
            </D3BubbleChartWrapper>
        </>
    )
}

export default D3BubbleChart
