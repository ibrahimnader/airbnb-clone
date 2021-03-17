import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import './place.css'

class Place extends Component {
    render() {
        const imgSrc = `https://a0.muscache.com/im/pictures/${this.props.id}.jpg?im_w=720`
        return (
            <Col lg={3} md={6} className="mb-3">
                <img style={{ width: '100%' }} src={imgSrc} className="place_img" alt="alt_text" />
                <br />
                <h5 style={{ marginTop: '10px' }}>{this.props.name}</h5>
            </Col>
        )
    }
}

export default Place
