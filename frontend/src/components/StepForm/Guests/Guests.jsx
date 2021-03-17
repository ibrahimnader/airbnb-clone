import React, { useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

export const Guests = ({ formData, setForm, navigation }) => {
    const { bedrooms, beds, bathrooms, guests } = formData
    const [error, setError] = useState({})
    const onSubmit = (e) => {
        e.preventDefault()
        const isValid = formValidation()
        if (isValid) {
            navigation.next()
            console.log('valid')
        }
    }
    const formValidation = () => {
        let isValid = true;
        const error = {};
        if(bedrooms < 1){
            error.minBedrooms = 'Minimum bedrooms is 1.'
            isValid = false;
        }
        if(bedrooms > 100){
            error.maxBedrooms = 'Maximum bedrooms is 100.'
            isValid = false;
        }

        if(bathrooms < 1){
            error.minBathrooms = 'Minimum bathrooms is 1.'
            isValid = false;
        }
        if(bathrooms > 100){
            error.maxBathrooms = 'Maximum bathrooms is 100.'
            isValid = false;
        }

        if(beds < 1){
            error.minBeds = 'Minimum beds is 1.'
            isValid = false;
        }
        if(beds > 100){
            error.maxBeds = 'Maximum beds is 100.'
            isValid = false;
        }

        if(guests < 1){
            error.minGuests = 'Minimum guests is 1.'
            isValid = false;
        }
        if(guests > 100){
            error.maxGuests = 'Maximum guests is 100.'
            isValid = false;
        }
        setError(error);
        return isValid
    }

    return (
        <>
            <ProgressBar now={37.5} />
            <div className="container">
                <div className="row description">
                    <div className="col-md-6 offset-md-3">
                        <h4 className="price_p">How many guests can your place accommodate?</h4>
                        <h6 className="price_p">
                            Check that you have enough beds to accommodate all your guests
                            comfortably.
                        </h6>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>Guests</label>
                                <input
                                    type="number"
                                    className="price"
                                    id="guests"
                                    aria-describedby="guests"
                                    placeholder="guests"
                                    name="guests"
                                    value={guests}
                                    onChange={setForm}
                                />
                            </div>
                            <div className="form-group">
                                <label>Beds</label>
                                <input
                                    type="number"
                                    className="price"
                                    id="bedrooms"
                                    aria-describedby="bedrooms"
                                    placeholder="bedrooms"
                                    name="bedrooms"
                                    value={bedrooms}
                                    onChange={setForm}
                                />
                            </div>
                            <div className="form-group">
                                <label>Bedrooms</label>
                                <input
                                    type="number"
                                    className="price"
                                    id="beds"
                                    aria-describedby="beds"
                                    placeholder="beds"
                                    name="beds"
                                    value={beds}
                                    onChange={setForm}
                                />
                            </div>
                            <div className="form-group">
                                <label>Bathrooms</label>
                                <input
                                    type="number"
                                    className="price"
                                    id="bathrooms"
                                    aria-describedby="bathrooms"
                                    placeholder="bathrooms"
                                    name="bathrooms"
                                    value={bathrooms}
                                    onChange={setForm}
                                />
                            </div>
                            {Object.keys(error).map((key, i)=>{
                                return <div key={i}  style={{color:"red"}}>{error[key]}</div>
                            })}
                            <br />
                            <div className="d-flex justify-content-between">
                                <p className="myLink" onClick={() => navigation.previous()}>
                                    <b>
                                        <a target="_blank" className="back_a">
                                            Back
                                        </a>
                                    </b>
                                </p>
                                <button className="btn btn_start" type="submit">
                                    next
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
