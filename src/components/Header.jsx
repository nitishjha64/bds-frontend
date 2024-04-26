import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MyVerticallyCenteredModal from './Modal'
import { ToastContainer } from "react-toastify";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

const Header = () => {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);

    const logoutClick = () => {
        setModalShow(true)
    }

    const onModalHide = () => {
        setModalShow(false)
    }

    const onLogoutConfirm = () => {
        window.localStorage.removeItem('token')
        navigate('/login', {replace: true})
    }

    return(
        <>
            <div className="header-container container-xxl">
                <header className="header">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <img src="/static/bds-white-logo.png" />
                        {/* <i className="fa fa-sign-out" aria-hidden="true" data-toggle="modal" data-target="#logout-modal"></i> */}
                        <i className="fa fa-sign-out" onClick={logoutClick} aria-hidden="true" data-toggle="modal" data-target="#logout-modal"><FontAwesomeIcon icon={faRightFromBracket} /></i>
                    </nav>
                </header>
            </div>
            <MyVerticallyCenteredModal show={modalShow} onHide={onModalHide} onSubmit={onLogoutConfirm}/>
            <ToastContainer />
        </>
    )
}

export default Header