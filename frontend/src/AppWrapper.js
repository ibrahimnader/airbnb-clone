import React, {useContext, useEffect} from 'react'
import { AppContext } from './contexts/AppContext';

export default function AppWrapper(props) {
    console.log('1')
    const {autoLogIn} = useContext(AppContext);
    useEffect(()=>{
        console.log('2')
        autoLogIn();
    }, []);
    console.log('3')
    return (
        <>
            {props.children}
        </>
    )
}
