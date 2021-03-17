import React from 'react'
import { Container } from 'react-bootstrap'
import Info from '../components/Search Page_Info/Info'
import Places from '../components/Places/Places'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

function SearchPage() {
    return (
        <>
            <Header headerInner={true} />
            <Container>
                <Info />
                <Places />
            </Container>
            <Footer />
        </>
    )
}

export default SearchPage
