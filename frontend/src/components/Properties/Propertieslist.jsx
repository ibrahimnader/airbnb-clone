import React, { useContext, useState, useEffect } from 'react'
import Property from './Property'
import Footer from '../Footer/Footer';
import axios from 'axios';
import { AppContext } from '../../contexts/AppContext';


export default function Propertieslist(props) {
    const [properties, setProperities] = useState([]);
    const { token } = useContext(AppContext);


    useEffect(() => {
        console.log(17, token);
        if (token) {
            axios.get(`http://localhost:8000/api/v1/places/getuserplace`, { headers: { authorization: `Bearer ${token}` } }).then((res) => {
                setProperities(res.data.data);
            }).catch((err) => {
                console.log('error');
                console.log(err.response);
            })

        }
    }, [token])

    let handleDelete = (property) => {
        // Edit
        axios.delete(`http://localhost:8000/api/v1/places/${property._id}`, { headers: { authorization: `Bearer ${token}` } }).then((res) => {
            let newProperties = properties.filter((item) => {
                return item._id !== property._id
            })
            // setState
            setProperities(newProperties)
        }).catch((err) => {
            console.log('error');
            console.log(err.response.data);
        })
    }

    return (
        <React.Fragment>
            <div className="container py-5">
                <table className="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">Photo</th>
                            <th scope="col">Approved</th>
                            <th scope="col">Bedrooms</th>
                            <th scope="col">Beds</th>
                            <th scope="col">Baths</th>
                            <th scope="col">Location</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map(item =>
                            <Property
                                key={item._id}
                                data={item}
                                onDelete={handleDelete}
                            />
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </React.Fragment>

    )
}
