import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import {Link} from 'react-router-dom';
import './Place.css'
export default class Place extends Component {
    render() {
        // const search = this.props.search;
        const cityImgURL = `http://localhost:8000/uploads/${this.props.place.images[0]}`;
        return (
            <>
                <Col lg={3} md={6} sm={12}>
                    <Link to={`/search/${this.props.place._id}${this.props.searchQuery}`}>
                        <div className="img-wrapper" >
                            <img src={cityImgURL} alt='Place Picture' className='pic' />
                        </div>
                        <ol className='list_info' style={{margin:'0'}}>
                            <li className="h6 mt-2" >{this.props.place.title}</li>
                            <li className="my-2" >{this.props.place.address}</li>
                            <li><span className='prices mt-2'>{this.props.place.price}$</span>/day</li>
                        </ol>
                        
                    </Link>
                </Col>
            </>
        )
    }
}

