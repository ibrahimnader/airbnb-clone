import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Footer.scss'

export default function Footer() {
    return (
        <div id="Footer" className="pt-5">
            <Container>
                <Row className="website-links">
                    <Col xl="3">
                        <h5>ABOUT</h5>
                        <Row>
                            <Col md="4" xl="12">
                                <p>How Airbnb works</p>
                                <p>Newsroom</p>
                                <p>Airbnb Plus</p>
                            </Col>
                            <Col md="4" xl="12">
                                <p>Airbnb Luxe</p>
                                <p>HotelTonight</p>
                                <p>Airbnb for Work</p>
                            </Col>
                            <Col md="4" xl="12">
                                <p>Olympics</p>
                                <p>Careers</p>
                            </Col>
                        </Row>
                    </Col>
                    <div className="divider d-xl-none mb-5 mt-4"></div>
                    <Col xl="3">
                        <h5>COMMUNITY</h5>
                        <Row>
                            <Col md="4" xl="12">
                                <p>Diversity and Belonging</p>
                                <p>Against Discrimination</p>
                                <p>Accessibility</p>
                            </Col>
                            <Col md="4" xl="12">
                                <p>Airbnb Associates</p>
                                <p>Frontline Stays</p>
                                <p>Invite friends</p>
                            </Col>
                            <Col md="4" xl="12">
                                <p>Gift cards</p>
                                <p>Airbnb.org</p>
                            </Col>
                        </Row>
                    </Col>
                    <div className="divider d-xl-none mb-5 mt-4"></div>
                    <Col xl="3">
                        <h5>HOST</h5>
                        <Row>
                            <Col md="4" xl="12">
                                <p>Host your home</p>
                                <p>Host an Online Experience</p>
                            </Col>
                            <Col md="4" xl="12">
                                <p>Host an Experience</p>
                                <p>Responsible hosting</p>
                            </Col>
                            <Col md="4" xl="12">
                                <p>Resource Center</p>
                                <p>Community Center</p>
                            </Col>
                        </Row>
                    </Col>
                    <div className="divider d-xl-none mb-5 mt-4"></div>
                    <Col xl="3">
                        <h5>SUPPORT</h5>
                        <Row>
                            <Col md="4" xl="12">
                                <p>Our COVID-19 Response</p>
                                <p>Help Center</p>
                            </Col>
                            <Col md="4" xl="12">
                                <p>Cancellation options</p>
                                <p>Neighborhood Support</p>
                            </Col>
                            <Col md="4" xl="12">
                                <p>Trust and Safety</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className="divider mb-4 mt-4"></div>
                <div className="copyright">
                    <p className="copy">&copy; 2020 Airbnb, Inc. All rights reserved</p>
                    <div className="footer-options">
                        <span className="language mr-5">
                            <span className="underline">English</span>
                        </span>
                        <span className="currency mr-5">
                            $ <span className="underline">USD</span>
                        </span>
                        <ul className="social-links">
                            <li>
                                <a href="#" target="_blank">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    )
}
