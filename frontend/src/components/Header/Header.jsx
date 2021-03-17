import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../images/logo.svg'
import { ReactComponent as UserIcon } from '../../images/header-user-icon.svg'
import { ReactComponent as ListIcon } from '../../images/icon-list.svg'
import { Dropdown, Button } from 'react-bootstrap'
import LoginModal from '../Modals/LoginModal'
import SignUpModal from '../Modals/SignUpModal'
import { AppContext } from '../../contexts/AppContext'
import './Header.scss'
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Header = (props) => {
    const { logged, logout, user } = useContext(AppContext)
    const [showLogin, setShowLogin] = useState(false)
    const handleCloseLogin = () => setShowLogin(false)
    const handleShowLogin = () => setShowLogin(true)

    const [showSignUp, setShowSignUp] = useState(false)
    const handleCloseSignUp = () => setShowSignUp(false)
    const handleShowSignUp = () => setShowSignUp(true)

    const history = useHistory();

    const handleLogOut = () => {
        logout()
        toast('You have Logged out!', {
            type: 'error'
        })
        console.log("loooooooooooooog out");
        history.push('/')
    }

    return (
        <>
            <ToastContainer autoClose={2000}/>
            <header className={props.headerInner ? 'h-header innerHeader' : 'h-header'}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="h-header__logo">
                                <Link to="/">
                                    <Logo />
                                </Link>
                            </div>
                        </div>
                        <div className="col-auto">
                            <nav className="h-header__nav">
                                {/* <div className="h-header__become-host">
                                        <Link to="/host">Become a host</Link>
                                    </div> */}
                                <div className="h-header__actions">
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            menualign="right"
                                            id="dropdown-basic"
                                            className="actions-btn">
                                            <span className="icon-list">
                                                <ListIcon />
                                            </span>
                                            <span className="icon-user">
                                                <UserIcon />
                                            </span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu
                                            align="right"
                                            className="h-header__actions-menu">
                                            {logged ? null : (
                                                <>
                                                    <Button
                                                        variant="link"
                                                        onClick={handleShowSignUp}
                                                        className="signUp">
                                                        Sign Up
                                                    </Button>
                                                    <Button
                                                        variant="link"
                                                        onClick={handleShowLogin}
                                                        className="login">
                                                        Login
                                                    </Button>
                                                </>
                                            )}
                                            {logged ? (
                                                <>
                                                    <Link to="/host">Host your Home</Link>
                                                    <Link to="/dashboard">Dashboard</Link>
                                                    {user.isAdmin ? <Link to="/admin">Admin Dashboard</Link> : null}
                                                    <Button
                                                        variant="link"
                                                        onClick={handleLogOut}
                                                        className="logout">
                                                        Log out
                                                    </Button>
                                                </>
                                            ) : null}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <LoginModal show={showLogin} onHide={handleCloseLogin} />
            <SignUpModal show={showSignUp} onHide={handleCloseSignUp} />
        </>
    )
}

export default Header
