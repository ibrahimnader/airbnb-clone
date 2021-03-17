import React,{useState} from 'react'
import './Price.css'
import ProgressBar from 'react-bootstrap/ProgressBar'

export const Price = ({ formData, setForm, navigation }) => {
    const { price, title } = formData;
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
        if(price < 1){
            error.minprice = 'Min price is 1$.'
            isValid = false;
        }
        if (price > 1000000){
            error.maxprice = 'Max price is 1000000$.'
            isValid = false;
        }
        if(title.length < 5){
            error.mintitle = 'title minimum length is 5.'
            isValid = false;
        }
        if(title.length > 100){
            error.mintitle = 'title maximum length is 100.'
            isValid = false;
        }
        setError(error);
        return isValid
    }

    return (
        <>
            <ProgressBar now={87.5} />
            <div className="container">
                <div className="row description">
                    <div className="col-md-6 offset-md-3">
                        <h4 className="price_p">Price your space</h4>
                        <h6>Increase your chances of getting booked</h6>
                        <p className="price_p">
                            Set up Smart Pricing to automatically keep your nightly prices
                            competitive as demand in your area changes.
                        </p>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>price</label>
                                <input
                                    type="number"
                                    className="price"
                                    id="price"
                                    aria-describedby="price"
                                    name="price"
                                    value={price}
                                    onChange={setForm}
                                />
                            </div>
                            <div className="form-group">
                                <label>title</label>
                                <input
                                    type="text"
                                    className="price"
                                    id="title"
                                    aria-describedby="title"
                                    placeholder="title"
                                    name="title"
                                    value={title}
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
