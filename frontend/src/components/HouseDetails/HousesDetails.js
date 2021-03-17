import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import House from './House';
import { AppContext } from '../../contexts/AppContext';

const HousesDetails = () => {
    const { token } = useContext(AppContext);
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/places/unapproved`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log('unapproved places loaded')
            setPlaces(res.data.data);
        }).catch((err) => {
            console.log('err', err);
        })
    }, [])
    return (
        <Container>
            <div className='place_details mt-3 mb-3'>
                <p>here is the description and address of the house </p>
                <table className="table table-striped table-hover text-center mt-3 mb-3">
                    <thead>
                        <tr>
                            <th scope="col">Photo</th>
                            <th scope="col">Bedrooms</th>
                            <th scope="col">Beds</th>
                            <th scope="col">Baths</th>
                            <th scope="col">Approved</th>
                            <th scope="col">Non Approved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {places.map((place, id) => (
                            <House
                                key={place._id}
                                place={place}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </Container >
    )

}

export default HousesDetails
