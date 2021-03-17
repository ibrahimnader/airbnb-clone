import React from 'react'
import Header from '../components/Header/Header'
import Propertieslist from './../components/Properties/Propertieslist'

const DashboardScreen = () => {
    return (
        <>
            <Header headerInner={true} />
            <Propertieslist />
        </>
    )
}

export default DashboardScreen
