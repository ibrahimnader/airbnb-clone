import React, { useEffect } from 'react';
import { useForm, useState, useStep } from "react-hooks-helper";
import { Address } from '../Address/Address';

import { Description } from '../Description/Description';
import { Price } from '../Price/Price';
import { UploadPhotos } from '../UploadPhotos/UploadPhotos';
import { PropertyType } from './../ProbertyType/PropertyType';
import { Location } from './../location/Location';
import { Guests } from './../Guests/Guests';
import { Amenities } from '../Amenities/Amenities';

const steps = [
    { id: 'type' },
    { id: 'address' },
    { id: 'guests' },
    { id: 'location' },
    { id: 'amenities' },
    { id: 'description' },
    { id: 'price' },
    { id: 'uploadphoto' }
]

export const MultyStepForm = (props) => {
    console.log(props);
    let defaultData = {
        type: 'apartment',
        address: '',
        description: '',
        //price page
        price: '',
        title: '',
        //location page
        country: '',
        city: '',
        street: '',
        //gusts page
        bedrooms: '1',
        beds: '1',
        bathrooms: '1',
        guests: '1',
        //amenities page
        //uploadphotos page
        wifi: false,
        tv: false,
        ac: false,
        shampoo: false,
        iron: false,
        fireplace: false,
        heat: false

    }
    const { data, edit } = props;
    console.log(data, edit);
    if (edit) {
        console.log("yes edit")
        defaultData.address = data.address;
        defaultData.type = data.propertyType;
        defaultData.description = data.description;
        //price page
        defaultData.price = data.price;
        defaultData.title = data.title;
        //location page
        defaultData.country = data.location.country;
        defaultData.city = data.location.city;
        defaultData.street = data.location.street;
        //guests page
        defaultData.bedrooms = data.bedrooms;
        defaultData.beds = data.beds;
        defaultData.bathrooms = data.bathrooms;
        defaultData.guests = data.guests;
        //amenities page
        defaultData.wifi = data.aminities.wifi;
        defaultData.tv = data.aminities.tv;
        defaultData.ac = data.aminities.ac;
        defaultData.shampoo = data.aminities.shampoo;
        defaultData.iron = data.aminities.iron;
        defaultData.fireplace = data.aminities.fireplace;
        defaultData.heat = data.aminities.heat;
    }
    console.log(defaultData);
    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({
        steps,
        initialStep: 0
    })
    console.log("current form data ", formData);


    const childProps = { formData, setForm, navigation }


    switch (step.id) {
        case "address":
            console.log(childProps)
            return <Address {...childProps} />
        case "type":
            return <PropertyType {...childProps} />
        case "description":
            return <Description {...childProps} />
        case "price":
            return <Price {...childProps} />
        case "location":
            return <Location {...childProps} />
        case "guests":
            return <Guests {...childProps} />
        case "uploadphoto":
            return <UploadPhotos edit={edit} data={data} {...childProps} />
        case "amenities":
            return <Amenities {...childProps} />
    }
    console.log(step);
    return (
        <div>
            <h1>multy step form</h1>
        </div>
    )
}
