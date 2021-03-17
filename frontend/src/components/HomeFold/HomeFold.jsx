import React from 'react'
import Header from '../Header/Header'
import './HomeFold.scss'
import SearchBar from './SearchBar'
import {withRouter} from 'react-router-dom';

const HomeFold = () => {
    return (
        <>
            <div className="h-fold">
                <Header />
                <div className="h-fold__search">
                    <div className="container">
                        <SearchBar />
                    </div>
                </div>

                <div className="h-fold__content">
                    <div className="container">
                        <h1>
                            <span>Go</span>
                            <span>Near</span>
                        </h1>

                        <button className="btn btn-explore">Explore nearby stays</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(HomeFold)
