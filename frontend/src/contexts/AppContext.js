import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProdivder(props) {
    console.log('context');
    const [logged, setLogged] = useState(false);
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    function login(token, user) {
        console.log('we are loggin in')
        console.log(token, user);
        setLogged(true);
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }
    function logout() {
        setLogged(false);
        setToken('');
        setUser('');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
    function autoLogIn() {
        console.log('we are doibf auto login');
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'))
        // console.log(180, token)
        if (token && user) {
            login(token, user)
        }
    }

    return (
        <AppContext.Provider value={{ logged, login, logout, autoLogIn, token, user }}>
            {props.children}
        </AppContext.Provider>
    );
}
