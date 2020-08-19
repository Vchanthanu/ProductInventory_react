import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
class AddEditProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "id": 0,
            "image": "",
            "name": "",
            "companyName": "",
            "offer": undefined,
            "price": 0,
            "regDate": "",
            "category": "",
            "stock": 0,
            "rating": 0,
            "description": "",
            "validation": true
        }
    }
    componentWillMount() {
        if (this.props.location.state !== undefined) {
            axios.get('http://localhost:3000/products/' + this.props.location.state.id)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        image: response.data.image,
                        name: response.data.name,
                        companyName: response.data.companyName,
                        offer: response.data.offer,
                        price: response.data.price,
                        regDate: response.data.regDate,
                        category: response.data.category,
                        stock: parseInt(response.data.stock),
                        rating: response.data.rating,
                        description: response.data.description
                    })
                    this.validationfn()
                    console.log(this.state)
                    console.log(this.state.image.substr(8))
                }, error => {
                    console.error(error)
                })

        }

    }
    validationfn = () => {
        setTimeout(() => {
            if ((this.state.image === "") || (this.state.name === "") || this.state.companyName === "" || this.state.offer === undefined || this.state.price <= 0 || this.state.stock <= 0 || this.state.regDate === "" || this.state.description === "" || this.state.category === "") {
                this.setState({ validation: true })
            } else {
                this.setState({ validation: false })
            }
        }, 10)


    }
    addproduct = () => {
        let productrequestbody = {
            "id": this.state.id,
            "image": this.state.image,
            "name": this.state.name,
            "companyName": this.state.companyName,
            "offer": this.state.offer,
            "price": this.state.price,
            "regDate": this.state.regDate,
            "category": this.state.category,
            "stock": this.state.stock,
            "rating": this.state.rating,
            "description": this.state.description
        }
        axios.post('http://localhost:3000/products', productrequestbody)
            .then(response => {
                console.log('Product Added Successfully')
                this.props.history.push('/product')
            }, error => {
                console.error(error)
            })
    }
    editproduct = () => {
        let editRequestBody = {
            "image": this.state.image,
            "name": this.state.name,
            "companyName": this.state.companyName,
            "offer": Boolean(this.state.offer),
            "price": this.state.price,
            "regDate": this.state.regDate,
            "category": this.state.category,
            "stock": this.state.stock,
            "rating": this.state.rating,
            "description": this.state.description
        }
        axios.put('http://localhost:3000/products/' + this.state.id, editRequestBody)
            .then(response => {
                this.props.history.push('/product')
            }, error => {
                console.error(error)
            })
    }
    getName = (event) => {
        this.setState({ name: event.target.value })
        this.validationfn()

    }
    getCompanyName = (event) => {
        this.setState({ companyName: event.target.value })
        this.validationfn()

    }
    getImage = (event) => {
        console.log(event.target.value.substr(12))
        this.setState({ image: event.target.value.substr(12) })
        this.validationfn()

    }
    getPrice = (event) => {
        this.setState({ price: event.target.value })
        this.validationfn()

    }
    getStock = (event) => {
        this.setState({ stock: event.target.value })
        this.validationfn()
    }
    getCategory = (event) => {
        this.setState({ category: event.target.value })
        this.validationfn()
    }
    getDescription = (event) => {
        this.setState({ description: event.target.value })
        this.validationfn()
    }
    getDate = (event) => {
        this.setState({ regDate: event.target.value })
        this.validationfn()
    }
    getOfferYes = (event) => {
        this.setState({ offer: true })
        this.validationfn()
    }
    getOfferNo = (event) => {
        this.setState({ offer: false })
        this.validationfn()
    }
    render() {
        return (
            <Container>
                <Row >
                    <Col  >
                        <Card className='mx-auto'>
                            <Row><Col><h2 className='text-center'>Product Details</h2></Col></Row>
                            <Row><Col>{this.state.validation && <Alert variant='danger'><h6 className='text-center'>All the below details are required </h6></Alert>}</Col></Row>
                            <form>
                                <Row className='mx-auto'>
                                    <Col xl={6} md={6} xs={12}>
                                        <Row>
                                            <Col xl={6} md={6} xs={12}><label htmlFor='name'>Name</label></Col>
                                            <Col xl={6} md={6} xs={12}><input type="text" id='name' name="name" value={this.state.name} onChange={this.getName}></input></Col>
                                        </Row>
                                    </Col>
                                    <Col xl={6} md={6} xs={12}>
                                        <Row>
                                            <Col xl={6} md={6} xs={12}><label htmlFor='Manufacturename'>Company</label></Col>
                                            <Col xl={6} md={6} xs={12}><input type="text" id='Manufacturename' name="Manufacturename" value={this.state.companyName} onChange={this.getCompanyName}></input></Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='mx-auto'>
                                    <Col xl={6} md={6} xs={12}>
                                        <Row>
                                            <Col xl={6} md={6} xs={12}><label htmlFor="price">Price</label></Col>
                                            <Col xl={6} md={6} xs={12}><input type="number" id='price' value={this.state.price} onChange={this.getPrice}></input></Col>
                                        </Row>
                                    </Col>
                                    <Col xl={6} md={6} xs={12}>
                                        <Row>
                                            <Col xl={6} md={6} xs={12}><label htmlFor='stock'>Stock</label></Col>
                                            <Col xl={6} md={6} xs={12}><input type="number" id="stock" value={this.state.stock} onChange={this.getStock}></input></Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='mx-auto'>
                                    <Col xl={6} md={6} xs={12}>
                                        <Row>
                                            <Col xl={6} md={6} xs={12}><label htmlFor="category">Category</label></Col>
                                            <Col xl={6} md={6} xs={12}><select className="right" id="category" name="category" value={this.state.category} onChange={this.getCategory}>
                                                <option value=""> </option>
                                                <option value="Machinery">Machinery</option>
                                                <option value="Seed/sapling">Seed/Sapling</option>
                                                <option value="Tools">Tools</option>
                                            </select></Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='mx-auto'>
                                    <Col xl={6} md={6} xs={12}>
                                        <Row>
                                            <Col xl={6} md={6} xs={12}><label htmlFor="imageurl">Imageurl</label></Col>
                                            <Col xl={6} md={6} xs={12}><input type='file' id='imageurl' onChange={this.getImage} accept='image/*'></input></Col>
                                        </Row>
                                    </Col>
                                    {/* <input type="text" id="imageurl" value={this.state.image} onChange={this.getImage}></input></Col> */}
                                    <Col xl={6} md={6} xs={12}>
                                        <Row>
                                            <Col xl={6} md={6} xs={12}><label htmlFor="">Today's Offer</label></Col>
                                            <Col xl={3} md={3} xs={6}><input type="radio" id="yes" name="Inoffer" onClick={this.getOfferYes} checked={this.state.offer === true} value='true'></input>
                                                <label htmlFor="yes">Yes</label></Col>
                                            <Col xl={3} md={3} xs={6}><input type="radio" id="no" name="Inoffer" onClick={this.getOfferNo} checked={this.state.offer === false} value='false'></input>
                                                <label htmlFor="no">No</label></Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='mx-auto'>
                                    <Col xl={6} md={6} xs={12}>
                                        <Row>
                                            <Col xl={6} md={6} xs={12}><label htmlFor="description">Description</label></Col>
                                            <Col xl={6} md={6} xs={12}><input type="text" id="description" value={this.state.description} onChange={this.getDescription}></input></Col>
                                        </Row>
                                    </Col>
                                    <Col xl={6} md={6} xs={12}>
                                        <Row>
                                            <Col xl={6} md={6} xs={12}><label htmlFor="dateofpdt">Date of Registration</label></Col>
                                            <Col xl={6} md={6} xs={12}><input type="date" value={this.state.regDate} onChange={this.getDate}></input></Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <br></br>
                                <Row className ='mx-auto'>
                                    <Col xl={12} md={12} xs={12} className='text-center'>
                                        {this.props.location.state === undefined && <input type="button" value="AddProduct" disabled={this.state.validation} onClick={this.addproduct}></input>}
                                        {this.props.location.state !== undefined && <input type="button" value="SaveProduct" disabled={this.state.validation} onClick={this.editproduct}></input>}
                                    </Col>
                                </Row>
                                <br></br>
                            </form>
                        </Card>
                    </Col>
                </Row >
            </Container >
        );
    }
}

export default AddEditProduct;