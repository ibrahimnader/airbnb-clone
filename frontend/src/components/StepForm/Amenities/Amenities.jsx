import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';

export const Amenities = ({ formData, setForm, navigation }) => {
    const { wifi, tv, iron, heat, shampoo, ac, fireplace } = formData;

    return (
        <>
        <ProgressBar now={62.5}/>
        <div className="container">
            <div className="row description">
                <div className="col-md-6 offset-md-3">
                    <h4 className="price_p">What amenities do you offer?</h4>
                    <h6 className="price_p">These are just the amenities guests usually expect, but you can add even more after you publish.</h6>
                    <form >

                        <div className="checkbox">
                            <input type="checkbox" id="wifi" value="true" name="wifi" checked={wifi === true} onChange={setForm} /> 
                            <label htmlFor="wifi">&nbsp; Wifi</label>
                        </div>

                        <div className="checkbox">
                            <input type="checkbox" id="tv" value="true" name="tv" checked={tv === true} onChange={setForm} /> 
                            <label htmlFor="tv"> &nbsp;TV</label>
                        </div>

                        <div className="checkbox">
                            <input type="checkbox" id="iron" value="true" name="iron" checked={iron === true} onChange={setForm} /> 
                            <label htmlFor="iron"> &nbsp;iron</label>
                        </div>

                        <div className="checkbox">
                            <input type="checkbox" id="heat" value="true" name="heat" checked={heat === true} onChange={setForm} /> 
                            <label htmlFor="heat"> &nbsp;Heat</label>
                        </div>

                        <div className="checkbox">
                            <input type="checkbox" id="shampoo" value="true" name="shampoo" checked={shampoo === true} onChange={setForm} /> 
                            <label htmlFor="shampoo"> &nbsp;Shampoo</label>
                        </div>

                        <div className="checkbox">
                            <input type="checkbox" id="ac" value="true" name="ac" checked={ac === true} onChange={setForm} /> 
                            <label htmlFor="ac"> &nbsp;Air Conditioning</label>
                        </div>

                        <div className="checkbox">
                            <input type="checkbox" id="fireplace" value="true" name="fireplace" checked={fireplace === true} onChange={setForm} /> 
                            <label htmlFor="fireplace"> &nbsp; Fireplace</label>
                        </div>


                        <div className="d-flex justify-content-between">
                            <p className="myLink" onClick={() => navigation.previous()}><b><a target="_blank" className="back_a">Back</a></b></p>
                            <button className="btn btn_start" onClick={() => navigation.next()}>next</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
