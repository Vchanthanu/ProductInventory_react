import React from 'react';
import { Navbar } from 'react-bootstrap'
class Footer extends React.Component {
    render() {
        return (
            <Navbar className='footer' fixed="bottom" bg="light">
                <b>Copyright 2020</b>
            </Navbar>
        );
    }
}

export default Footer;