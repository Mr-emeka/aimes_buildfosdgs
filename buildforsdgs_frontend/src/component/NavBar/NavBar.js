import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import brand from '../../img/logo.jpg';

function NavBar() {
    return (<Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand >
            <img
                alt="brand-logo"
                src={brand}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            Covid-19 Estimator
        </Navbar.Brand>
    </Navbar>)
}

export default NavBar;
