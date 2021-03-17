import React, {useState} from 'react'
import './Description.css'
import ProgressBar from 'react-bootstrap/ProgressBar'

export const Description = ({ formData, setForm, navigation }) => {
    const { description } = formData
    const [descriptionErr, setdescriptionErr] = useState({})
    console.log(description)

    const onSubmit = (e) => {
        e.preventDefault()
        const isValid = formValidation()
        if (isValid) {
            navigation.next()
            console.log('valid')
        }
    }
    const formValidation = () => {
        const descriptionErr = {}
        let isValid = true
        if (description.trim().length < 5) {
            descriptionErr.descriptionShort = 'description min length is 5 characters'
            isValid = false
        }
        if (description.trim().length > 500) {
            descriptionErr.descriptionShort = 'description max length is 100 characters'
            isValid = false
        }
        if (description == '') {
            descriptionErr.descriptionShort = 'please enter description it is required'
            isValid = false
        }
        setdescriptionErr(descriptionErr)
        return isValid
    }

    return (
        <>
            <ProgressBar now={75} />
            <div className="container">
                <div className="row description">
                    <div className="col-md-6 offset-md-3">
                        <h4>Describe your place to guests</h4>
                        <p>
                            Mention the best features of your space, any special amenities like fast
                            wifi or parking, and what you love about the neighborhood.
                        </p>
                        <form onSubmit = {onSubmit}>
                            <div className="form-group">
                                <textarea
                                    className="User_Text"
                                    className="w-100"
                                    id="User_Text"
                                    cols="30"
                                    rows="10"
                                    name="description"
                                    value={description}
                                    onChange={setForm}></textarea>
                            </div>
                            {Object.keys(descriptionErr).map((key)=>{
                                return <div style={{color:"red"}}>{descriptionErr[key]}</div>
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
