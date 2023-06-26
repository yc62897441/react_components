import styled from 'styled-components'

import Header from '../components/Header.jsx'
import { headerHeight } from '../components/Header.jsx'

import PieChart from '../components/chartComponentsAmchart/PieChart'
import SimpleColumnChart from '../components/chartComponentsAmchart/SimpleColumnChart'
import ColumnWithRotatedLabels from '../components/chartComponentsAmchart/ColumnWithRotatedLabels'
import ClusteredColumnChart from '../components/chartComponentsAmchart/ClusteredColumnChart'
import StackedColumnChart from '../components/chartComponentsAmchart/StackedColumnChart'
import XYChart from '../components/chartComponentsAmchart/XYChart'
import HighlightingLineChartSeriesOnLegendHover from '../components/chartComponentsAmchart/HighlightingLineChartSeriesOnLegendHover'

const MainWrapper = styled.div`
    width: 100%;
`
const ContainerWrapper = styled.div`
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    margin-top: ${headerHeight};
`

function ChartComponentsAmchart() {
    return (
        <MainWrapper>
            <Header />

            <ContainerWrapper>
                <PieChart />
                <SimpleColumnChart />
                <ColumnWithRotatedLabels />
                <ClusteredColumnChart />
                <StackedColumnChart />
                <XYChart />
                <HighlightingLineChartSeriesOnLegendHover />
            </ContainerWrapper>
        </MainWrapper>
    )
}

export default ChartComponentsAmchart
