import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './Info.css'
import {withRouter} from 'react-router-dom';

function Info(props) {
    console.log(props);
    return (
        <>
            <div className='searchPage'>
                <h1>Places to stay at {props?.location?.state?.city || null }</h1>
            </div>
        </>
    )
}

export default withRouter(Info);
