import styled from 'styled-components'
import Header from '../components/Header.jsx'
import { headerHeight } from '../components/Header.jsx'

import BarChart from '../components/chartJs/BarChart.jsx'
import BarChart2 from '../components/chartJs/BarChart2.jsx'
import BarChart3 from '../components/chartJs/BarChart3.jsx'
import BarChart4 from '../components/chartJs/BarChart4.jsx'
import DoughnutChart from '../components/chartJs/DoughnutChart.jsx'
import LineChart from '../components/chartJs/LineChart.jsx'
import LineChartMultiAxis from '../components/chartJs/LineChartMultiAxis.jsx'

const ChartJsWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 150px);
    margin-top: ${headerHeight};
    padding: 10px;
    background-color: #fbfbfb;
`

// 比例
const data = [
    { name: '蛋白質', value: 100 },
    { name: '澱粉', value: 200 },
    { name: '脂質', value: 50 },
]

// 佔比
const data2 = [
    { name: '白飯', value: 350, color: 'rgba(170, 170, 170, 0.6)' },
    { name: '麵食', value: 150, color: 'rgba(192, 238, 192, 0.6)' },
]

// 各成員貢獻量/總貢獻量
const data3 = [
    {
        name: 'A成員',
        data: [
            {
                value: 247,
                time: '2022/1',
            },
            {
                value: 215,
                time: '2022/2',
            },
            {
                value: 267,
                time: '2022/3',
            },
            {
                value: 268,
                time: '2022/4',
            },
            {
                value: 249,
                time: '2022/5',
            },
            {
                value: 253,
                time: '2022/6',
            },
            {
                value: 204,
                time: '2022/7',
            },
            {
                value: 267,
                time: '2022/8',
            },
            {
                value: 241,
                time: '2022/9',
            },
            {
                value: 261,
                time: '2022/10',
            },
            {
                value: 249,
                time: '2022/11',
            },
            {
                value: 220,
                time: '2022/12',
            },
        ],
    },
    {
        name: 'B成員',
        data: [
            {
                value: 481,
                time: '2022/1',
            },
            {
                value: 444,
                time: '2022/2',
            },
            {
                value: 459,
                time: '2022/3',
            },
            {
                value: 432,
                time: '2022/4',
            },
            {
                value: 472,
                time: '2022/5',
            },
            {
                value: 446,
                time: '2022/6',
            },
            {
                value: 461,
                time: '2022/7',
            },
            {
                value: 498,
                time: '2022/8',
            },
            {
                value: 492,
                time: '2022/9',
            },
            {
                value: 415,
                time: '2022/10',
            },
            {
                value: 443,
                time: '2022/11',
            },
            {
                value: 472,
                time: '2022/12',
            },
        ],
    },
    {
        name: 'C成員',
        data: [
            {
                value: 51,
                time: '2022/1',
            },
            {
                value: 86,
                time: '2022/2',
            },
            {
                value: 85,
                time: '2022/3',
            },
            {
                value: 162,
                time: '2022/4',
            },
            {
                value: 98,
                time: '2022/5',
            },
            {
                value: 48,
                time: '2022/6',
            },
            {
                value: 67,
                time: '2022/7',
            },
            {
                value: 113,
                time: '2022/8',
            },
            {
                value: 132,
                time: '2022/9',
            },
            {
                value: 135,
                time: '2022/10',
            },
            {
                value: 78,
                time: '2022/11',
            },
            {
                value: 62,
                time: '2022/12',
            },
        ],
    },
]

// 總達成量/總目標量
const data4 = [
    {
        name: '總達成量',
        data: [
            {
                value: 247,
                time: '2022/1',
            },
            {
                value: 240,
                time: '2022/2',
            },
            {
                value: 267,
                time: '2022/3',
            },
            {
                value: 241,
                time: '2022/4',
            },
            {
                value: 249,
                time: '2022/5',
            },
            {
                value: 253,
                time: '2022/6',
            },
            {
                value: 235,
                time: '2022/7',
            },
            {
                value: 267,
                time: '2022/8',
            },
            {
                value: 241,
                time: '2022/9',
            },
            {
                value: 241,
                time: '2022/10',
            },
            {
                value: 249,
                time: '2022/11',
            },
            {
                value: 253,
                time: '2022/12',
            },
        ],
    },
    {
        name: '總目標量',
        data: [
            {
                value: 1050,
                time: '2022/1',
            },
            {
                value: 1100,
                time: '2022/2',
            },
            {
                value: 1061,
                time: '2022/3',
            },
            {
                value: 1102,
                time: '2022/4',
            },
            {
                value: 1042,
                time: '2022/5',
            },
            {
                value: 1078,
                time: '2022/6',
            },
            {
                value: 1055,
                time: '2022/7',
            },
            {
                value: 1061,
                time: '2022/8',
            },
            {
                value: 1102,
                time: '2022/9',
            },
            {
                value: 1042,
                time: '2022/10',
            },
            {
                value: 1078,
                time: '2022/11',
            },
            {
                value: 1055,
                time: '2022/12',
            },
        ],
    },
]

// 各成員貢獻量
const data5 = [
    {
        value: 198,
        time: '2022/1',
    },
    {
        value: 215,
        time: '2022/2',
    },
    {
        value: 237,
        time: '2022/3',
    },
    {
        value: 268,
        time: '2022/4',
    },
    {
        value: 289,
        time: '2022/5',
    },
    {
        value: 67,
        time: '2022/6',
    },
    {
        value: 55,
        time: '2022/7',
    },
    {
        value: 41,
        time: '2022/8',
    },
    {
        value: 73,
        time: '2022/9',
    },
    {
        value: 299,
        time: '2022/10',
    },
    {
        value: 249,
        time: '2022/11',
    },
    {
        value: 305,
        time: '2022/12',
    },
]

function ChartJs() {
    return (
        <>
            <Header />
            <ChartJsWrapper>
                <LineChart data={data3} myChartId={'myChartId003'} />
                <LineChartMultiAxis data={data4} myChartId={'myChartId004'} />

                <h1>A成員累積貢獻量</h1>
                <BarChart data={data5} myChartId={'myChartId005'} />

                <h1>A成員各期貢獻量</h1>
                <BarChart3 data={data5} myChartId={'myChartId007'} />

                <h1>各成員累積貢獻量</h1>
                <BarChart2 data={data3} myChartId={'myChartId006'} />

                <h1>各成員各期貢獻量</h1>
                <BarChart4 data={data3} myChartId={'myChartId008'} />

                <h1>比例(Doughnut Chart)</h1>
                <DoughnutChart data={data} myChartId={'myChartId001'} />

                <h1>佔比(Doughnut Chart)</h1>
                <DoughnutChart data={data2} myChartId={'myChartId002'} />
            </ChartJsWrapper>
        </>
    )
}

export default ChartJs
