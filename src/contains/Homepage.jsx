import styled from 'styled-components'
import Header from '../components/Header.jsx'

const HomepageWrapper = styled.div`
    width: 100%;
    margin-top: 165px;
`

function Homepage() {
    return <HomepageWrapper>
        <Header />
        This is the homepage.
    </HomepageWrapper>
}

export default Homepage
