import React, { Component } from 'react'
import { Col, Container } from 'react-bootstrap'
import './City.css'

class City extends Component {
    render() {
        const cityApi = `https://a0.muscache.com/im/pictures/${this.props.id}.jpg?im_q=medq&im_w=720`
        return (
            <Col lg={3} md={6} sm={6} xs={6}>
                <img src={cityApi} alt='Cities you can visit or live' className='city_img' />
                <div className='fonts'>
                    <span>{this.props.name}</span>
                </div>
                <span className='fonts'>{this.props.duration}</span>
            </Col>
        )
    }
}

export default City