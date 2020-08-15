import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'
class Header extends React.Component {

    render() {
        return (
            <Navbar fixed="top" bg="light" expand="lg md xl">
                <Navbar.Brand><Link to="/product">
                    <img className="logo" src="./AppLogo.png" alt="Logo of Farming Product App"></img>
                    <b>Farming Products</b>
                </Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link><Link  to="/product">Product</Link></Nav.Link>
                        <Nav.Link><Link  to="/dashboard">Dashboard</Link></Nav.Link>
                        <Nav.Link><Link  to="/">Login</Link></Nav.Link>
                        <Nav.Link><Link  to="/signup">SignUp</Link></Nav.Link>
                        <Nav.Link><Link  to="/">Logout</Link></Nav.Link>
                        {/* <span className="menulist">{this.state.username}</span> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;