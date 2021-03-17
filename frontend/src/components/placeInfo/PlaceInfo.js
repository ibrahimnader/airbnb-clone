import React, { useEffect, useState, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios';
import CheckOutButton from 'react-stripe-checkout';
import { AppContext } from '../../contexts/AppContext';


// import MapContainer from '../Map/GoogleMap'
import './PlacesInfo.css'

const PlacesInfo = ({ match, location }) => {
    const { token, user, logged } = useContext(AppContext);

    const [place, setPlace] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/places/${match.params.id}`).then((res) => {
            console.log('place loaded', res.data.data);
            setPlace(res.data.data);
        }).catch((err) => {
            console.log('error');
            console.log(err.response);
        })
    }, [match]);

    console.log(116, user, place);
    let searchParams;
    let numOfDays;
    try {
        const search = location.search.slice(1);
        searchParams = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
        const ms = new Date(searchParams.endDate).getTime() - new Date(searchParams.startDate).getTime();
        numOfDays = ms / (24 * 60 * 60 * 1000);
        console.log("number of daaaaaaaaaaays", numOfDays);
    } catch (ex) {
        console.log(ex);
        console.log('heeelp');
    }

    const rentPlace = (paymentToken) => {
        const rentDetails = {
            _id: match.params.id,
            startDate: searchParams.startDate,
            endDate: searchParams.endDate
        }
        console.log(rentDetails);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/places/rent`, { paymentToken, rentDetails }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log('succes', res);
        }).catch((err) => {
            console.log('err', err);
        })
    }


    const pics = `https://a0.muscache.com/im/pictures/2f4f7d26-ac4d-417e-ba29-3fbc6ed5a01f.jpg?im_w=720`
    return (
        <>
            <Container>
                <div id='place_info'>
                    <h1 className='headLine mt-3 h1'>{place.title}</h1>
                    <p className="p_address">{place.address}</p>
                </div>
                <Row>
                    <Col sm={6}>
                        <img src={place.images && `${process.env.REACT_APP_BACKEND_URL}/uploads/${place.images[0]}`} className="big-image" alt='pics of houses' />
                    </Col>
                    <Col sm={6}>
                        <Row>
                            <Col sm={6}><img className="mini-image" src={place.images && `${process.env.REACT_APP_BACKEND_URL}/uploads/${place.images[1]}`} alt='pics of houses' /></Col>
                            <Col sm={6}><img className="mini-image" src={place.images && `${process.env.REACT_APP_BACKEND_URL}/uploads/${place.images[2]}`} alt='pics of houses' /></Col>
                        </Row>
                        <Row>
                            <Col sm={6}><img className="mini-image" src={place.images && `${process.env.REACT_APP_BACKEND_URL}/uploads/${place.images[3]}`} alt='pics of houses' /></Col>
                            <Col sm={6}><img className="mini-image" src={place.images && `${process.env.REACT_APP_BACKEND_URL}/uploads/${place.images[4]}`} alt='pics of houses' /></Col>
                        </Row>
                    </Col>
                </Row>
                <div className='img mt-3'>

                </div>
                <Row>
                    <Col sm={10}>
                        <h3 className='house_owner mt-3'>
                            Entire flat hosted by {place.owner && place.owner.firstName}
                        </h3>
                        <span>{place.guests} guests . </span>
                        <span>{place.propertyType} . </span>
                        <span>{place.bedrooms} beds . </span>
                        <span>{place.bathrooms} bathrooms .</span>
                    </Col>
                    <Col sm={12}><hr /></Col>
                </Row>
                <Row>
                    <Col md={7} sm={3}>
                        <Row>
                            <Col md={12} sm={2}>
                                <div id='home_options'>
                                    <i className="fas fa-home"></i>
                                    <span className='txt ml-2'>Entire Home</span>
                                    <p className='ml-4'>
                                        You’ll have the apartment to yourself.
                                 </p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} sm={12}>
                                <div id='home_options'>
                                    <i className="fas fa-restroom"></i>
                                    <span className='txt ml-2'>Cancellation policy</span>
                                    <p className='ml-4'>
                                        Add your trip dates to get the cancellation details for this stay.
                                </p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} sm={12}>
                                <div id='home_options'>
                                    <i className="far fa-star"></i>
                                    <span className='txt ml-2'>Enhanced Clean</span>
                                    <p className='ml-4'>
                                        This host committed to Airbnb's 5-step enhanced cleaning process.
                                </p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} sm={12}>
                                <div id='home_options'>
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span className='txt ml-2'>Self check-in</span>
                                    <p className='ml-4'>
                                        You can check in with the doorman.
                                </p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} sm={12}>
                                <div id='home_options'>
                                    <i className="far fa-lightbulb"></i>
                                    <span className='txt ml-2'>House rules</span>
                                    <p className='ml-4'>
                                        This place isn’t suitable for children under 12 and the host doesn’t allow pets, parties, or smoking.
                                </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={5} sm={10}>
                        <div id='box' className='ml-auto mt-3'>
                            <p className="mb-1">Price Per day: <span className='sp1'>{place.price}$</span></p>
                            <p className="mb-1">days:  <span className='sp1'>{numOfDays}</span></p>
                            <div className="pay-divider my-2"></div>
                            total: <span className='sp1'>{Math.round(numOfDays * place.price)}$</span>

                            <div className='button text-center mt-2'>
                                {logged ?

                                    place.owner && user._id === place.owner._id ?
                                        'You own this place' : <CheckOutButton
                                            stripeKey={process.env.REACT_APP_STRIPE_PUBLISH_KEY}
                                            token={rentPlace}
                                            name={`rent ${place.title}`}
                                            amount={Math.round(numOfDays * place.price) * 100}
                                            locale="en"
                                        />
                                    : 'Please Login To Proceed'}
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr />
                <div id='description' className='mt-2'>
                    <span>
                        {place.description}
                    </span>
                    <br />
                    <br />
                </div>
                <hr />
                <div style={{ paddingBottom: `24px` }} id='bedroom'>
                    <h2>Sleeping arrangements</h2>
                    <div className='box mt-5'>
                        <i className="fas fa-bed fa-3x"></i>
                        <div className='heading mt-3 ml-2'>Bedroom {place.bedrooms}</div>
                        <div className='description1 mt-2 ml-3'>{place.bedrooms} king bed</div>
                    </div>
                </div>
                <hr />
                <h2 className='amenities mt-4 mb-3'>Amenities</h2>
                <ul className="amenities_ul mb-4">
                    <li className={place.aminities && place.aminities.wifi ? null : 'hide'}><i class="fas fa-wifi"></i>Wifi</li>
                    <li className={place.aminities && place.aminities.tv ? null : 'hide'}><i class="fas fa-tv"></i>Tv</li>
                    <li className={place.aminities && place.aminities.fireplace ? null : 'hide'}><i class="fas fa-fire-alt"></i>Fire place</li>
                    <li className={place.aminities && place.aminities.shampoo ? null : 'hide'}><i class="fas fa-pump-soap"></i>Shampoo</li>
                    <li className={place.aminities && place.aminities.ac ? null : 'hide'}><i class="fas fa-fan"></i>Air Conditioning</li>
                    <li className={place.aminities && place.aminities.heat ? null : 'hide'}><i class="fas fa-fire-alt"></i>Heater</li>
                    <li className={place.aminities && place.aminities.iron ? null : 'hide'}><i class="fas fa-tshirt"></i>Iron</li>
                </ul>
                <hr />
                <div style={{ paddingBottom: `24px` }} id='location'>
                    <h2>Location</h2>
                    <div style={{ marginBottom: `24px` }} className='mt-2'>{place.address}</div>
                    {/* <MapContainer /> */}
                </div>
            </Container>
        </>
    )
}

export default withRouter(PlacesInfo);