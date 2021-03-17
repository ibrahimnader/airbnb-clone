import React, { useState, useEffect } from 'react'
import { MultyStepForm } from '../components/StepForm/MultyStepForm/MultyStepForm';
import Header from '../components/Header/Header'

const HostScreen = (props) => {
    console.log(props.location.state?.edit, props.location.state?.data)
    // const [edit, setEdit] = useState(false);
    // useEffect(() => {
    //     if (props.location.state?.edit === true) {
    //         console.log(props.location.state?.data);
    //         setEdit(true);
    //     }
    // }, [])
    const  edit = props?.location?.state?.edit;
    const data = props?.location?.state?.data;
    return (
        <>
            <Header headerInner={true}/>
            <MultyStepForm edit={edit} data={data} />
        </>
    )
}
export default HostScreen
