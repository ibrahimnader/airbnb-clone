import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export const PropertyType = ({ formData, setForm, navigation }) => {
    const { type } = formData;
    console.log(type)
    return (
        <>
            <ProgressBar now={12.5} />
            <div className="container">
                <div className="row description">
                    <div className="col-md-6 offset-md-3">
                        <h4 className="price_p">What kind of place are you listing?</h4>
                        <h6>Choose a property type</h6>
                        <form >
                            <div className="form-group">
                                <select className="form-select" className="form-control" type="text" className="price" id="type" aria-describedby="type" placeholder="Proberty address" name="type" value={type} onChange={setForm}>
                                    <option value="apartment">Apartment</option>
                                    <option value="room">Room</option>
                                    <option value="house">House</option>
                                </select>
                            </div>

                            <div className="d-flex justify-content-between">
                                <button className="btn btn_start" onClick={() => navigation.next()}>
                                    continue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
