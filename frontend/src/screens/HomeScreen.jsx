import React from 'react'

import { MultyStepForm } from '../components/StepForm/MultyStepForm/MultyStepForm';
import Experience from '../components/experiences/Experience'
import HomeFold from '../components/HomeFold/HomeFold'
import Footer from '../components/Footer/Footer'
import Future from '../components/Future/Future'
import Gift from '../components/Gift/Gift'
import Cities from '../components/Cities/Cities'
import Places from '../components/Live anywhere/Places'

const HomeScreen = () => {
    return (
        <>
            <HomeFold />
            <Cities />
            <Places />
            <Experience />
            <Gift />
            <Future />
            <Footer />
            {/* <MultyStepForm/> */}
        </>
    )
}
export default HomeScreen
