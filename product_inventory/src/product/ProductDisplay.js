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
                <Row><Card.Subtitle> Description</Card.Subtitle></Row>
                <Card.Text>{this.props.description}</Card.Text>
                <Row><Button variant="primary" onClick={this.editproduct}>Edit</Button>
                    <Button variant="danger ml-auto" onClick={this.deleteproduct}>Delete</Button></Row>
            </span>)
        }
    }
    render() {
        return (<Col xs={12} md={6} xl={6}>
            <Card className='mb-4 mr-2 ml-2'>
                <Row>
                    <Col xs={12} md={6} xl={6}>
                        <Card.Img ClassName='cardimg' variant="top" src={this.props.image}
                            alt="productImage"></Card.Img></Col>
                    <Col xs={12} md={6} xl={6}>
                        <Card.Body >
                            <Row ClassName='mx-auto' ><Col xs={12} md={12} xl={12}><Card.Title ><b>{this.props.name}</b></Card.Title></Col></Row>
                            <Row><Col xs={12} md={6} xl={6}><Card.Text>Price: {this.props.price} </Card.Text></Col><Col xs={12} md={6} xl={6}><Card.Text >{this.props.category}</Card.Text></Col></Row>
                            <Row><Col xs={12} md={6} xl={6}><Card.Text>Stock: {(this.props.stock <= 0) ? 'No Stock' : this.props.stock}</Card.Text></Col><Col xs={12} md={6} xl={6}><Card.Text>Rating: {this.props.rating}</Card.Text></Col></Row>
                            {this.description()}
                        </Card.Body></Col>
                </Row>
            </Card>
        </Col>
        );
    }
}

export default ProductDisplay;