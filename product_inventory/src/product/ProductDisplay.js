import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap'
class ProductDisplay extends React.Component {
    deleteproduct = () => {
        this.props.deleteproduct(this.props.id)
    }
    editproduct = () => {
        this.props.editproduct(this.props.id)
    }
    description = () => {
        if (this.props.nodescription === true) {
            return (<br></br>)
        } else {
            return (<span>
                <Card.Text><b>Description: </b>{this.props.description}</Card.Text>
                <Row className='mx-auto'><Col xs={12} md={6} xl={6} className='text-center'><Button variant="primary" onClick={this.editproduct}>Edit</Button></Col>
                    <Col xs={12} md={6} xl={6} className='text-center'><Button variant="danger ml-auto" onClick={this.deleteproduct}>Delete</Button></Col></Row>
            </span>)
        }
    }
    render() {
        return (<Col xs={12} md={6} xl={6}>
            <Card className='mb-4 mr-2 ml-2'>
                <Row>
                    <Col xs={12} md={4} xl={3}>
                        <Card.Img className='cardimg' variant="top" src={"image/" + this.props.image} alt="productImage"></Card.Img>
                    </Col>
                    <Col xs={12} md={8} xl={9}>
                        <Card.Body >
                            <Row className='mx-auto' ><Col xs={12} md={12} xl={12}><Card.Title className='text-center'><b>{this.props.name}</b></Card.Title></Col></Row>
                            <Row><Col xs={12} md={6} xl={6}><Card.Text><b>Price: </b>Rs: {this.props.price} </Card.Text></Col><Col xs={12} md={6} xl={6}><Card.Text ><b>Category: </b>{this.props.category}</Card.Text></Col></Row>
                            <Row><Col xs={12} md={6} xl={6}><Card.Text><b>Stock: </b>{(this.props.stock <= 0) ? 'No Stock' : this.props.stock}</Card.Text></Col><Col xs={12} md={6} xl={6}><Card.Text><b>Rating: </b>{this.props.rating}</Card.Text></Col></Row>
                            {this.description()}
                        </Card.Body></Col>
                </Row>
            </Card>
        </Col>
        );
    }
}

export default ProductDisplay;