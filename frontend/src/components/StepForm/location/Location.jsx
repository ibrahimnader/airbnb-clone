import React,{useState} from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

export const Location = ({ formData, setForm, navigation }) => {
    const { country, city, street } = formData
    const [error, setError] = useState({})
    const onSubmit = (e) => {
        e.preventDefault()
        const isValid = formValidation()
        if (isValid) {
            navigation.next()
        }
    }
    const formValidation = () => {
        let isValid = true;
        const error = {};
        if(country.length < 3){
            error.countryMinLength = 'Country minimum length is 3.'
            isValid = false;
        }
        if(country.length > 50){
            error.countryMinLength = 'Country maximum length is 50.'
            isValid = false;
        }

        if(city.length < 3){
            error.cityMinLength = 'City minimum length is 3.'
            isValid = false;
        }
        if(city.length > 50){
            error.cityMinLength = 'City maximum length is 50.'
            isValid = false;
        }

        if(street.length < 3){
            error.streetMinLength = 'Street minimum length is 3.'
            isValid = false;
        }
        if(street.length > 50){
            error.streetMinLength = 'Street maximum length is 50.'
            isValid = false;
        }
        setError(error);
        return isValid;
    }
    return (
        <>
            <ProgressBar now={50} />
            <div className="container">
                <div className="row description">
                    <div className="col-md-6 offset-md-3">
                        <h4 className="price_p">Where’s your place located?</h4>
                        <h6 className="price_p">
                            Guests will only get your exact address once they’ve booked a
                            reservation.
                        </h6>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>country</label>
                                <input
                                    type="text"
                                    className="price"
                                    id="country"
                                    aria-describedby="country"
                                    placeholder="country"
                                    name="country"
                                    value={country}
                                    onChange={setForm}
                                />
                            </div>
                            <div className="form-group">
                                <label>city</label>
                                <input
                                    type="text"
                                    className="price"
                                    id="city"
                                    aria-describedby="city"
                                    placeholder="city"
                                    name="city"
                                    value={city}
                                    onChange={setForm}
                                />
                            </div>
                            <div className="form-group">
                                <label>street</label>
                                <input
                                    type="text"
                                    className="price"
                                    id="street"
                                    aria-describedby="street"
                                    placeholder="street"
                                    name="street"
                                    value={street}
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
