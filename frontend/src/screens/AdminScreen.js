import React, { useContext } from 'react'
import HousesDetails from '../components/HouseDetails/HousesDetails';
import Footer from '../components/Footer/Footer';
import { AppContext } from '../contexts/AppContext';
import Header from '../components/Header/Header';
import {useHistory } from 'react-router-dom';

function AdminScreen() {
    const { user } = useContext(AppContext);
    const history = useHistory();
    if (user.isAdmin) {
        console.log(true);
    } else {
        history.push('/')
    }
    return (
        <>
            <Header headerInner={true} />
            <HousesDetails />
            <Footer />
        </>
    )
}

export default AdminScreen
