import styled from 'styled-components'

import Header from '../components/Header.jsx'
import { headerHeight } from '../components/Header.jsx'

import BarChart from '../components/chartComponents/BarChart.jsx'
import DoughnutChart from '../components/chartComponents/DoughnutChart.jsx'
import HorizontalBarChart from '../components/chartComponents/HorizontalBarChart.jsx'
import LineChart from '../components/chartComponents/LineChart.jsx'
import LineChartMultiAxis from '../components/chartComponents/LineChartMultiAxis.jsx'
import RadarChart from '../components/chartComponents/RadarChart.jsx'
import StackedBarChart from '../components/chartComponents/StackedBarChart.jsx'

const MainWrapper = styled.div`
    width: 100%;
`
const ContainerWrapper = styled.div`
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    margin-top: ${headerHeight};
`

function ChartComponents() {
    return (
        <MainWrapper>
            <Header />

            <ContainerWrapper>
                <BarChart
                    myChartId={'myChartId ChartComponents BarChart'}
                    data={null}
                    title={'Bar Chart Title'}
                    xLabel={'客製 xLabel'}
                    yLabel={'客製 yLabel'}
                />
                <DoughnutChart
                    myChartId={'myChartId ChartComponents DoughnutChart'}
                    data={null}
                    title={'Doughnut Chart Title'}
                />
                <HorizontalBarChart
                    myChartId={'myChartId ChartComponents HorizontalBarChart'}
                    data={null}
                    title={'Horizontal Bar Chart Title'}
                    label={'客製 label'}
                    xLabel={'累積量'}
                    yLabel={'yyy'}
                />
                <LineChart
                    myChartId={'myChartId ChartComponents LineChart'}
                    data={null}
                    title={'Line Chart Title'}
                />
                <LineChartMultiAxis
                    myChartId={'myChartId ChartComponents LineChartMultiAxis'}
                    data={null}
                    title={'Line Chart Multi Axis Title'}
                    xLabel={'客製 xLabel'}
                />
                <RadarChart
                    myChartId={'myChartId ChartComponents RadarChart'}
                    data={null}
                    title={'Radar Chart Title'}
                />
                <StackedBarChart
                    myChartId={'myChartId ChartComponents StackedBarChart'}
                    data={null}
                    title={'Stacked Bar Chart Title'}
                    yLabel={'客製 yLabel'}
                />
            </ContainerWrapper>
        </MainWrapper>
    )
}

export default ChartComponents
