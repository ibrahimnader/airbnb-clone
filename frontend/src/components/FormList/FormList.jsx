import React from 'react';
import './FormList.css'

export default function FormList() {
    return (
            <div className="row Form">
                <div className="col-6 d-xs-none ">
                    <div className="FormText">
                        <h6>
                        SEE WHAT’S POSSIBLE
                        </h6>
                        <h3>
                        Earn up to $717 a month 
                        </h3>
                        <h3>
                        hosting in Cairo
                        </h3>
                    </div> 
                </div>
                <div className="col-6 ">
                       <div className="form-group">
                        <form className="allSides">
                        <h6>Tell us more about your place and we'll update your estimate</h6>
                            <div className="smallForm">
                                <div className="address">
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="address"/>
                                </div>
                                <div>
                                    <select className="form-select" className="form-control" >
                                        <option selected>Entire place</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="form-select" className="form-control" >
                                        <option selected>guest</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                            <div className="smallForm">
                                <div>
                                    <select className="form-select" className="form-control" >
                                        <option selected>Entire place</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="form-select" className="form-control" >
                                        <option selected>Entire place</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="form-select" className="form-control" >
                                        <option selected>guest</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                            <button type="button" className=" btn Formstart_btn">Start your listing</button>
                    </form>
                </div>
             </div>
         </div>   
    )
}
