import React from 'react';
// import NewArrival from './NewArrival';
// import Offers from './Offers'
import AllProduct from './AllProduct';
import { Container } from 'react-bootstrap'
class Product extends React.Component {
    render() {
        return (
            <Container fluid>
                {/* <Row>
                    <Col xs={12} md={6} xl={6}><NewArrival /></Col>
                    <Col xs={12} md={6} xl={6}><Offers /></Col>
                </Row> */}
                <AllProduct />
            </Container>
        );
    }
}

export default Product;